// import React,{ useState } from 'react'
// import './Whitepaper.css' 


// import { FaSearchengin, FaHandsHelping } from "react-icons/fa";
// import { RiRoadMapFill } from "react-icons/ri";
// import { BsCodeSlash } from "react-icons/bs";
// import { GiToken } from "react-icons/gi";
// import { GrUpdate } from "react-icons/gr";
// import { FcDisclaimer } from "react-icons/fc";
// import { BiMenuAltRight,BiMenu } from "react-icons/bi";


// import { Link, useRouteMatch, Switch,Route } from "react-router-dom";
// import { Code, Disclaimer, RoadMap, Tokenomics, Updated, Utility } from '../../Pages';


// const Whitepaper = () => {

//     const [state, setstate] = useState(false)
//     const {path, url } = useRouteMatch()

//     const WhitepaperArray = [
//         {
//           text:'Code',
//           icon:<BsCodeSlash />,
//           pathe:`${url}/code`,
//         },
//         {
//           text:'Utility',
//           icon:<FaHandsHelping />,
//           pathe:`${url}/roadMap`,
//         },
//         {
//           text:'Tokenomics',
//           icon:<GiToken />,
//           pathe:`${url}/tokenomics`,
//         },
//         {
//           text:'RoadMap',
//           icon:<RiRoadMapFill />,
//           pathe:`${url}/roadMap`,
//         },
//         {
//           text:'Stay Updated',
//           icon:<GrUpdate />, 
//           pathe:`${url}/updated`,
//         },
//         {
//           text:'Disclaimer',
//           icon:<FcDisclaimer />,
//           pathe:`${url}/disclaimer`,
//         }
        
//       ]
//     const list__sidebar = WhitepaperArray.map(({text, icon,pathe},i) => (
//         <li key={i}>
//          <Link  to={pathe}>
//            <i>{icon}</i>
//            <span className="links_name">{text}</span>
//          </Link>
//          <span className="tooltip">{text}</span>
//        </li>
//       )
//     )
//     const toggleBtn = () => setstate(()=> !state)
//     const openBtn = () => setstate(true)
  
//     return (
//         <>
//              <div>
//           <div className={ state ? 'sidebar open' : 'sidebar '}>
//     <div className="logo-details">
//       <i onClick={toggleBtn} className='icon'>{state ? <BiMenuAltRight />:<BiMenu />}</i>
//         <div className="logo_name">Kishu Asa</div>
//         <i  onClick={openBtn} id="btn" >{!state && <BiMenu />}</i>
//     </div>
//     <ul className="nav__nav_lists">
//       <li>
//          <i class='bx-search' onClick={openBtn}><FaSearchengin /></i>
//          <input type="text" placeholder="Search..." />
//          <span className="tooltip">Search</span>
//       </li>
//      {list__sidebar}
//     </ul>
//   </div>
//   <section className="home-section">
//       <div className="text">Dashboard</div>
//   </section>
//         </div>

//         <Switch>
//         <Route exact path={`${path}/code`} component={Code} />
//            <Route path={`${path}/utility`} component={Utility} />
//            <Route path={`${path}/tokenomics`} component={Tokenomics} />
//            <Route path={`${path}/roadMap`} component={RoadMap} />
//            <Route path={`${path}/updated`} component={Updated} />
//            <Route path={`${path}/disclaimer`} component={Disclaimer} />
//         </Switch>
//         </>
//     )
// }

// export default Whitepaper


// import React from 'react'
// import { BiMenuAltRight,BiMenu } from "react-icons/bi";


// export default function Sidebar({toggleBtn, openBtn, state}) {
//     return (
//         <div className="logo-details">
//             <i onClick={toggleBtn} className='icon'>{state ? <BiMenuAltRight />:<BiMenu />}</i>
//             <div className="logo_name">Kishu Asa</div>
//             <i  onClick={openBtn} id="btn" >{!state && <BiMenu />}</i>
//        </div>
//     )
// }
















// import React from 'react'

// import { FaSearchengin, FaHandsHelping } from "react-icons/fa";
// import { RiRoadMapFill } from "react-icons/ri";
// import { BsCodeSlash } from "react-icons/bs";
// import { GiToken } from "react-icons/gi";
// import { GrUpdate } from "react-icons/gr";
// import { FcDisclaimer } from "react-icons/fc";



// export default function SidebarList({openBtn}) {

//     const WhitepaperList = [
//         {
//           text:'Search',
//           icon:<FaSearchengin />,
//         },
//         {
//           text:'Code',
//           icon:<BsCodeSlash />,
//           pathe:'code'
//         },
//         {
//           text:'Utility',
//           icon:<FaHandsHelping />,
//           pathe:'roadMap'
//         },
//         {
//           text:'Tokenomics',
//           icon:<GiToken />,
//           pathe:'tokenomics'
//         },
//         {
//           text:'RoadMap',
//           icon:<RiRoadMapFill />,
//           pathe:'roadMap'
//         },
//         {
//           text:'Stay Updated',
//           icon:<GrUpdate />, 
//           pathe:'updated'
//         },
//         {
//           text:'Disclaimer',
//           icon:<FcDisclaimer />,
//           pathe:'disclaimer'
//         }
//       ]

//     return (
//         <>
//             {WhitepaperList.map(({text, icon,pathe},i) => {
//       return (
//         <li key={i}>
//           { text === "Search" ? (
//             <>
//             <i className='bx-search' onClick={openBtn}><FaSearchengin /></i>
//             <input type="text" placeholder="Search..." />
//             </>
//           ):(
//             <Link  to={`/${pathe}`}>
//               <i>{icon}</i>
//               <span className="links_name">{text}</span>
//             </Link>
//           ) }
//            <span className="tooltip">{text}</span>
//          </li>
//       )
//     })}
//         </>
//     )
// }
