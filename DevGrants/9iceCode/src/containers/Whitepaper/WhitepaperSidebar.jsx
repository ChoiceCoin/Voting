import React,{ useState } from 'react'
import { useRouteMatch, Link } from "react-router-dom";

import './Whitepaper.css' 

import { FaSearchengin, FaHandsHelping } from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";
import { BsCodeSlash } from "react-icons/bs";
import { GiToken } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { FcDisclaimer } from "react-icons/fc";
import { BiMenuAltRight,BiMenu } from "react-icons/bi";


const WhitepaperList = [
         {
           text:'Search',
           icon:<FaSearchengin />,
         },
         {
           text:'Code',
           icon:<BsCodeSlash />,
           pathe:'code'
         },
         {
           text:'Utility',
           icon:<FaHandsHelping />,
           pathe:'roadMap'
         },
         {
           text:'Tokenomics',
           icon:<GiToken />,
           pathe:'tokenomics'
         },
         {
           text:'RoadMap',
           icon:<RiRoadMapFill />,
           pathe:'roadMap'
         },
         {
           text:'Stay Updated',
           icon:<GrUpdate />, 
           pathe:'updated'
         },
         {
           text:'Disclaimer',
           icon:<FcDisclaimer />,
           pathe:'disclaimer'
         }
]


  export default function WhitepaperSidebar() {
    const [state, setstate] = useState(false)
    const toggleBtn = () => setstate(()=> !state)
    const openBtn = () => setstate(true)

    const { url} = useRouteMatch()

    const Sidebar = () => (
      <div className="logo-details">
        <i onClick={toggleBtn} className='icon'>{state ? <BiMenuAltRight />:<BiMenu />}</i>
        <div className="logo_name">Kishu Asa</div>
        <i  onClick={openBtn} id="btn" >{!state && <BiMenu />}</i>
      </div>
    )
    return(
      <div className={ state ? 'sidebar open' : 'sidebar '}>
        <Sidebar />
        <ul className="nav__nav_lists">
          {
            WhitepaperList.map(({text, icon,pathe},i) => {
              return (
                <li key={i}>
                  { text === "Search" ? (
                    <>
                    <i className='bx-search' onClick={openBtn}><FaSearchengin /></i>
                    <input type="text" placeholder="Search..." />
                    </>
                  ):(
                    <Link  to={`${url}/${pathe}`}>
                      <i>{icon}</i>
                      <span className="links_name">{text}</span>
                    </Link>
                  ) }
                   <span className="tooltip">{text}</span>
                 </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  
  