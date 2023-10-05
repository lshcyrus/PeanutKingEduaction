import React from 'react';
import { useCourseContext } from './CourseContext';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import globalVar from './globalVar';

const SideNavTask = (props) => {

    const { taskData, setTaskPage } = useCourseContext();

    function openTask(task) {
        globalVar.taskID = task.task_number;
    }

    return (
        <div style={props.state === 'entering' ? { animation: 'moveTaskPage .3s forwards' } : props.state === 'entered' ? { transform: 'translateX(0%)' } : { animation: 'moveBackTaskPage .3s forwards' }}>
            <div className='sub-header' onClick={() => setTaskPage(false)}>
                <i><LeftOutlined /></i>
                {globalVar.language === 'eng' ? <h6 style={{ paddingTop: '5px' }}>Labs</h6> : <h6 style={{ paddingTop: '5px' }}>實驗</h6>}
            </div>

            {taskData && taskData.map((task) => {
                return (
                    <div className='sidenavContent' onClick={() => { openTask(task); props.jumpToTask() }}>
                        <div>
                            {globalVar.language === 'eng' ? <h6>Lab {globalVar.labID} Task {task.task_number}</h6> : <h6>實驗 {globalVar.labID} 任務 {task.task_number}</h6>}
                            {globalVar.language === 'eng' ? <p>{task.title_eng}</p> : <p>{task.title_chi}</p>}
                            {/* <h6>Lab {globalVar.labID} Task {task.task_number}</h6>
                            <p>{task.title_eng}</p> */}
                        </div>
                        <i><RightOutlined /></i>
                    </div>
                )
            })}
        </div>
    );
}

export default SideNavTask;
