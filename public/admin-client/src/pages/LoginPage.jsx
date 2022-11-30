import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/logo/logo_horizon.svg";
import { Container, Row, Form, Col, Button, Alert } from "react-bootstrap";
import { LoginFooter } from "../components";
import authService from "../service/auth.service";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
	const { loginState, setLoginState } = useStateContext();
	const location = useLocation();
	const navigate = useNavigate();
	const [account, setAccount] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const res = await authService.login(account, password);
			if (res && res.data.success) {
				localStorage.setItem("login", JSON.stringify(res.data));
				setLoginState({
					isLogin: true,
					user: res.data.user,
					token: res.data.token,
				});
				return navigate(location.state || "/", { replace: true });
			}
			if (res.data.message) setMessage(res.data.message);
		} catch (err) {
			console.log(err);
			setMessage(err.response.data.message);
		}
	};

	//防止白癡登入後又想進login頁面(強迫回首頁)
	useEffect(() => {
		if (loginState.isLogin === true) navigate("/");

		// eslint-disable-next-line
	}, []);

	return (
		<div className="login-page">
			<div className="content px-2 py-5">
				<Container className="login-container pt-5">
					<Row>
						{/* 登入left */}
						<Col lg="6" md="12" className="justify-content-center mb-3  text-center d-flex logo-container">
							<img
								src={logo}
								alt="Logo"
								className="img-logo w-100"
								//   style="object-fit:contain; transition: 0.3s ease;"
							/>
						</Col>

						{/* 登入right */}
						<Col lg="6" md="12" className="mb-3 ">
							<Row className="justify-content-center">
								<Col md="8">
									<Alert variant="danger" show={message.length > 0}>
										{message}
									</Alert>
								</Col>
							</Row>
							<Row className="justify-content-center">
								<Col md="8">
									<Form className="login-form ">
										<Form.Group className="mt-3" controlId="input">
											<p className="mb-2">
												<i className="bi bi-person-circle"></i>
												使用者帳號
											</p>
											<Form.Control
												placeholder="Enter your Account"
												value={account}
												onInput={(e) => setAccount(e.target.value)}
											/>
										</Form.Group>

										<Form.Group className="mt-3">
											<p className="mb-2">
												<i className="bi bi-key-fill"></i>
												使用者密碼
											</p>
											<Form.Control
												type="password"
												placeholder="Enter your Password"
												autoComplete="on"
												value={password}
												onInput={(e) => setPassword(e.target.value)}
											/>
										</Form.Group>
										<Link to="" className="forgot-pass my-2 d-flex m-lg-2 justify-content-end">
											忘記密碼?
										</Link>
										<Row>
											<Button variant="primary" size="lg" type="submit" onClick={submitHandler}>
												Sign in
											</Button>
										</Row>
									</Form>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
				<LoginFooter></LoginFooter>
			</div>
		</div>
	);
}
