/* This page loads the topbar and course content container. */

import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import { ContentContainer } from "./ContentContainer";
import { TopBar } from "./TopBar";

import globalVar from "./globalVar";

import { HandleError } from "./HandleError";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotData: 0,
      gotList: 0,
      gotName: 0,
      forceRefreash: 0,
    };
  }

  refreshApp() {
    this.setState({ forceRefreash: !this.state.forceRefreash });
    //console.log("try to refresh");
  }

  //only run once
  componentDidMount() {
    var fetchName = Cookies.get('courseName');

    if (Cookies.get("language") != null) {
      // console.log("language", Cookies.get("language"));
      globalVar.language = Cookies.get("language");
    }

    var self = this;
    axios.get(globalVar.serverlocation + "/api/courses/" + fetchName, {
      headers: {
        'Authorization': Cookies.get('access_token'),
      }
    })
      .then(function (response) {
        //console.log(response.data);
        // console.log(response.data);
        globalVar.courseData = response.data;
        self.setState({ gotData: 1 });
        //console.log(self.state.gotData);
      }).catch(function (error) {
        HandleError(error);
      })

    axios.get(globalVar.serverlocation + "/api/student/redeemed_courses/", {
      headers: {
        'Authorization': Cookies.get('access_token'),
      }
    })
      .then(function (response) {
        //console.log(response.data);
        //console.log(response.data);
        globalVar.courseList = response.data;
        self.setState({ gotList: 1 });
        //console.log(self.state.gotData);
      }).catch(function (error) {
        HandleError(error);
      })

    axios.get(globalVar.serverlocation + "/api/get_userinfo/", {
      headers: {
        'Authorization': Cookies.get('access_token'),
      }
    })
      .then(function (response) {
        // console.log(response.data);
        globalVar.userName = response.data.username;
        globalVar.isTutor = response.data.groups.map(group => group["name"]).includes("Tutors");
        self.setState({ gotName: 1 });
        //console.log(self.state.gotData);
      }).catch(function (error) {
        self.handleError(error);
      })

  }

  render() {
    //console.log(111);
    //console.log(globalVar.courseData);
    if (this.state.gotData + this.state.gotList + this.state.gotName == 3) {
      return (
        <div className="body min-height100">
          <header>
            <TopBar refresh={() => this.refreshApp()} test={() => this.test()} />
          </header>
          <ContentContainer refresh={() => this.refreshApp()} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default App;
