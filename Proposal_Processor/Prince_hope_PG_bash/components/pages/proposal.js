import MarkdownIt from "markdown-it"
import { useState,useRef } from "react/cjs/react.development"
import { useGlobalContext } from "../context"
import Link from "next/link"
import { useRouter } from "next/router";

const md = new MarkdownIt()

const Proposal = ()=>{
  const router =useRouter()
    const reference = useRef(null)
    const { propsObj, markdown, setMarkdown, setPropsObj, title,setTitle } = useGlobalContext();
    const handleSubmit =(e)=>{
        e.preventDefault()
        const length = propsObj.length
        const id = (propsObj.filter((props)=>props.id ==id).length > 0 )? length+1:length;
        setPropsObj([...propsObj, {name:title, desc:markdown, id:id, }])
        localStorage.setItem("proposals",JSON.stringify( [
          ...propsObj,
          { name: title, desc: markdown, id: Date.now() },
        ]));
        setPropsObj(...propsObj, {
          name: title,
          desc: markdown,
          id: Date.now(),
        });
        alert("Successfully created Proposal \nYou can edit You Propsal in the Hom or Proposals Page")
        console.log(title, markdown)
        router.push("/")
        
    }
    const handleChange = (e)=>{
        setMarkdown(e.target.value)
        
    }
    const handleTitleChange =(e)=>{
        setTitle(e.target.value)
        

    }
    // const result = md.render("# Markdown it rules")
    return (
      <form className="p-0 border-2 border-gray-500 rounded outline-none min-h-min">
        <div className="bg-blue-400 px-2 text-gray-50">
          This is a Markdown Editor So any Valid MarkDown will be valid
        </div>
        <input
          onChange={handleTitleChange}
          type="text"
          placeholder="Title of Proposal"
          className="mb-2 border-gray-500 border-t-2 border-b-2 outline-none px-4 py-2 w-full"
        />
        <textarea
          placeholder="Proposal Details"
          onChange={(e) => handleChange(e)}
          className={`m-5 w-96 h-full outline-none`}
          name="markdown"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <input
          type="submit"
          className="w-full p-2 text-center bg-blue-800 text-white cursor-pointer"
          onClick={(e) => handleSubmit(e)}
        />

      

      
      </form>
    );
}
export default Proposal