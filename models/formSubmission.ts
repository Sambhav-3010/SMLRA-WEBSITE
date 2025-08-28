import mongoose, { Document, Model, Schema } from 'mongoose';
import { IFormSubmission } from '../types/form';

export interface IFormSubmissionDocument extends IFormSubmission, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FormSubmissionSchema = new Schema<IFormSubmissionDocument>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Roll number cannot exceed 20 characters']
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    enum: {
      values: ['1st', '2nd', '3rd'],
      message: 'Please select a valid year'
    }
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
    maxlength: [100, 'Branch name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number']
  },
  resume: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\//.test(v);
      },
      message: 'Resume must be a valid URL'
    }
  },
  linkedin: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/(www\.)?linkedin\.com\//.test(v);
      },
      message: 'LinkedIn must be a valid LinkedIn URL'
    }
  },
  github: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/(www\.)?github\.com\//.test(v);
      },
      message: 'GitHub must be a valid GitHub URL'
    }
  },
  about: {
    type: String,
    trim: true,
    maxlength: [500, 'About section cannot exceed 500 characters']
  },
  preference1: {
    type: String,
    trim: true,
    maxlength: [100, 'Preference cannot exceed 100 characters']
  },
  preference2: {
    type: String,
    trim: true,
    maxlength: [100, 'Preference cannot exceed 100 characters']
  },
  preference3: {
    type: String,
    trim: true,
    maxlength: [100, 'Preference cannot exceed 100 characters']
  },
  whyYou: {
    type: String,
    trim: true,
    maxlength: [1000, 'Response cannot exceed 1000 characters']
  },
  questions: {
    type: String,
    trim: true,
    maxlength: [500, 'Questions cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  collection: 'form_submissions'
});


// Check if model already exists to prevent re-compilation error
const FormSubmission: Model<IFormSubmissionDocument> = 
  mongoose.models.FormSubmission || mongoose.model<IFormSubmissionDocument>('FormSubmission', FormSubmissionSchema);

export default FormSubmission;