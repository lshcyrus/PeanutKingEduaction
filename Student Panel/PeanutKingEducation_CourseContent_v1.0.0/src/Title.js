/*
  This React component is for the title of the course content container.
*/

import { isMobile } from 'react-device-detect';
import Select from 'react-select';
import globalVar from './globalVar';
import { arabicToChinese } from './arabicToChinese';

export function Title(props) {
  var listLabs = [];
  for (var j = 0; j < props.allLab.length; j++) {
    var label = (globalVar.language === "eng") ? ("Lab " + (j + 1) + " - " + props.allLab[j].lab_title_eng) : ("實驗 " + arabicToChinese(j + 1) + " ： " + props.allLab[j].lab_title_chi);
    var value = j + 1;
    listLabs.push({ "value": value, "label": label });
  }
  var listTasks = [];
  for (var j = 0; j < props.allTask.length; j++) {
    var label = (globalVar.language === "eng") ? ("Task " + (j + 1) + " - " + props.allTask[j].title_eng) : ("任務 " + arabicToChinese(j + 1) + " ： " + props.allTask[j].title_chi);
    var value = j + 1;
    //console.log("preparing dropdown", label);
    listTasks.push({ "value": value, "label": label });
  }
  //{(globalVar.language === "eng") ? ("Task " + i++ + " - " + element.title_eng) : ("任務 " + arabicToChinese(i++) + " ： " + element.title_chi)}

  const name = (globalVar.courseData.name.split(' | ').length === 1) ? globalVar.courseData.name : (globalVar.language === 'eng') ? globalVar.courseData.name.split(' | ')[0] : globalVar.courseData.name.split(' | ')[1];
  const labText = (globalVar.language === "eng") ? "Lab " : "實驗 "
  const taskText = (globalVar.language === "eng") ? "Task " : "任務"
  const labTitle = labText + ((props.labNum < 10) ? "0" : "") + props.labNum + " - " + props.labTitle;

  if (props.taskNum == 0) {//{isMobile ? <select id="coursesLabs_" className="dropdown" style={{ width: "100%", minHeight: "40px", height: "auto", whiteSpace: "normal", wordWrap: "normal", fontSize: "22px" }} onChange={() => props.mobileGotoLab()}>{listLab}</select> : <div><h2>{labTitle}</h2></div>}
    return (
      <div>
        <h2 style={{ textAlign: 'center', paddingBottom: '15px'}}>{name}</h2>
        {isMobile ? <Select value={globalVar.labID} options={listLabs} onChange={(selected_item) => { props.mobileGotoLab(selected_item.value) }} placeholder={labTitle}></Select> : <div><h2>{labTitle}</h2></div>}
        {isMobile ? <Select value={globalVar.taskID} options={listTasks} onChange={(selected_item) => { props.mobileGotoTask(selected_item.value) }} placeholder={"Introduction"}></Select> : <div></div>}
      </div>
    );
  }
  else {
    const taskTitle = taskText + ((globalVar.language === "eng") ? props.taskNum : arabicToChinese(props.taskNum)) + ((globalVar.language === "eng") ? " - " : "：") + props.taskTitle;
    return (
      <div>
        <h2 style={{ textAlign: 'center', paddingBottom: '15px'}}>{name}</h2>
        {isMobile ? <Select value={globalVar.labID} options={listLabs} onChange={(selected_item) => { props.mobileGotoLab(selected_item.value) }} placeholder={labTitle}></Select> : <div><h2>{labTitle}</h2></div>}
        {isMobile ? <Select value={globalVar.taskID} options={listTasks} onChange={(selected_item) => { props.mobileGotoTask(selected_item.value) }} placeholder={taskTitle}></Select> : <div><h3>{taskTitle}</h3></div>}
      </div>
    );
  }
}