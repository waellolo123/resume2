import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";


const SkillsForm = ({data, onChange}) => {

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if(newSkill.trim() && !data.includes(newSkill.trim())){
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index)=>index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
     <div className="">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Skills</h3>
      <p className="text-sm text-gray-500">Add your technical and soft skills</p>
     </div>
     <div className="flex gap-2">
      <input 
      onChange={(e)=>setNewSkill(e.target.value)} value={newSkill} onKeyDown={handleKeyPress}
      className="flex-1 px-3 py-2 text-sm"
      type="text" placeholder="Enter a skill (e.g., Javascript, Project management" />
      <button 
      onClick={addSkill} disabled={!newSkill.trim}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        <Plus className="size-4"/> Add Skill
      </button>
     </div>
     {data.length > 0 ? (
       <div className="flex flex-wrap gap-2">
        {data.map((skill, index)=>(
          <span className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm" key={index}>
           {skill}
           <button
           onClick={()=>removeSkill(index)}
           className="ml-1 hover:bg-indigo-200 rounded-full p-0.5 transition-colors">
            <X className="w-3 h-3"/>
           </button>
          </span>
        ))}
       </div>
     ) : (
      <div className="text-center py-6 text-gray-500">
        <Sparkles className="w-10 h-10 mx-auto text-gray-300" />
        <p>No skills added yet.</p>
        <p className="text-sm">Add your technical and soft skills above.</p>
      </div>
     )}
     <div className="bg-indigo-50 text-indigo-800">
      <p className="text-sm text-indigo-800"><strong>Tip: </strong>Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
     </div>
    </div>
  )
}

export default SkillsForm;
