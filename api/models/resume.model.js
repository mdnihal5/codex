import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:true,
    },
    github: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkdin: {
      type: String,
      required:true
    },
    link:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
