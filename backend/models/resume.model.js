import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: {type: String, default: "Untitled Resume"},
  public: {type: Boolean, default: false},
  template: {type: String, default: "classic"},
  accent_color: {type: String, default: "#3b82f6"},
  professional_summary: {type: String, default: ""},
  skills: [{type: String}],
  personal_info: {
    image: {type: String, default: ""},
    full_name: {type: String, default: ""},
    profession: {type: String, default: ""},
    email: {type: String, default: ""},
    phone: {type: String, default: ""},
    location: {type: String, default: ""},
    linkedin: {type: String, default: ""},
    website: {type: String, default: ""},
  },
  experience: [
    {
      company: String,
      postion: String,
      start_date: String,
      end_date: String,
      is_current: {type: Boolean}
    }
  ],
  projects: [
    {
      name: String,
      type: String,
      description: String
    }
  ],
   education: [
    {
      institution: String,
      degree: String,
      filed: String,
      graduation: String,
      gpa: String
    }
  ],
}, {timeStamps: true, minimize: false});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;

