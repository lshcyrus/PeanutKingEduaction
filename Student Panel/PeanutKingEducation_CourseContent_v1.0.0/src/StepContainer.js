/*
  This React component is not used anymore. The React component storing the steps info is now in src/Steps.js.
*/

import { isBrowser, isMobile } from 'react-device-detect';
import globalVar from './globalVar';
import CodeViewer from './CodeViewer';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import ReactQuill from 'react-quill';

export function StepContainer(props) {
  //console.log("hios", props.image);
  const num = props.stepNum//props.stepTitle + 
  console.log(props.text);
  console.log(props.code);
  var textArr = props.text.split("\r\n\r");
  var textbox;
  // if (textArr.length > 1) textbox = textArr.map((text) => <p className='text-justify stepContentText'>{text}</p>);
  if (textArr.length > 1) textbox = textArr.map((text) => <div className='text-justify stepContentText' value={text} readOnly={true} theme={null} />);

  const [openModal, setOpenModal] = useState(false);

  const ViewCode = (props) => {

    if (globalVar.language === "eng") {
      return (
        <Button style={{ maxWidth: '50%', borderRadius: 0, borderColor: 'black', background: 'ghostwhite', color: 'black' }} onClick={() => setOpenModal(true)}>VIEW CODE</Button>
      )
    }
    else {
      return (
        <Button style={{ maxWidth: '50%', borderRadius: 0, borderColor: 'black', background: 'ghostwhite', color: 'black' }} onClick={() => setOpenModal(true)}>查看代碼</Button>
      )
    }
  }

  if (props.image != null) { //this step contains image
    return (
      <div className="my-3 p-3 bg-body shadow-sm pl-12">
        {
          (isMobile) ? <div className="row"><h3 className="pb-2 num-block">{num}</h3></div> : ""
        }
        <div className="row d-flex row-cols-sm-2 justify-content-around row-cols-1">
          <div className="col p-0 d-flex justify-content-center ps-0">
            {
              (isMobile) ? "" : <h3 className="pb-2 mb-0 num-block">{num}</h3>
            }
            <figure className="figure d-flex align-items-center flex-column pl-8">
              <img src={props.image} className="figure-img img-fluid " alt={props.text} />
            </figure>
          </div>
          <div className={"col d-flex" + (textArr.length > 1) ? " row" : ""}>
            {(textArr.length > 1) ?
              textbox : <p className="text-justify stepContentText">{props.text}</p>
            }
            <div className="col-12 d-flex justify-content-center">
              {(props.code != '') ? <ViewCode /> : ""}
              <Modal
                centered
                open={openModal}
                width={1200}
                closable={false}
                footer={
                  <Button style={{ borderRadius: 0, border: '1px solid black', fontWeight: '550' }} onClick={() => setOpenModal(false)}>Close</Button>
                }
              >
                <CodeViewer id={props.id} code={props.code} />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {  //this step does not contain image
    return (
      <div className="my-3 p-3 bg-body shadow-sm pl-12">
        <div className="row">
          <h3 className="pb-2 mb-0 col-1 num-block">{num} </h3>
          <p className="text-justify stepContentText col-11 ps-0 pl-8">{props.text}</p>
          <div>
            {(props.code != '') ? <ViewCode /> : ""}
            <Modal
              centered
              open={openModal}
              width={1200}
              closable={false}
              footer={
                <Button style={{ borderRadius: 0, border: '1px solid black' }} onClick={() => setOpenModal(false)}>Close</Button>
              }
            >
              <CodeViewer id={ props.id } code={ props.code } />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}