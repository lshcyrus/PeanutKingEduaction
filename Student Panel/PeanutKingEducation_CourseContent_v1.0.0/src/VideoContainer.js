import globalVar from "./globalVar";

export function VideoContainer(props) {
    const title = (globalVar.language === "eng") ? "Lecture video" : "教學影片"
    // console.log(props.video);
    if (props.video != '')
    {
      return (
        <div class="my-3 p-3 bg-body shadow-sm" id="video">
          <h3 class="border-bottom pb-2 mb-0">{title}</h3>
          <div class="d-flex text-muted pt-3 align-items-end">
            <div class="col d-flex justify-content-center">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe width={1000} height={500} src={props.video} id="video-container"></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else return (<div></div>);
  }