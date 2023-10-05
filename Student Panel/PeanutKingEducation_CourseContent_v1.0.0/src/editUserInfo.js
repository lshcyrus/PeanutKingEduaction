import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Cookies from 'js-cookie';
import axios from 'axios';

import globalVar from "./globalVar";

export function EditUserInfo(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [schoolList, setSchoolList] = useState({});
    const [formData, setFormData] = useState({
        engFirstName: "",
        engLastName: "",
        chiName: "",
        birthMonth: "",
        birthYear: "",
        gender: "",
        isSchool: true,
        school: "",
        profilePic: null,
        phoneNum: "",
    });
    const [isFormValid, setIsFormValid] = useState({
        profilePic: "",
        phoneNum: "",
    });

    const [show, setShow] = useState(true);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        let endpoints = ["/api/get_userinfo/", "/api/organizations/"];

        axios.all(endpoints.map((endpoint) =>
            axios.get(`${globalVar.serverlocation}${endpoint}`, {
                headers: {
                    'Authorization': Cookies.get('access_token')
                }
            })
        ))
            .then(result => {
                setIsLoaded(true);
                setFormData({
                    engFirstName: result[0].data.name_eng.split(" ")[1],
                    engLastName: result[0].data.name_eng.split(" ")[0],
                    chiName: result[0].data.name_chi,
                    birthMonth: parseInt(result[0].data.birth.slice(5, 7)),
                    birthYear: parseInt(result[0].data.birth.slice(0, 4)),
                    gender: result[0].data.sex,
                    isSchool: result[0].data.user_type === "school",
                    school: result[0].data.organization ? result[0].data.organization : 0,
                    profilePic: null,
                    phoneNum: result[0].data.phone.slice(4, 12),
                })
                setSchoolList(result[1].data);

            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    }

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        if (!event.currentTarget.checkValidity() || (formData["profilePic"] && formData["profilePic"].size > 1000 * 1000) || !formData["phoneNum"].length) {
            // No statement inside if
        } else {
            var data = new FormData();
            data.append("name_eng", `${formData.engLastName} ${formData.engFirstName}`);
            data.append("name_chi", formData.chiName);
            data.append("birth", `${formData.birthYear}-${formData.birthMonth < 10 ? '0' + formData.birthMonth : formData.birthMonth}-01`);
            data.append("sex", `${formData.gender ? formData.gender : "o"}`);
            data.append("user_type", `${formData.isSchool ? "school" : "individual"}`);
            data.append("organization", formData.school);
            data.append("phone", formData.phoneNum);

            if (formData.profilePic) data.append("profile_pic", formData.profilePic);
            axios.patch(globalVar.serverlocation + "/api/update_userinfo/", data, {
                headers: {
                    'Authorization': Cookies.get('access_token')
                }
            })
                .then(res => {
                    axios.get(globalVar.serverlocation + "/api/get_userinfo/", {
                        headers: {
                            'Authorization': Cookies.get('access_token')
                        }
                    })
                        .then(result => {
                            globalVar.username = res.data.name_eng.length ? res.data.name_eng : res.data.username;
                            setIsLoaded(true);
                            setShow(false);
                            handleClose();
                        })
                        .catch(error => {
                            setIsLoaded(true);
                            setError(error);
                        })
                })
                .catch(err => {
                    setIsFormValid({
                        phoneNum: err.response.data.hasOwnProperty('phone') ? err.response.data.phone[0] : "",
                        profilePic: err.response.data.hasOwnProperty('profile_pic') ? err.response.data.profile_pic[0] : ""
                    })
                })
        }
        setValidated(true);
    };


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div>
                <Modal backdrop="static" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Your Profile 更改個人資料</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>First name (English)</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="engFirstName"
                                        placeholder="Siu Ming"
                                        value={formData.engFirstName}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide your first name.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Surname (English)</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="engLastName"
                                        placeholder="Chan"
                                        value={formData.engLastName}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide your surname.</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                    <Form.Label>中文姓名（選填）</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="陳小明"
                                        value={formData.chiName}
                                        name="chiName"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="validationCustomUsername">
                                    <Form.Label>Date of Birth 出生日期</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={formData.birthMonth}
                                            name="birthMonth"
                                            onChange={handleChange}
                                            required>
                                            <option disabled value="">Month</option>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(i =>
                                                <option value={i} key={`month_${i}`}>{i < 10 ? ("0" + i) : i}</option>
                                            )}
                                        </Form.Select>
                                        <InputGroup.Text>/</InputGroup.Text>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={formData.birthYear}
                                            name="birthYear"
                                            onChange={handleChange}
                                            required>
                                            <option disabled value="">Year</option>
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i - 1).map(i =>
                                                <option value={i} key={`year_${i}`}>{i}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">Please provide your date of birth.</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom03">
                                    <Form.Label>Gender 性別</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={formData.gender}
                                        name="gender"
                                        onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        {["Male", "Female"].map(gender =>
                                            <option value={gender[0].toLowerCase()} key={gender}>{gender}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                    <Form.Label>School 學校 / Organisation 組織</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        id="1"
                                        name="group1"
                                        label="I am an individual user. 我是個人用戶"
                                        onChange={e => setFormData({ ...formData, isSchool: false })}
                                        defaultChecked={!formData.isSchool}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="2"
                                        name="group1"
                                        label="I am a school user. 我是學校用戶"
                                        onChange={e => setFormData({ ...formData, isSchool: true })}
                                        defaultChecked={formData.isSchool}
                                    />
                                    {formData.isSchool ?
                                        (<Form.Select
                                            aria-label="Default select example"
                                            value={formData.school}
                                            onChange={handleChange}
                                            disabled={!formData.isSchool}
                                            name="school"
                                            required>
                                            <option disabled value="">Choose...</option>
                                            {schoolList.map(school =>
                                                <option value={school.id} key={`school_${school.id}`}>{school.name_eng + " " + (school.name_chi ? school.name_chi : "")}</option>
                                            )}
                                        </Form.Select>) : (<div></div>)}
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid user type.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom05">
                                    <Form.Label>Profile Picture 個人檔案照片</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="profilePic"
                                        onChange={e => setFormData({ ...formData, profilePic: e.target.files[0] })}
                                        accept="image/*"
                                        isInvalid={(formData["profilePic"] && formData["profilePic"].size > 1000000) || (isFormValid.profilePic.length && validated)}
                                        style={!((formData["profilePic"] && formData["profilePic"].size > 1000000) || (isFormValid.profilePic.length && validated)) ? {} : {
                                            borderColor: "#dc3545",
                                            paddingRight: "calc(1.5em + .75rem)",
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right calc(.375em + .1875rem) center",
                                            backgroundSize: "calc(.75em + .375rem) calc(.75em + .375rem)",
                                        }}
                                    />
                                    <Form.Label>File Size 檔案大小 &le; 1MB</Form.Label>
                                    <Form.Control.Feedback type="invalid">{(formData["profilePic"] && formData["profilePic"].size > 1000000) ? "Size of profile picture exceeds limit (1MB)." : isFormValid.profilePic}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom06">
                                    <Form.Label>Contact Number 聯絡電話</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="12345678"
                                        name="phoneNum"
                                        value={formData.phoneNum}
                                        onChange={handleChange}
                                        isInvalid={isFormValid.phoneNum.length && validated}
                                        style={!(isFormValid.phoneNum.length && validated) ? {} : {
                                            borderColor: "#dc3545",
                                            paddingRight: "calc(1.5em + .75rem)",
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right calc(.375em + .1875rem) center",
                                            backgroundSize: "calc(.75em + .375rem) calc(.75em + .375rem)",
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">{isFormValid.phoneNum.length ? isFormValid.phoneNum : "Please provide your contact number."}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <button type="submit" class="btn btn-btn btn-outline-moses float-end" style={{ marginBottom: ".5rem" }}>SUBMIT 遞交</button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}