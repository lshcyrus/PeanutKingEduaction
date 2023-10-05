import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'
import './TopBar.css'
import globalVar from "./globalVar";
import logo from "./whitePKIcon.png"
import { EditUserInfo } from "./editUserInfo";
import { Globe } from 'react-bootstrap-icons';

const titles = [
    {"id": 0, "text_eng": "Peanut KING Education", "text_chi": "Peanut KING Education"},
    {"id": 1, "text_eng": "ADMIN CONSOLE", "text_chi": "管理員界面"},
    {"id": 2, "text_eng": "中文", "text_chi": "ENG"},
    {"id": 3, "text_eng": "LOG OUT", "text_chi": "登出"},
    {"id": 4, "text_eng": "Hello", "text_chi": "你好"},
];

export class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchAdminPanel: props.switchAdminPanel,
            editUserShow: false,
            langBtnText: titles.map(title => globalVar.language === "eng" ? title.text_eng : title.text_chi),
            refresh: props.refresh,
            tempCourseID: globalVar.courseID
        };
    }


    handleClickUser() {
        this.setState({ editUserShow: true });
    }

    handleLogout() {
        var data = new FormData();
        data.append("client_id", "UQNAJUVzANBZd9QQ9CvrZ1Rq582S2frV2vqoxU07");
        axios.post(globalVar.serverlocation + "/auth/invalidate-sessions", data, {
            headers: {
                'Authorization': Cookies.get('access_token'),
                "client_id": "UQNAJUVzANBZd9QQ9CvrZ1Rq582S2frV2vqoxU07",
            },
        })
            .then((response) => {
                Cookies.remove("access_token");
                window.location = "./";
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSwitchLang() {
        switch (globalVar.language) {
            case "eng":
                globalVar.language = "ch";
                Cookies.set("language", "ch");
                break;
            case "ch":
                globalVar.language = "eng";
                Cookies.set("language", "eng");
                break;
        }
        this.setState({ langBtnText: titles.map(title => globalVar.language === "eng" ? title.text_eng : title.text_chi) });
        this.state.refresh();
    }

    render() {
        return (
            <Navbar id="topbar" className="text-pkWhite bg-pkDarkBlue2" expand="md" fixed="top">
                {this.state.editUserShow && <EditUserInfo handleClose={() => this.setState({ editUserShow: false })} />}
                <Container fluid>
                    <Navbar.Brand href="../dashboard/index.html" id="logo" className="ms-3"><img src={logo} alt="company logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto mb-2 mb-md-0">
                            <Nav.Link href="../dashboard/index.html" style={{ fontSize: '16px' }}>{this.state.langBtnText[0]}</Nav.Link>
                            {globalVar.isTutor ? <Nav.Link href="../adminpanel/index.html" style={{ fontSize: '16px' }}>{this.state.langBtnText[1]}</Nav.Link> : <></>}
                            {/* <NavDropdown title="ADMIN CONSOLE 管理員界面" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#" onClick={() => this.state.switchAdminPanel(false)}>EDIT COURSES 編輯課程</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => this.state.switchAdminPanel(true)}>ADMIN SETTING 管理員設定</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav className="me-3">
                            <Nav.Link href="#" onClick={() => this.handleSwitchLang()}>
                                <Globe className="bi" />{` ${this.state.langBtnText[2]}`}
                            </Nav.Link>
                            <Nav.Link href="#" onClick={() => this.handleClickUser()}>{`  ${this.state.langBtnText[4]}, ${globalVar.userName}!  `}</Nav.Link>
                            <Button variant="outline-success" onClick={() => this.handleLogout()}>{this.state.langBtnText[3]}</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}