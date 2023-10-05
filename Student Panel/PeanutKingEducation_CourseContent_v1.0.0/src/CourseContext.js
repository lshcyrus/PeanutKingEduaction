/* This React component is for creating context for the student panel sidebar. 
   The context is used to store the data of the task and lab, and to open and close the task page of the sidebar.
*/

import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import globalVar from './globalVar';

const CourseContext = createContext();

export const useCourseContext = () => {
    return useContext(CourseContext);
}

const CourseContextProvider = (props) => {

    // Opening and Closing task page of sidebar (second page of sidebar)
    const [taskPage, setTaskPage] = useState(false);

    // Storing the task data
    const [taskData, setTaskData] = useState(null);

    // Storing the lab data
    const [labData, setLabData] = useState(null);

    // Getting the data
    const name = Cookies.get('courseName');

    useEffect(() => {

        axios.get('https://peanutkingeducation.com/api/courses/' + name , {
            headers: {
                'Authorization': Cookies.get('access_token'),
            }
        })
            .then(res => {
                setLabData(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    // Setting the value which will be used for sidebar
    const value = {
        taskPage,
        setTaskPage,
        taskData,
        setTaskData,
        labData,
        setLabData
    }

    return (
        <CourseContext.Provider value={value}>
            {props.children}
        </CourseContext.Provider>
    );
}

export default CourseContextProvider;
