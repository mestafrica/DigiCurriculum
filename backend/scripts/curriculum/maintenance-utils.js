import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import CurriculumModel from '../../src/models/curriculumModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const Curriculum = CurriculumModel;

export async function connectToDatabase() {
  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not configured.');
  }

  await mongoose.connect(process.env.MONGODB_URL);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

export async function runMaintenanceTask(task) {
  try {
    await connectToDatabase();
    await task();
    await disconnectFromDatabase();
  } catch (err) {
    console.error(err);
    await disconnectFromDatabase().catch(() => {});
    process.exit(1);
  }
}

