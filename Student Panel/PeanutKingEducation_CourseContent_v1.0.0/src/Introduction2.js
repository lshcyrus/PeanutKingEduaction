import globalVar from "./globalVar";

export function Introduction2(props) {
    const title = (globalVar.language === "eng") ? "Introduction" : "內容概要"
    return (
      <div class="my-3 p-3 bg-body shadow-sm" id="introduction">
        <h3 class="border-bottom pb-2 mb-0">{title}</h3>
        <div class="d-flex text-muted pt-3 border-bottom">
          <p class="text-justify stepContentText" style={{ color: 'black', fontWeight: '500' }}><div dangerouslySetInnerHTML={{ __html: props.stepIntro }}></div></p>
        </div>
      </div>
    );
  }