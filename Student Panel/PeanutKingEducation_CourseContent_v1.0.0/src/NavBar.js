import { isMobile } from "react-device-detect";
import globalVar from "./globalVar";
import { useState, useEffect } from 'react';
import { useCourseContext } from './CourseContext';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function topFunction() {
  // console.log("Go to Top");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



export function NavBar(props) {//if at the very first or last page, hide navigation buttons
  // console.log("NavBar render");

  const nextText = (globalVar.language === "eng") ? "Next" : "下一頁"
  const previousText = (globalVar.language === "eng") ? "Previous" : "上一頁"
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const width1 = windowDimensions.width / 2 - 35;
  const width2 = 250;
  const buttonstyle = {
    width: isMobile ? (windowDimensions.width > 600 && windowDimensions.width <= 810) ? width2 : width1 : "110px"
  };

  const { setTaskPage } = useCourseContext();

  //  console.log(windowDimensions.width);
  //  boldTextGenerate()

  return (
    <div className="container-fluid px-0">
      <ul className="navbar-nav me-3">
        {props.taskNum == 0 && globalVar.labID == 1 ? <p></p> : <button className="btn btn-outline-secondary" type="submit" style={buttonstyle} onClick={() => { props.onClick2(); topFunction(); setTaskPage(false) }}>&laquo; {previousText}</button>}
      </ul>
      <ul className="navbar-nav">
        {(globalVar.labID == props.lastLab && props.taskNum == props.lastLastTask) ? <p></p> : <button className="btn btn-outline-success" type="submit" style={buttonstyle} onClick={() => { props.onClick(); topFunction(); setTaskPage(false) }}>{nextText} &raquo;</button>}
      </ul>
    </div>
  );
}