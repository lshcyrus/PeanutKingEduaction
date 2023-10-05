/*
  This React component is for the main content container of the student panel.
  Here loads all the content of the course, including the lab list, task list, and the task content.
*/

import React from 'react';
import globalVar from './globalVar.js';
import { SideBarContainer } from './SideBarContainer.js';
import { Title } from './Title.js';
import { NavBar } from './NavBar.js';
import { Introduction1 } from './Introduction1.js';
import { Introduction2 } from './Introduction2.js';
import { Tasklist } from './TaskList.js';
import { MaterialContainer } from './MaterialContainer.js';
import { VideoContainer } from './VideoContainer.js';
import { DisplayAllSteps } from './DisplayAllSteps.js';
import SideBar from './SideBar.js';

export class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
    try {
      this.state = {
        taskNum: 0,
        curTask: globalVar.courseData.labs[globalVar.labID - 1].tasks[globalVar.taskID],
        allTask: globalVar.courseData.labs[globalVar.labID - 1].tasks,
        allLab: globalVar.courseData.labs,
        dataExchange: 0
      };
    } catch (err) {
      window.location = "https://peanutkingeducation.com/dashboard/index.html";
    }
    //console.log(globalVar.courseData)
    //console.log("123", this.state.curTask);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    //console.log(this.state.allTask)
  }

  jumpToTask = () => {
    //console.log("num: " + globalVar.taskID)
    this.setState({ taskNum: globalVar.taskID });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleNext() {
    //console.log(globalVar.courseData.labs[globalVar.labID - 1].tasks.length+""+ this.state.taskNum)
    if (this.state.taskNum < globalVar.courseData.labs[globalVar.labID - 1].tasks.length) {
      globalVar.taskID = this.state.taskNum + 1;
      this.setState({ taskNum: ++this.state.taskNum });
    }
    else if (globalVar.courseData.labs.length > globalVar.labID) {
      globalVar.labID++;
      globalVar.taskID = 0;
      this.setState({ taskNum: globalVar.taskID });
    }
  }

  handlePrevious() {
    if (this.state.taskNum > 0) {
      globalVar.taskID = this.state.taskNum - 1;
      this.setState({ taskNum: --this.state.taskNum });
    }
    else if (globalVar.labID > 1) {
      globalVar.labID--;
      globalVar.taskID = globalVar.courseData.labs[globalVar.labID - 1].tasks.length;
      this.setState({ taskNum: globalVar.taskID });
    }
  }

  mobileGotoTask() {
    globalVar.taskID = this.state.dataExchange;
    //console.log("mobile going to", globalVar.taskID);
    //this.setState({taskNum: globalVar.taskID});
    this.jumpToTask();
    //console.log("mobile going to", taskNum);
  }
  mobileGotoLab() {
    globalVar.labID = this.state.dataExchange;
    //console.log('dsef',globalVar.labID);
    //console.log("globalVar.labID", globalVar.labID);
    globalVar.taskID = 0;
    this.setState({ taskNum: globalVar.taskID });
  }

  render() {
    //console.log("is mobile ", isMobile());
    //console.log("Task Number: " + this.state.taskNum);
    //console.log("Lab Number: " + globalVar.labID);
    //console.log("globalVar.language: " + globalVar.language);
    this.state.curLab = globalVar.courseData.labs[globalVar.labID - 1];
    this.state.allLab = globalVar.courseData.labs;

    if (this.state.taskNum != globalVar.taskID) this.state.taskNum = globalVar.taskID

    var labTitle, learningOutcomeTitle, lablearningOutcome, taskTitle, MaterialContainerTitle, taskListTitle, stepIntro, taskFinishText, taskSubmissionRequire;

    if (this.state.taskNum != 0) {
      this.state.curTask = this.state.curLab.tasks[this.state.taskNum - 1];
    }
    if (this.state.curTask == undefined) this.state.curTask = this.state.curLab.tasks[0];

    if (globalVar.language === "eng") {
      labTitle = this.state.curLab.lab_title_eng
      learningOutcomeTitle = "Learning Outcome"
      lablearningOutcome = this.state.curLab.learning_outcome_eng
      taskSubmissionRequire = this.state.curTask.submission_requirements_eng
      taskListTitle = "Task"
      MaterialContainerTitle = "You Will Need..."
      taskTitle = this.state.curTask.title_eng
      stepIntro = this.state.curTask.brief_eng
      taskFinishText = "You have finished this task."
    } else {
      labTitle = this.state.curLab.lab_title_chi
      learningOutcomeTitle = "學習目標"
      lablearningOutcome = this.state.curLab.learning_outcome_chi
      taskSubmissionRequire = this.state.curTask.submission_requirements_chi
      taskListTitle = "任務"
      MaterialContainerTitle = "你將需要..."
      taskTitle = this.state.curTask.title_chi
      stepIntro = this.state.curTask.brief_chi
      taskFinishText = "任務完成，太棒了！"
    }

    if (this.state.taskNum === 0) {
      return (//{console.log("ddd",this.state.curLab)}
        <div class="row gutter-x-zero">

          {/* <SideBarContainer onClick={() => this.jumpToTask()} /> */}
          <SideBar jumpToTask={this.jumpToTask} />
          
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4pt5">
            <div className='mobile-layout'>

              <Title mobileGotoLab={(value) => { this.state.dataExchange = value; this.mobileGotoLab() }} mobileGotoTask={(value) => { this.state.dataExchange = value; this.mobileGotoTask() }} allLab={this.state.allLab} allTask={this.state.curLab.tasks} taskNum={this.state.taskNum} labNum={this.state.curLab.lab_number} labTitle={labTitle} taskTitle={taskTitle} />
              <div class="navbar navbar-expand-md" id='Navbar'>
                <NavBar lastLab={this.state.allLab.length} lastLastTask={this.state.curLab.tasks.length} taskNum={this.state.taskNum} onClick={() => this.handleNext()} onClick2={() => this.handlePrevious()} />

              </div>

              <Introduction1 contents={lablearningOutcome} title={learningOutcomeTitle} handInBar={false} showLearningOutcome={true} />
              {this.state.curLab.materials.length > 0 ? <MaterialContainer title={MaterialContainerTitle} materials={this.state.allLab[globalVar.labID - 1].materials} /> : <div />}
              <Tasklist tasks={this.state.curLab.tasks} title={taskListTitle} onClick={() => this.jumpToTask()} />
            </div>
          </main>
        </div>
      );
    } else {
      //console.log("Task Num: "+this.state.taskNum)
      //console.log("Current Task: "+this.state.curTask);
      return (
        <div class="row gutter-x-zero">

          {/* <SideBarContainer onClick={() => this.jumpToTask()} /> */}
          <SideBar jumpToTask={this.jumpToTask} />
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4pt5">
            <div className='mobile-layout'>

              <Title mobileGotoLab={(value) => { this.state.dataExchange = value; this.mobileGotoLab() }} mobileGotoTask={(value) => { this.state.dataExchange = value; this.mobileGotoTask() }} allLab={this.state.allLab} allTask={this.state.curLab.tasks} taskNum={this.state.taskNum} labNum={this.state.curLab.lab_number} labTitle={labTitle} taskTitle={taskTitle} />

              <div class="navbar navbar-expand-md" id='Navbar'>
                <NavBar lastLab={this.state.allLab.length} lastLastTask={this.state.curLab.tasks.length} taskNum={this.state.taskNum} onClick={() => this.handleNext()} onClick2={() => this.handlePrevious()} />
              </div>
              <Introduction2 stepIntro={stepIntro} />
              <VideoContainer video={this.state.curTask.video} />
              <DisplayAllSteps setpsSet={this.state.curTask.steps} />
              {this.state.curTask.submission_required ? <Introduction1 contents={taskSubmissionRequire} title={taskFinishText} handInBar={this.state.curTask.submission_required} showLearningOutcome={false} stepNum={this.state.curTask.steps.length + 1} /> : <div></div>}
              <div class="navbar navbar-expand-md" id='Navbar'>
                <NavBar lastLab={this.state.allLab.length} lastLastTask={this.state.curLab.tasks.length} taskNum={this.state.taskNum} onClick={() => this.handleNext()} onClick2={() => this.handlePrevious()} />
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}