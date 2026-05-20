/**
 * Dataset Loader for DigiCurriculum RAG Pipeline
 * Loads educational dataset from Hugging Face and prepares it for vector embedding
 * 
 * Dataset: https://huggingface.co/datasets/mestafrica/digicurriculum-dataset
 */

import fs from 'fs';
import path from 'path';

/**
 * Load curriculum PDFs from local cache or Hugging Face
 * @returns {Promise<Array>} Array of curriculum documents
 */
export const loadCurriculumDataset = async () => {
    try {
        // Option 1: Use huggingface_hub to download dataset programmatically
        const { downloadFolder } = await import('huggingface_hub');

        const datasetPath = await downloadFolder(
            'mestafrica/digicurriculum-dataset',
            {
                repo_type: 'dataset',
                cache_dir: './data/cache'
            }
        );

        const documents = [];

        // Read all PDF documents from dataset
        const learnerPath = path.join(datasetPath, 'Learner');
        const teacherPath = path.join(datasetPath, 'Teacher');

        // Process learner materials
        if (fs.existsSync(learnerPath)) {
            const learnerDocs = await processFolder(learnerPath, 'learner');
            documents.push(...learnerDocs);
        }

        // Process teacher materials
        if (fs.existsSync(teacherPath)) {
            const teacherDocs = await processFolder(teacherPath, 'teacher');
            documents.push(...teacherDocs);
        }

        console.log(`✓ Loaded ${documents.length} curriculum documents`);
        return documents;

    } catch (error) {
        console.error('Error loading dataset from Hugging Face:', error);
        throw error;
    }
};

/**
 * Process folder recursively to extract documents
 * @param {string} folderPath - Path to folder
 * @param {string} type - Document type (learner/teacher)
 * @returns {Promise<Array>} Array of processed documents
 */
const processFolder = async (folderPath, type) => {
    const documents = [];

    const processDir = (dir) => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                processDir(filePath);
            } else if (file.endsWith('.pdf')) {
                // Extract metadata from file path
                const relativePath = path.relative(folderPath, filePath);
                const pathParts = relativePath.split(path.sep);

                documents.push({
                    filename: file,
                    path: relativePath,
                    type,
                    grade: pathParts[0], // e.g., 'year1', 'year2'
                    subject: pathParts[1], // e.g., 'mathematics', 'english'
                    title: file.replace('.pdf', ''),
                    content: '', // Will be populated after PDF extraction
                    metadata: {
                        type,
                        grade: pathParts[0],
                        subject: pathParts[1],
                        source: 'digicurriculum-dataset'
                    }
                });
            }
        }
    };

    processDir(folderPath);
    return documents;
};

/**
 * Prepare documents for vector embedding
 * Chunks long documents and creates metadata
 * @param {Array} documents - Array of documents
 * @returns {Array} Processed documents ready for embedding
 */
export const prepareForEmbedding = (documents) => {
    const processedDocs = [];

    for (const doc of documents) {
        // Split document into chunks (512 characters with overlap)
        const chunks = chunkText(doc.content, 512, 100);

        chunks.forEach((chunk, index) => {
            processedDocs.push({
                id: `${doc.filename}-chunk-${index}`,
                text: chunk,
                metadata: {
                    ...doc.metadata,
                    chunkIndex: index,
                    filename: doc.filename,
                    grade: doc.grade,
                    subject: doc.subject
                }
            });
        });
    }

    return processedDocs;
};

/**
 * Chunk text with overlap
 * @param {string} text - Text to chunk
 * @param {number} chunkSize - Size of each chunk
 * @param {number} overlap - Overlap between chunks
 * @returns {Array} Array of text chunks
 */
const chunkText = (text, chunkSize = 512, overlap = 100) => {
    const chunks = [];
    let i = 0;

    while (i < text.length) {
        const chunk = text.substring(i, i + chunkSize);
        chunks.push(chunk);
        i += chunkSize - overlap;
    }

    return chunks;
};

export default {
    loadCurriculumDataset,
    prepareForEmbedding
};
