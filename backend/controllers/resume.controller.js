import imagekit from "../config/imagekit.js";
import Resume from "../models/resume.model.js";
import fs from "fs";



// ******************************************************
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {title} = req.body;
    // create new resume
    const newResume = await Resume.create({userId, title});
    // return success message
    res.status(201).json({message: "Resume created successfully", resume: newResume});
  } catch (error) {
    console.log("error in create resume controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {resumeId, resumeData, removeBackgournd} = req.body;
    const image = req.file;

    let resumeDataCopy;

    if(typeof resumeData === "string"){
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if(image){
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: "user-resumes",
        transformation: {
          pre: "w-300, h-300, fo-face, z-0.75" + (removeBackgournd ? ",e-bgremove" : "")
        }
      });
      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true});
    return res.status(200).json({message: "resume updated and saved", resume});
  } catch (error) {
    console.log("error in update resume controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const deleteResume = async (req, res) => {
   try {
    const userId = req.userId;
    const {resumeId} = req.params;
    await Resume.findOneAndDelete({userId, _id: resumeId});
    res.status(200).json({message: "resume deleted"});
  } catch (error) {
    console.log("error in delete resume controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const getResumeById = async (req, res) => {
   try {
    const userId = req.userId;
    const {resumeId} = req.params;
    const resume = await Resume.findOne({userId, _id: resumeId});
    if(!resume){
      return res.status(404).json({message: "No Resume found"});
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    res.status(200).json({resume});
  } catch (error) {
    console.log("error in get resume controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}


// ******************************************************
export const getPublicResumeById = async (req, res) => {
   try {
    const {resumeId} = req.params;
    const resume = await Resume.findOne({public: true, _id: resumeId});
     if(!resume){
      return res.status(404).json({message: "No Resume found"});
    }
    res.status(200).json({resume});
  } catch (error) {
    console.log("error in get public resume controller", error.message);
    return res.status(500).json({message: "internal server error"});
  }
}

