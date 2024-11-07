function getCurriculumText(curriculum) {
    return `${curriculum.code || ""} ${curriculum.grade || ""} ${
        curriculum.strands.name || ""
    } ${(curriculum.strands.code || []).join(" ")} ${(
      curriculum.subStrand || []
    ).join(" ")} ${(curriculum.subStrand || []).join(" ")}`;
  }

async function indexCurriculum(curriculum) {
    try {
      const curriculumText = getCurriculumText(curriculum);
      const embedding = await geminiService.getEmbedding(curriculumText);
  
      await index.upsert([
        {
          id: curriculum._id.toString(),
          values: embedding,
          metadata: getCurriculumMetadata(curriculum),
        },
      ]);
  
      // console.log(`Indexed curriculum: ${curriculum._id}`);
    } catch (error) {
      console.log("Error indexing curriculum:", error);
      throw new Error("Failed to index curriculum")}
}
