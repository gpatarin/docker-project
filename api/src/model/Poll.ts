import mongoose from "mongoose";

export interface Poll {
    id: string;
    agree: number;
    disagree: number;
    result: string;
}

const schema = new mongoose.Schema<Poll>({
  id: { type: String, required: true, unique: true , index: true},
  agree: { type: Number, required: true },
  disagree: { type: Number, required: true },
  result: { type: String, required: true },
});

export const PollModel = mongoose.model<Poll>('Poll', schema);