import React,{useState} from 'react'
import Sidebar from "../Sidebar"
import "./style.css";

const SidebarController = () => {
  const [showSidebar, setShowSidebar]= useState(false);
  const openSidebar=()=>{
   setShowSidebar(true)
  }
  const closeSidebar=()=>{
   setShowSidebar(false)
  }
    return (
      <>
      <div onClick={openSidebar} className="hamberger_icon">  &#9776;</div>
      {showSidebar? <Sidebar closeSidebar={closeSidebar}/>:null}
      </>
    )
}

export default SidebarController
