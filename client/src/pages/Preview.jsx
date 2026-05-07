import { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { useEffect } from "react";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {

  const {resumeId} = useParams();
   
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null));
    setIsLoading(false);
  };

  useEffect(()=>{
    loadResume();
  },[])


  return resumeData ? (
    <div className="bg-slate-100">
     <div className="max-w-3xl mx-auto py-10">
       <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} className="py-4 bg-white" />
      </div> 
    </div>
  ) : (
   <div className="">
    {isLoading ? <Loader /> : (
      <div className="flex flex-col items-center justify-center h-screen">
       <p className="text-center text-6xl text-slate-400 font-medium">Resume not Found</p>
       <a href="/" className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-6 h-9 m-1 flex items-center transition-colors">
        <ArrowLeftIcon className="mr-2 size-4" />
        Go to home page 
       </a> 
      </div>
    )}
   </div>
)
}

export default Preview;
