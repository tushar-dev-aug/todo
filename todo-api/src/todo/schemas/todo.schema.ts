import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    due_date: {type: Date},
    created_at: { type: Date, default: Date.now }
})