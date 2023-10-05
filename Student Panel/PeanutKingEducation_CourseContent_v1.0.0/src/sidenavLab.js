import React from 'react';
import { useCourseContext } from './CourseContext';
import { RightOutlined } from '@ant-design/icons';
import globalVar from './globalVar';

const SideNavLab = (props) => {

    const { labData, setTaskData, setTaskPage } = useCourseContext();

    function openRow(lab) {
        globalVar.labID = lab.lab_number;
        globalVar.taskID = 0;
        setTaskPage(true);
        setTaskData(lab.tasks);
    }

    return (
        <div style={props.state === 'exiting' ? { animation: 'moveLabPage .3s forwards' } : props.state === 'entering' ? { animation: 'moveLabPage .3s reverse forwards' } : null}>
            {labData && labData.labs.map((lab) => {
                return (
                    <div className='sidenavContent' onClick={() => { openRow(lab); props.jumpToTask() }}>
                        <div>
                            {globalVar.language === 'eng' ? <h6>Lab {lab.lab_number}</h6> : <h6>實驗 {lab.lab_number}</h6>}
                            {globalVar.language === 'eng' ? <p>{lab.lab_title_eng}</p> : <p>{lab.lab_title_chi}</p>}
                            {/* <h6>Lab {lab.lab_number}</h6>
                            <p>{lab.lab_title_eng}</p> */}
                        </div>
                        <i><RightOutlined /></i>
                    </div>
                )
            })}
        </div>
    )
};
export default SideNavLab;