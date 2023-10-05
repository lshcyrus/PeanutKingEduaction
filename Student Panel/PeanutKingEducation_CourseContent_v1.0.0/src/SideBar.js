import React, { useEffect } from 'react';
import { useCourseContext } from './CourseContext';
import Sider from 'antd/es/layout/Sider';
import styled from 'styled-components';
import SideNavLab from './sidenavLab';
import SideNavTask from './sidenavTask';
import { Transition } from 'react-transition-group';
import globalVar from './globalVar';

// style for sidebar
const StyledSider = styled(Sider)`
    background-color: white;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
    padding-top: 80px;
    
    
    a,
    a:hover, 
    a:visited,
    a:active {
      color: black;
      text-decoration: none;
    }

    .sidenavHeader {
      display: flex;
      justify-content: center;
      text-align: center;
      background-color: #293241;
      color: white;
      font-size: 20px;
      font-weight: 550;
      padding: 10px 22px;
    }

    .sidenavContent {
      background-color: white;
      display: flex;
      padding: 18px;
      color: black;
      border-bottom: 0.5px solid #eaeded;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
    }
    
    .sidenavContent:hover {
      background-color: #eaeded;
    }

    .sidenavContent p {
      margin: 0;
      font-size: 15px;
      font-weight: 400;
    }

    .sidenavContent i {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidenavContent svg:hover {
      color: #a8a8a8;
    }

    .sub-header {
      display: flex;
      justify-content: flex-start;
      background-color: white;
      color: black;
      padding: 10px 20px 10px 10px;
      border-bottom: 0.5px solid #eaeded;
    }

    .sub-header i {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 10px;
    }

    .sub-header:hover {
      background-color: #eaeded;
      cursor: pointer;
    }

    .sub-header svg:hover {
      color: #a8a8a8;
    }

    @keyframes moveTaskPage {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    @keyframes moveBackTaskPage {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes moveLabPage {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .sidebarMain {
      display: grid;
      grid-template-areas: 'main';
    }
      
    .sidebarMain > div {
      grid-area: main;
    }

    @media screen and (max-width: 1300px) {

      .sidenavHeader {
        font-size: 16px;
      }
    
      .sidenavContent p {
        font-size: 14px;
      }

    }

    @media screen and (max-width: 768px) {
      display: none;
    }

`;


const SideBar = (props) => {

  const { labData, taskPage } = useCourseContext();

  const splitCourseName = (name) => {
    if (name.split(' | ').length === 1) {
      return name;
    } else {
      if (globalVar.language === 'eng') {
        return name.split(' | ')[0];
      } else {
        return name.split(' | ')[1];
      }
    }
  }

  const scrollToStep = (id) => {
    const step = document.getElementById(id);
    const offset = 85;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = step.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }


  return (
    <StyledSider width='16.6667%'>
      <div className='sidenavHeader'>
        {labData && splitCourseName(labData.name)}
      </div>
      <div className='sidebarMain'>
        <Transition in={!taskPage} timeout={300} unmountOnExit mountOnEnter>
          {state => (
            <SideNavLab state={state} jumpToTask={props.jumpToTask} />
          )}
        </Transition>

        <Transition in={taskPage} timeout={300} unmountOnExit mountOnEnter>
          {state => (
            <SideNavTask state={state} jumpToTask={props.jumpToTask} />
          )}
        </Transition>
      </div>
    </StyledSider>
  );

}

export default SideBar;
