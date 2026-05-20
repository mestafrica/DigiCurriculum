import { Curriculum, runMaintenanceTask } from './maintenance-utils.js';

if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to reset curriculum data in production.');
  process.exit(1);
}

if (process.env.CONFIRM_CURRICULUM_RESET !== 'true') {
  console.error('Set CONFIRM_CURRICULUM_RESET=true to reset curriculum data.');
  process.exit(1);
}

const PRIMARY_SUBJECTS = [
  'Mathematics',
  'English',
  'Science',
  'French',
  'Computing',
  'Ghanaian Language',
  'History',
  'Physical Education',
  'Our World Our People',
  'Creative Arts',
  'Religious and Moral Education',
];

const SECONDARY_SCIENCE_TECH = [
  'Additional Mathematics',
  'Agricultural Science',
  'Agriculture',
  'Applied Technology',
  'Biology',
  'Biomedical Science',
  'Chemistry',
  'Computing',
  'Engineering',
  'Information Communication Technologies',
  'Physics',
  'Robotics',
];

const SECONDARY_ARTS_HUMANITIES = [
  'Arabic',
  'Art and Design Foundation',
  'Art and Design Studio',
  'Economics',
  'English Language',
  'French',
  'Geography',
  'Government',
  'History',
  'Literature-in-English',
  'Performing Arts',
  'Religious and Moral Education',
  'Social Studies',
  'Spanish',
];

const SECONDARY_VOCATIONAL = [
  'Aviation and Aerospace Engineering',
  'Design and Communication Technology',
  'Manufacturing Engineering',
];

const SECONDARY_GENERAL = [
  'Mathematics',
  'Physical Education & Health (Core)',
  'Physical Education & Health (Elective)',
];

function buildDefaultCurricula() {
  const newCurricula = [
    {
      name: 'Kindergarten General',
      code: 'KG-GEN',
      grade: 0,
      category: 'Kindergarten',
      strands: [],
    },
  ];

  for (let grade = 1; grade <= 6; grade++) {
    for (const subject of PRIMARY_SUBJECTS) {
      newCurricula.push({
        name: subject,
        code: `PRI-${subject.substring(0, 4).toUpperCase()}-B${grade}`,
        grade,
        category: 'Primary',
        strands: [],
      });
    }
  }

  const addSecondary = (subjects, group) => {
    for (const subject of subjects) {
      newCurricula.push({
        name: `${subject} (${group})`,
        code: `SEC-${subject.substring(0, 4).toUpperCase()}-${group.substring(0, 2).toUpperCase()}`,
        grade: 10,
        category: 'Secondary',
        strands: [],
      });
    }
  };

  addSecondary(SECONDARY_SCIENCE_TECH, 'Science & Tech');
  addSecondary(SECONDARY_ARTS_HUMANITIES, 'Arts & Humanities');
  addSecondary(SECONDARY_VOCATIONAL, 'Specialized/Vocational');
  addSecondary(SECONDARY_GENERAL, 'General');

  return newCurricula;
}

await runMaintenanceTask(async () => {
  const defaultCurricula = buildDefaultCurricula();

  console.log('Purging existing curriculums...');
  await Curriculum.deleteMany({});

  console.log(`Inserting ${defaultCurricula.length} new curriculum entries...`);
  await Curriculum.insertMany(defaultCurricula);

  console.log('Database reset complete.');
});
