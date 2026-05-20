import { Curriculum, runMaintenanceTask } from './maintenance-utils.js';

await runMaintenanceTask(async () => {
  const list = await Curriculum.find({}).lean();

  console.log('Current Curricula in DB:');

  const groupedByStage = list.reduce((groups, curriculum) => {
    const stage = curriculum.category || 'Uncategorized';
    if (!groups[stage]) groups[stage] = [];
    groups[stage].push(curriculum);
    return groups;
  }, {});

  Object.entries(groupedByStage).forEach(([stage, curricula]) => {
    console.log(`\n${stage}:`);
    curricula.forEach((curriculum) => {
      const level = curriculum.grade === 0
        ? 'KG'
        : curriculum.grade
          ? `B${curriculum.grade}`
          : 'N/A';

      console.log(
        `- ${level}: ${curriculum.name} (Code: ${curriculum.code}, Strands: ${curriculum.strands?.length || 0})`
      );
    });
  });
});

