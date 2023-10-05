import React from 'react';
import { Collapse } from 'bootstrap';
import globalVar from './globalVar.js';

import './style.css';
import { arabicToChinese } from './arabicToChinese.js';

export class SideBarContainer extends React.Component {
  constructor(props) {
    //console.log("before showing sidebar");
    //console.log(globalVar.courseData);
    super(props);
    this.state = {
      sideBarTitle: globalVar.courseData.name,
      allLabs: globalVar.courseData.labs,
      onClick: props.onClick,
    }
    console.log(this.state.sideBarTitle);
  }

  jumpToTask(num) {
    globalVar.taskID = num.taskNum;
    globalVar.labID = num.labNum;
    this.state.onClick(); // call the parent function
  }

  render() {
    var listS;
    var listXS;
    const str = "a";
    const labText = (globalVar.language === "eng") ? "Lab " : "實驗";
    const taskText = (globalVar.language === "eng") ? "Task " : "任務";
    const introText = (globalVar.language === "eng") ? "Introduction" : "簡介";
    // this.setState({sideBarTitle: globalVar.courseData[globalVar.courseID - 1].name,
    //   allLabs: globalVar.courseData[globalVar.courseID - 1].labs});
    listS = globalVar.courseData.labs.map(
      (allLabs) =>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed " data-bs-toggle="collapse" data-bs-target={"#" + str + allLabs.lab_number} aria-expanded="false">
            {labText + ((allLabs.lab_number < 10) ? "0" : "") + allLabs.lab_number + " " + ((globalVar.language === "eng") ? allLabs.lab_title_eng : allLabs.lab_title_chi)}
          </button>
          <div className="collapse" id={str + allLabs.lab_number}>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className={"list-item " + ((("Lab" + globalVar.labID + "Task" + globalVar.taskID) === ("Lab" + allLabs.lab_number + "Task" + 0)) ? "active" : "")} onClick={() => this.jumpToTask({ labNum: allLabs.lab_number, taskNum: 0, data: "Lab" + allLabs.lab_number + "Task" + 0 })}><a href="#" className="link-white d-inline-flex text-decoration-none rounded">{introText}</a></li>
              {
                listXS = allLabs.tasks.map(
                  (task) => <li className={"list-item " + ((("Lab" + globalVar.labID + "Task" + globalVar.taskID) === ("Lab" + allLabs.lab_number + "Task" + task.task_number)) ? "active" : "")} onClick={() => this.jumpToTask({ labNum: allLabs.lab_number, taskNum: task.task_number, data: "Lab" + allLabs.lab_number + "Task" + task.task_number })}><a href="#" className="link-white d-inline-flex text-decoration-none rounded">{taskText + ((globalVar.language === "eng") ? (task.task_number + " " + task.title_eng) : (arabicToChinese(task.task_number) + "：" + task.title_chi))}</a></li>
                )
              }
            </ul>
          </div>
        </li>
    );
    return (
      <ul className="col-md-3 col-lg-2 bg-pkDarkBlue3 sidebar">
        <nav className="bd-links">
          <li className="nav-item">
            <h4 className="nav-link" href="#">{globalVar.courseData.name}</h4>
          </li>
          {listS}
        </nav>
      </ul>
    );
  }
}