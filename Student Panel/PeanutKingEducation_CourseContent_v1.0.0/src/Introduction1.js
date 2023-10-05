import globalVar from "./globalVar";
import { isMobile } from "react-device-detect";
import axios from "axios";
import Cookies from 'js-cookie';

function submit() {//submit single file only
  //console.log('000');
  var form_Data = new FormData();
  var selectedFile = document.querySelector('#fileUpload');
  // //console.log("selected file is")
  // //console.log(selectedFile.files[0]);
  //console.log(form_Data);
  //console.log(globalVar.courseData.id);
  form_Data.append("course", globalVar.courseData.id);//insert necessary information before posting
  //console.log(form_Data);
  form_Data.append("lab", globalVar.courseData.labs[globalVar.labID - 1].id);//
  form_Data.append("task", globalVar.courseData.labs[globalVar.labID - 1].tasks[globalVar.taskID - 1].id);
  form_Data.append("file_submitted", selectedFile.files[0]);
  //console.log("currently");
  //console.log(globalVar.courseData[0].id, ' ', globalVar.courseData[0].labs[globalVar.labID - 1].id, ' ', globalVar.courseData[0].labs[globalVar.labID - 1].tasks[globalVar.taskID - 1].id)
  //console.log(form_Data);"
  axios.patch(globalVar.serverlocation + "/api/student/submissions/", form_Data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': Cookies.get('access_token')
    },
    onUploadProgress: progressEvent => {
      let percentComplete = progressEvent.loaded / progressEvent.total
      percentComplete = parseInt(percentComplete * 100);
      document.getElementById('submitStatus').innerHTML = "Upload progress: " + percentComplete.toString() + "%";
      //console.log(percentComplete);
      // updateProgress(percentComplete);
    }
  })
    .then(response => {
      window.alert('Submitted!');
      //document.getElementById('submitStatus').innerHTML = "Submitted!";
      document.getElementById('fileUpload').value = "";
    })
    .catch(err => {
      // document.getElementById('fileUpload').value = "aaa";
      window.alert('Upload failed.');
      document.getElementById('fileUpload').value = "";
      //console.log(err);
    });
  //console.log("submitted");
}

//container with numerical list and optional hand-in bar 
export function Introduction1(props) {//submit files included
  let readfromjs = props.contents;
  var contents = (readfromjs != null) ? readfromjs.split("\r\n") : null;
  contents = (contents.length == 1 && readfromjs != null) ? readfromjs.split("\\r\\n") : null;
  var fileSelectText = (globalVar.language === "eng") ? "Submit your assignment" : "選擇你要繳交的功課"
  const listS = (contents != null) ? contents.map((contents) => <li class="stepContentText" style={{ color: 'black' }}>{contents}</li>) : "";  //in case there are multiple lines in Introduction
  const showLearningOutcome = (props.showLearningOutcome == null) ? false : props.showLearningOutcome;

  return (
    <div class={"my-3 p-3 bg-body shadow-sm" + ((showLearningOutcome) ? " " : " ps-0 pt-0")}>
      {
        (showLearningOutcome) ? <h3 class="border-bottom pb-2 mb-0">{props.title}</h3> : " "
      }
      {
        (!showLearningOutcome && isMobile) ? <h3 class="pb-2 mb-0 num-block col-4">{props.stepNum}</h3> : ""
      }
      <div class={"d-flex pt-3" + ((showLearningOutcome) ? " border-bottom" : " mb-3")}>
        {
          (showLearningOutcome || isMobile) ? "" : <h3 class="pb-2 mb-0 num-block col-4">{props.stepNum}</h3>
        }
        <div class={"mb-0" + ((showLearningOutcome) ? " " : " col-8")}>
          <p class="text-justify stepContentText" style={{ fontWeight: '500' }}><div dangerouslySetInnerHTML={{ __html: props.contents }}></div></p>
        </div>
      </div>
      {//study upload button
        (props.handInBar) ?
          <div class="border-top d-flex flex-column pt-3 ps-3">
            <h4>Please note the following things:</h4>
            <h5>1. You can only submit once. Repeated submission is not allowed.</h5>
            <h5>2. The file cannot be larger than 100MB.</h5>
            <label for="formFileMultiple" id="submitStatus" class="form-label">{fileSelectText}</label>
            <input className="form-control" type="file" id="fileUpload" defaultValue={""} multiple />
            <button className="btn btn-save" onClick={() => { submit() }}>Submit</button>
          </div>
          : ""
      }

    </div>
  );
}