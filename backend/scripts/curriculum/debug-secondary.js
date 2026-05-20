import { Curriculum, runMaintenanceTask } from './maintenance-utils.js';

await runMaintenanceTask(async () => {
  const secondary = await Curriculum.find({ category: 'Secondary' }).limit(5).lean();

  console.log('Sample Secondary Subjects:');
  secondary.forEach((subject) => {
    console.log(`- Name: "${subject.name}", Category: "${subject.category}"`);
  });

  const allCategories = await Curriculum.distinct('category');
  console.log('\nAll Categories in DB:', allCategories);
});

