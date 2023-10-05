import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col, Image, Modal } from 'antd';
import styled from 'styled-components';
import CodeViewer from './CodeViewer';
import globalVar from './globalVar';

// Here used styled-components to style the form in css format, including all responsive design.
const StyledForm = styled(Form)`

    background-color: #fff;
    padding: 20px;
    margin: 20px;

    h5 {
        display: flex;
        padding: 10px;
        background-color: #6C757D;
        color: white;
        width: fit-content;
        flex-wrap: nowrap;
    }

    .ant-form-item-control-input-content {
        font-size: 20px;
        font-weight: normal;
    }

    .ant-form-item-control-input-content p {
        font-size: 20px;
        font-weight: normal;
    }

    @media screen and (max-width: 1800px) {

        .ant-form-item-control-input-content {
            font-size: 20px;
            font-weight: normal;
            padding-left: 20px;
        }
    
        .ant-form-item-control-input-content p {
            font-size: 20px;
            font-weight: normal;
            padding-left: 20px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }

    }

    @media screen and (max-width: 1300px) {

        h5 {
            font-size: 15px !important;
        }

        .ant-form-item-control-input-content {
            font-size: 17px;
            font-weight: normal;
            padding-left: 20px;
        }

        .ant-form-item-control-input-content p {
            font-size: 17px;
            font-weight: normal;
            padding-left: 20px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }

    }


    @media screen and (max-width: 992px) {

        .ant-form-item-control-input-content {
            font-size: 14px;
            font-weight: normal;
            padding-left: 20px;
        }

        .ant-form-item-control-input-content p {
            font-size: 14px;
            font-weight: normal;
            padding-left: 20px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 20px;
        }


    }


    @media screen and (max-width: 768px) {

        padding: 10px;

        h5 {
            font-size: 12px !important;
        }

        .ant-form-item-control-input-content {
            font-size: 14px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content p {
            font-size: 14px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }
    }


    @media screen and (max-width: 576px) {

        h5 {
            font-size: 12px !important;
        }

        .ant-form-item-control-input-content {
            font-size: 12px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content p {
            font-size: 12px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }
    }

    @media screen and (max-width: 400px) {

        h5 {
            font-size: 10px !important;
        }

        .ant-form-item-control-input-content {
            font-size: 9px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content p {
            font-size: 9px;
            font-weight: normal;
            padding-left: 10px;
        }

        .ant-form-item-control-input-content #image {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }

        .ant-image-mask {
            max-width: 100%;
            height: auto;
            padding-left: 10px;
        }
    }

`;

const Steps = (props) => {

    const step_id = props.id;
    const step_text = props.text;
    const step_num = props.stepNum;
    const step_image = props.image;
    const step_code = props.code;

    // const [openModal, setOpenModal] = useState(false);

    // const ViewCode = () => {

    //     if (globalVar.language === "eng") {
    //         return (
    //             <Button style={{ borderRadius: 0, fontSize: '18px' }} onClick={() => setOpenModal(true)}>VIEW CODE</Button>
    //         )
    //     }
    //     else {
    //         return (
    //             <Button style={{ borderRadius: 0, fontSize: '18px' }} onClick={() => setOpenModal(true)}>查看代碼</Button>
    //         )
    //     }
    // }


    // dangerouslySetInnerHTML={{ __html }} is used to render html tags in the text, for example, bold text, text with different colors, etc.
    return (
        <div className='bg-body shadow-sm' style={{ marginBottom: '20px' }}>
            <StyledForm id={step_id}>
                <Row>
                    <Col span={2}>
                        {globalVar.language === "eng" ? <h5>Step {step_num}</h5> : <h5>第 {step_num} 步</h5>}
                    </Col>
                    {step_image != null ?
                        <Col span={11}>
                            <Form.Item name='image'>
                                <Image src={step_image} width={600} height='auto' />
                            </Form.Item>
                        </Col> : ""
                    }
                    {step_image != null ?
                        <Col span={11}>
                            <Form.Item>
                                <div dangerouslySetInnerHTML={{ __html: step_text }} />
                            </Form.Item>
                        </Col> :
                        <Col span={22}>
                            <Form.Item style={{ paddingLeft: '20px' }}>
                                <div dangerouslySetInnerHTML={{ __html: step_text }} />
                            </Form.Item>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col flex={24}>{(step_code != '') ? <CodeViewer id={props.id} code={props.code} /> : ""}</Col>
                </Row>
            </StyledForm>

            {/* <Modal
                centered
                open={openModal}
                width={1200}
                closable={false}
                footer={
                    <Button style={{ borderRadius: 0, border: '1px solid black', fontWeight: '550' }} onClick={() => setOpenModal(false)}>Close</Button>
                }
            >
                <CodeViewer id={props.id} code={props.code} />
            </Modal> */}

        </div>
    );
};


export default Steps;
