import mongoose, { Document, Schema } from 'mongoose';

interface IStudent {
  name: string;
  parentEmail: string;
  status: string;
  lastReportText?: string;
  reportDate?: Date;
}

interface IClass {
  className: string;
  students: IStudent[];
  lastReportSent: string;
  lastReportDate: Date;
  lastReportText?: string;
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
  classes: IClass[];
  lastLogin: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  parentEmail: { type: String, required: true },
  status: { type: String, default: 'active' },
  lastReportText: { type: String },
  reportDate: { type: Date },
});

const ClassSchema = new Schema<IClass>({
  className: { type: String, required: true },
  students: [StudentSchema],
  lastReportText: { type: String },
  lastReportDate: { type: Date }
});

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
  classes: [ClassSchema],
  lastLogin: { type: Date }
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);