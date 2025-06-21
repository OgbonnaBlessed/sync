import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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
  image?: string;
  classes: IStudent[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const TeacherSchema: Schema<ITeacher> = new Schema({
    name: { type: String, required: true },
    DOB: { type: String, required: true },
    discipline: { type: String, required: true },
    certification: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    teacherId: { type: String, required: true, unique: true },
    userRole: { type: String, default: 'teacher' },
    image: { 
        type: String, 
        default: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" 
    },
    classes: [
        {
            name: { type: String },
            parentEmail: { type: String }
        }
    ]
}, { timestamps: true });

// Hash password before saving
TeacherSchema.pre<ITeacher>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
TeacherSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);