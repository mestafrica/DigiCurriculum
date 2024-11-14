import { Pinecone } from "@pinecone-database/pinecone";
import getEmbedding from "../gemini.service.js";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

function normalizeString(str) {
  return str?.trim().toLowerCase() || "";
}

function getCurriculumText(curriculum) {
  const strandsText = curriculum.strands
    .map((strand) => {
      const subStrandText = strand.subStrand
        .map(
          (sub) =>
            `${sub.code} ${sub.title} ${
              sub.contentStandards
            } ${sub.learningIndicators.join(" ")}`
        )
        .join(" ");
      return `${strand.name} ${strand.code} ${subStrandText}`;
    })
    .join(" ");
  return `${curriculum.code} Grade ${curriculum.grade} ${strandsText}`;
}

function getCurriculumMetadata(curriculum) {
  const metadata = {
    code: curriculum.code,
    grade: curriculum.grade,
    strandCodes: [],
    strandNames: [],
    subStrandCodes: [],
    subStrandTitles: [],
    contentStandards: [],
    learningIndicators: [],
    totalStrands: curriculum.strands.length,
    totalSubStrands: curriculum.strands.reduce(
      (total, strand) => total + strand.subStrand.length,
      0
    ),
  };

  // Process each strand and its substrands
  curriculum.strands.forEach((strand) => {
    metadata.strandCodes.push(strand.code);
    metadata.strandNames.push(strand.name);
    strand.subStrand.forEach((sub) => {
      metadata.subStrandCodes.push(sub.code);
      metadata.subStrandTitles.push(sub.title);
      if (sub.contentStandards) {
        metadata.contentStandards.push(sub.contentStandards);
      }
      if (sub.learningIndicators && sub.learningIndicators.length > 0) {
        metadata.learningIndicators.push(...sub.learningIndicators);
      }
      // Store relationships with prefixed keys
      metadata[`title_${sub.code}`] = sub.title;
      metadata[`content_${sub.code}`] = sub.contentStandards || "";
      metadata[`indicators_${sub.code}`] = sub.learningIndicators
        ? sub.learningIndicators.join("|")
        : "";
    });
  });

  return metadata;
}

async function searchCurricula(query, filters = {}, topK = 20) {
  try {
    const preprocessedFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === "string") {
        preprocessedFilters[key] = normalizeString(value);
      } else {
        preprocessedFilters[key] = value;
      }
    }

    let pineconeQuery = {
      topK,
      includeMetadata: true,
    };
    const filterObject = buildPineconeFilter(preprocessedFilters);
    let queryVector;
    if (query?.trim()) {
      queryVector = await getEmbedding(query);
    } else {
      const filterTerms = Object.values(preprocessedFilters)
        .filter((v) => v !== undefined)
        .join(" ");
      queryVector = await getEmbedding(filterTerms || "curriculum");
    }
    if (!queryVector) {
      throw new Error("Failed to generate embedding for the query or filters.");
    }
    pineconeQuery.vector = queryVector;
    if (Object.keys(filterObject).length > 0) {
      pineconeQuery.filter = filterObject;
    }
    const results = await index.query(pineconeQuery);
    // Transform results to reconstruct curriculum structure
    return results.matches.map((match) => {
      const metadata = match.metadata;
      // Reconstruct strands and substrands from metadata
      const strands = metadata.strandCodes.map((code, index) => {
        const subStrands = metadata.subStrandCodes
          .filter((subCode) => subCode.startsWith(code))
          .map((subCode) => ({
            code: subCode,
            title: metadata[`title_${subCode}`],
            contentStandards: metadata[`content_${subCode}`],
            learningIndicators:
              metadata[`indicators_${subCode}`]?.split("|").filter(Boolean) ||
              [],
          }));
        return {
          code: code,
          name: metadata.strandNames[index],
          subStrand: subStrands,
        };
      });
      return {
        id: match.id,
        score: match.score,
        code: metadata.code,
        grade: metadata.grade,
        strands: strands,
      };
    });
  } catch (error) {
    console.error("Error searching curricula:", error);
    throw new Error(`Failed to search curricula: ${error.message}`);
  }
}

function buildPineconeFilter(filters) {
  const pineconeFilter = {};
  if (filters.grade) {
    pineconeFilter.grade = { $eq: filters.grade };
  }
  if (filters.code) {
    pineconeFilter.code = { $eq: normalizeString(filters.code) };
  }
  if (filters.strandCode) {
    pineconeFilter.strandCodes = { $in: [normalizeString(filters.strandCode)] };
  }
  if (filters.subStrandCode) {
    pineconeFilter.subStrandCodes = {
      $in: [normalizeString(filters.subStrandCode)],
    };
  }
  return pineconeFilter;
}

async function indexCurriculum(curriculum) {
  try {
    const curriculumText = getCurriculumText(curriculum);
    const embedding = await getEmbedding(curriculumText);
    await index.upsert([
      {
        id: curriculum._id.toString(),
        values: embedding,
        metadata: getCurriculumMetadata(curriculum),
      },
    ]);
    return true;
  } catch (error) {
    console.error("Error indexing curriculum:", error);
    throw new Error("Failed to index curriculum");
  }
}

async function deleteCurriculumFromIndex(curriculumId) {
  try {
    await index.delete1({ ids: [curriculumId] });
    return true;
  } catch (error) {
    console.error("Error deleting curriculum from index:", error);
    throw new Error("Failed to delete curriculum from index");
  }
}

export {
  indexCurriculum,
  searchCurricula,
  deleteCurriculumFromIndex,
};
