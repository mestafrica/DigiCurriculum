import { Curriculum, runMaintenanceTask } from './maintenance-utils.js';

await runMaintenanceTask(async () => {
  const list = await Curriculum.find({}).lean();
  console.log(JSON.stringify(list, null, 2));
});

