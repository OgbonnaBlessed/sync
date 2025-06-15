import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  schoolName: string;
  schoolLocation: string;
  password: string;
  userRole?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema definition
const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        schoolName: {
            type: String,
            required: [true, "School name is required"],
            trim: true,
        },
        schoolLocation: {
            type: String,
            required: [true, "School location is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        userRole: {
          type: String,
          default: 'principal'
        }
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;