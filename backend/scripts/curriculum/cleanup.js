import { Curriculum, runMaintenanceTask } from './maintenance-utils.js';

const APPLY_CHANGES = process.argv.includes('--apply');
const allowedStages = new Set(['Kindergarten', 'Primary', 'Secondary']);

await runMaintenanceTask(async () => {
  const allCurricula = await Curriculum.find({}).lean();
  const disallowedCurricula = allCurricula.filter(
    (item) => !allowedStages.has(item.category)
  );

  if (disallowedCurricula.length === 0) {
    console.log('No disallowed curriculum records found.');
    return;
  }

  console.log(
    `${APPLY_CHANGES ? 'Deleting' : 'Dry run: would delete'} ${disallowedCurricula.length} disallowed curriculum record(s):`
  );

  disallowedCurricula.forEach((item) => {
    console.log(`- ${item.name} (Category: ${item.category || 'Uncategorized'})`);
  });

  if (!APPLY_CHANGES) {
    console.log('\nNo changes were made. Run with --apply to delete these records.');
    return;
  }

  const ids = disallowedCurricula.map((item) => item._id);
  const result = await Curriculum.deleteMany({ _id: { $in: ids } });

  console.log(`\nCleanup complete. Removed ${result.deletedCount} item(s).`);
});

