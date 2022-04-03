import styles from "../../styles/Home.module.css"
import ErrorComponent from "./error";
import MarkdownIt from "markdown-it";
import { useRef,useEffect, useState } from "react";
const md = new MarkdownIt();


const VoteComponent = ({name, desc, id, children}) => {
  const [vote, setVote] = useState(null)
  const ref = useRef(null)
  const result = md.render(desc);
  useEffect(() => {
    const childNode =  document.createElement("div")
    childNode.innerHTML = `<div className="text-bold text-xl">PROPOSAL:</div> \n<div className="bg-blue-300 rounded text-white p-2 mb-4">${result}</div>`;

    ref.current.appendChild(childNode)
    
  }, [])
    if (!id)
   {return <>
{children}
    <ErrorComponent/>
    </>}
  return (
    <>
      {children}
      {ref && (
        <section className="p-0 border-2 border-gray-500 rounded outline-none w-[70vw] max-w-[500px]">
          <div className="bg-blue-400 px-2 text-gray-50 text-2xl w-full">
            Choice Coin voting
          </div>
          <div
            placeholder="Title of Proposal"
            className="bg-gray-100 mb-2 border-gray-500 border-t-2 border-b-2 outline-none px-4 py-2 w-full "
          >
            <div className="text-bold text-xl">TITLE :</div> {name}
          </div>
          <div
            ref={ref}
            className={` w-full  outline-none bg-gray-100 px-3 py-2 mb-2 border-gray-500 border-t-2 border-b-2`}
            name="markdown"
            id=""
          >
            Description
          </div>
          <div
            className={` w-full mb-2 border-gray-500 border-t-2 border-b-2 outline-none bg-gray-100 px-3 py-2`}

>
            <div className="text-bold text-xl mb-3">CAST VOTE:</div>
            <div className="flex justify-between pb-3">
<div onClick={()=>setVote(0)} className={`yes ${(vote==0)?"bg-green-500":"bg-green-300"} px-3 py-1 rounded-sm cursor-pointer text-white`}>YES</div>
 <div  onClick={()=>setVote(1)} className={`no ${vote==1?"bg-red-500":"bg-red-300"} px-3 py-1 rounded-sm cursor-pointer text-white`}>NO</div>
            </div>
          </div>
          <input
            type="submit"
            className="w-full p-2 text-center bg-blue-800 text-white cursor-pointer"
          />
        </section>
      )}
    </>
  );
};
export default VoteComponent;
