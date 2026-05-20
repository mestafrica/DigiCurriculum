/**
 * RAG Integration Example
 * Shows how to use DigiCurriculum dataset with Pinecone vector database
 * 
 * Usage:
 * 1. Initialize the RAG pipeline: const rag = new CurriculumRAG()
 * 2. Build vector database: await rag.buildVectorDB()
 * 3. Query: const results = await rag.query('explain photosynthesis')
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import { loadCurriculumDataset, prepareForEmbedding } from './datasetLoader.js';

class CurriculumRAG {
    constructor() {
        this.pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY
        });

        this.genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        this.indexName = process.env.PINECONE_INDEX_NAME || 'digicurriculum';
    }

    /**
     * Build vector database from curriculum dataset
     * Run once to initialize, then use for querying
     */
    async buildVectorDB() {
        try {
            console.log('📚 Loading curriculum dataset from Hugging Face...');
            const documents = await loadCurriculumDataset();

            console.log('✂️  Preparing documents for embedding...');
            const processedDocs = prepareForEmbedding(documents);

            console.log(`🔢 Generating embeddings for ${processedDocs.length} chunks...`);

            const index = this.pinecone.index(this.indexName);

            // Batch embed and upsert (process in chunks of 100)
            const batchSize = 100;
            for (let i = 0; i < processedDocs.length; i += batchSize) {
                const batch = processedDocs.slice(i, i + batchSize);
                const vectors = await this.generateEmbeddings(batch.map(d => d.text));

                // Prepare vectors for Pinecone
                const records = batch.map((doc, idx) => ({
                    id: doc.id,
                    values: vectors[idx],
                    metadata: doc.metadata
                }));

                await index.upsert(records);
                console.log(`✓ Processed ${Math.min(i + batchSize, processedDocs.length)}/${processedDocs.length}`);
            }

            console.log('✅ Vector database built successfully!');
            return true;

        } catch (error) {
            console.error('Error building vector database:', error);
            throw error;
        }
    }

    /**
     * Generate embeddings using Google's Generative AI
     * @param {Array<string>} texts - Texts to embed
     * @returns {Promise<Array>} Array of embeddings
     */
    async generateEmbeddings(texts) {
        const model = this.genai.getGenerativeModel({
            model: 'embedding-001'
        });

        const embeddings = [];

        for (const text of texts) {
            const result = await model.embedContent(text);
            embeddings.push(result.embedding.values);
        }

        return embeddings;
    }

    /**
     * Query the curriculum database
     * @param {string} question - User question/query
     * @param {number} topK - Number of results to return
     * @returns {Promise<Object>} Query results with context and answer
     */
    async query(question, topK = 5) {
        try {
            // 1. Generate embedding for question
            const questionEmbedding = await this.generateEmbeddings([question]);

            // 2. Search Pinecone for relevant documents
            const index = this.pinecone.index(this.indexName);
            const results = await index.query({
                vector: questionEmbedding[0],
                topK,
                includeMetadata: true
            });

            // 3. Extract context from results
            const context = results.matches
                .map(match => ({
                    text: match.id,
                    metadata: match.metadata,
                    score: match.score
                }))
                .filter(m => m.score > 0.7); // Filter by similarity threshold

            // 4. Generate answer using context
            const answer = await this.generateAnswer(question, context);

            return {
                question,
                answer,
                sources: context,
                confidence: context.length > 0 ? context[0].score : 0
            };

        } catch (error) {
            console.error('Error querying RAG:', error);
            throw error;
        }
    }

    /**
     * Generate answer using context and question
     * @param {string} question - User question
     * @param {Array} context - Retrieved context from vector DB
     * @returns {Promise<string>} Generated answer
     */
    async generateAnswer(question, context) {
        const model = this.genai.getGenerativeModel({
            model: 'gemini-pro'
        });

        const contextText = context
            .map(c => `From ${c.metadata.subject} (${c.metadata.grade}): ${c.text}`)
            .join('\n\n');

        const prompt = `
You are an educational assistant for the Ghana Education Service curriculum.
Use the following curriculum materials to answer the student's question.

Curriculum Context:
${contextText}

Student Question: ${question}

Provide a clear, educational answer based on the curriculum materials.
If the answer is not in the materials, say "This topic is not covered in the available curriculum materials."
`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}

// Example usage
export async function exampleRAGUsage() {
    const rag = new CurriculumRAG();

    // Build vector database (run once)
    // await rag.buildVectorDB();

    // Query examples
    const queries = [
        'Explain what photosynthesis is',
        'How do I calculate the area of a triangle?',
        'What are the major events in Ghanaian history?'
    ];

    for (const query of queries) {
        console.log(`\n📝 Query: ${query}`);
        const result = await rag.query(query);
        console.log(`💡 Answer: ${result.answer}`);
        console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    }
}

export default CurriculumRAG;
