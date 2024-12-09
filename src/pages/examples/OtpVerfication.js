
// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { Routes } from "../../routes";


// export default () => {
//     const [formData, setFormData] = useState({

//         email: '',
//         password: ''
//     });
//     const history = useHistory();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//     useEffect(() => {
//         setFormData({ ...formData, email: localStorage.getItem('emailData') })
//     }, [])
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             console.log(process.env.REACT_APP_SERVER_DOMAIN);
//             const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/optverfication`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const data = await response.json();
//             if (data.status) {
//                 console.log("data", data);
//                 // localStorage.setItem("emailData", data.data.email);
//                 history.push(Routes.ResetPassword.path);
//                 // toast.success(data.message);
//                 // navigate('/resetpassword');
//             } else {
//                 console.error(data.message);
//                 // toast.error('Email verification failed'); // Display error toast
//             }
//         } catch (error) {
//             console.error('Error:', error);

//         }
//     }
//     return (
//         <main>
//             <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <p className="text-center">
//                             <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
//                                 <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
//                             </Card.Link>
//                         </p>
//                         <Col xs={12} className="d-flex align-items-center justify-content-center">
//                             <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
//                                 <h3>otp verfication</h3>
//                                 <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
//                                 <Form onSubmit={handleSubmit}>
//                                     <div className="mb-4">
//                                         <Form.Label htmlFor="otp">Your Email</Form.Label>
//                                         <InputGroup id="otp">
//                                             <Form.Control required autoFocus type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="0000" />
//                                         </InputGroup>
//                                     </div>
//                                     <Button variant="primary" type="submit" className="w-100">
//                                         Recover password
//                                     </Button>
//                                 </Form>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//         </main>
//     );
// };

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Routes } from "../../routes";

const OtpVerification = () => {
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(() => {
        setFormData({ ...formData, email: localStorage.getItem('emailData') })
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/optverfication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data.data);
            if (data.status) {
                console.log("User verified:", data.message);

                history.push(Routes.ResetPassword.path);
            } else {
                console.error("OTP verification failed:", data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main>
            <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3>OTP Verification</h3>
                                <p className="mb-4">Please enter the OTP sent to your email.</p>
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <Form.Label htmlFor="otp">Your OTP</Form.Label>
                                        <InputGroup id="otp">
                                            <Form.Control required autoFocus type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" />
                                        </InputGroup>
                                    </div>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Verify OTP
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};

export default OtpVerification;

