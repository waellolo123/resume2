import {Sparkles} from "lucide-react";

// eslint-disable-next-line no-unused-vars
const ProfessionalSumaryform = ({data, onChange, setResumeData}) => {

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div className="">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-500">Professional summary</h3>
        <p className="text-sm text-gray-500">Add summary for your resume here</p>
      </div>
      <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50">
       <Sparkles className="size-4" />
       AI Enhance
      </button>
      </div>

     <div className="mt-6">
      <textarea
      value={data || ""} onChange={(e)=>onChange(e.target.value)} 
      rows={7} 
      placeholder="Write a compelling professional summary that hightlights your key strengths and career objectives..."
      className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none" />
      <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
        Tip: Keep it concise (3-4 sentencesj) and focus on your most relevant achievements and skills.
      </p>
     </div>

    </div>
  )
}

export default ProfessionalSumaryform;
