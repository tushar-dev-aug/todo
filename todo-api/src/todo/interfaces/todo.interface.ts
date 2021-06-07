import { Document } from 'mongoose';

export interface Todo extends Document {
    readonly title: string;
    readonly description: string;
    readonly due_date: Date;
    readonly created_at: Date;
}