import { Schema, model, Types } from "mongoose"; 


const TaskSchema = new Schema
({
    title: { type: String, required: true },
    subjectTag: { type: String, required: true },
    status: { type: String, enum: ['upcoming-tasks', 'to-do', 'in-progress', 'done'], default: 'upcoming-tasks' },
    owner: { type: Types.ObjectId, ref: "User", required: true }
}, 
{ timestamps: true 

});

const Task = model('Task', TaskSchema);

export default Task;