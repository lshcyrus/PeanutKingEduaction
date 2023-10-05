/*
  This component is used to display steps in the student panel.
  Steps.js is called here.
*/

import globalVar from './globalVar.js';
import { StepContainer } from './StepContainer.js'
import Steps from './Steps.js'
import React, { useEffect, useState } from 'react';
import { Affix, notification } from 'antd';

export function DisplayAllSteps(props) {   

  const [scroll, setScroll] = useState(0);
  const [api, contextHolder] = notification.useNotification();  // notification hook, included in ant design library

  const openEngNotification = () => {   // automatically open eng notification when the page is loaded
    api.info({
      message: 'Previewing image',
      description: 'Click on the image to preview it in larger size with magnifier tool.',
      placement: 'top'
    });
  };

  const openChiNotification = () => {   // automatically open chi notification when the page is loaded
    api.info({
      message: '預覽圖片',
      description: '按一下圖片可用放大鏡工具放大圖片。',
      placement: 'top'
    });
  };

  const scrollToStep = (id) => {
    const step = document.getElementById(id);
    const offset = 177;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = step.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (winScroll / height) * 100;

    setScroll(scrolled);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    if (globalVar.language === "eng")
      openEngNotification();
    else
      openChiNotification();

    return () => window.removeEventListener('scroll', onScroll);

  }, []);

  var stepcnt = 1;
  if (props.setpsSet.length == 0) return (<div></div>);
  var listS;
  if (globalVar.language === "eng")
  // get a object storing all eng steps and display one by one
    listS = props.setpsSet.map((element) => (<Steps id={element.id} text={element.instruction_eng} image={element.image} code={element.code_snippet} alt={"no"} stepNum={stepcnt++} stepTitle={"Step "} />));
  else
  // get a object storing all chi steps and display one by one
    listS = props.setpsSet.map((element) => (<Steps id={element.id} text={element.instruction_chi} image={element.image} code={element.code_snippet} alt={"沒有"} stepNum={stepcnt++} stepTitle={"第"} stepTitle2={"步"} />));
  //const listS = (language === "eng") ?  : ;

  //console.log("in DisplayAllSteps", listS);

  return (
    <div>
      {contextHolder}
      <Affix offsetTop={81}>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${scroll}%` }}></div>
        </div>
        <div style={{ backgroundColor: 'white' }}>
          {globalVar.language === 'eng' ? <h6 style={{ padding: '5px 0px 0px 5px' }}>LAB {globalVar.labID} TASK {globalVar.taskID} - JUMP TO STEP :</h6> : <h6 style={{ padding: '5px 0px 0px 5px' }}>實驗{globalVar.labID} 任務{globalVar.taskID} - 導航至不同步驟:</h6>}
          <div className='stepNumList'>
            {props.setpsSet.map((element) =>
              <div className='steps' onClick={() => scrollToStep(element.id)}>
                {element.step_number}
              </div>
            )}
          </div>
        </div>
      </Affix>
      <div>
        {listS}
      </div>
    </div>
  );
}