import globalVar from "./globalVar";
import { arabicToChinese } from "./arabicToChinese";

function setTaskID(num) {
  globalVar.taskID = num.taskNum;
}

export function Tasklist(props) {
    var listS
    if (globalVar.language === "eng") {
      listS = props.tasks.map(
        (contents) => <li class="nav-item">
          <a class="nav-link stepContentText" className="task-list" href="#" onClick={() => { setTaskID({ taskNum: contents.task_number }); props.onClick(); }}>
            <i class="bi-file-earmark-post"></i>{"Task " + contents.task_number + ' - ' + contents.title_eng}
          </a>
        </li>
      );
    } else {
      listS = props.tasks.map(
        (contents) => <li class="nav-item">
          <a class="nav-link stepContentText" className="task-list" href="#" style={{ color: 'black' }} onClick={() => { setTaskID({ taskNum: contents.task_number }); props.onClick(); }}>
            <i class="bi-file-earmark-post"></i>{"任務" + arabicToChinese(contents.task_number) + "：" + contents.title_chi}
          </a>
        </li>
      );
    }
    return (
      <div class="my-3 p-3 bg-body shadow-sm">
        <h3 class="border-bottom pb-2 mb-0">{props.title}</h3>
        <div class="d-flex text-muted pt-3 border-bottom">
          <ul class="task pb-3 mb-0 small lh-sm">
            {listS}
          </ul>
        </div>
      </div>
    );
  }