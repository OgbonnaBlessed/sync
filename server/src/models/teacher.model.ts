import mongoose, { Document, Schema } from 'mongoose';

interface IStudent {
  name: string;
  parentEmail: string;
}

export interface ITeacher extends Document {
  name: string;
  DOB: string;
  discipline: string;
  certification: string;
  password: string;
  teacherId: string;
  userRole: 'teacher';
  gender: string;
  status: string;
  image?: string;
  classes: IStudent[];
  lastLogin: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const TeacherSchema: Schema<ITeacher> = new Schema({
  name: { type: String, required: true },
  DOB: { type: String, required: true },
  discipline: { type: String, required: true },
  certification: { type: String, required: true },
  password: { type: String, required: true },
  teacherId: { type: String, required: true, unique: true },
  userRole: { type: String, default: 'teacher' },
  gender: { type: String, required: true },
  status: { type: String, default: 'active' },
  image: { type: String },
  classes: [
    {
      name: { type: String },
      parentEmail: { type: String }
    }
  ],
  lastLogin: { type: Date }
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);