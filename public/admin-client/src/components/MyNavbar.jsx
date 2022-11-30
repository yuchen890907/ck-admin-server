import React from "react";
import logo from "../img/logo/logo.svg";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import authService from "../service/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

export default function MyNavbar() {
	const navigate = useNavigate();
	const { loginState, setLoginState } = useStateContext();
	return (
		<div className="my-navbar">
			<Navbar bg="transparent" expand="md">
				<Container fluid>
					<Navbar.Brand href="/">
						<img src={logo} alt="Logo" height="45" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
							<Nav.Link as={Link} className="nav-link" to="/" href="/">
								營收紀錄
							</Nav.Link>
							<Nav.Link as={Link} className="nav-link" to="/sales" href="/sales">
								訂單紀錄
							</Nav.Link>
							<NavDropdown title="庫存管理" autoClose>
								<Nav.Link as={Link} className="dropdown-item" to="/StockStatus" href="/StockStatus">
									查看庫存現況
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/PurchaseOrder" href="/PurchaseOrder">
									查詢進貨明細
								</Nav.Link>
								<NavDropdown.Divider />
								<Nav.Link as={Link} className="dropdown-item" to="/Suppliers" href="/Suppliers">
									供應商資料管理
								</Nav.Link>
							</NavDropdown>
							<NavDropdown title="商品管理">
								<Nav.Link as={Link} className="dropdown-item" to="/mealTypes" href="/mealTypes">
									商品類別管理
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/mealItems" href="/mealItems">
									商品品項管理
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/customization" href="/customization">
									商品客製化設定
								</Nav.Link>
							</NavDropdown>
							<NavDropdown title="原物料管理">
								<Nav.Link as={Link} className="dropdown-item" to="/GenericGoods" href="/GenericGoods">
									原物料品項管理
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/Boms" href="/Boms">
									設定商品物料清單
								</Nav.Link>
							</NavDropdown>
							<NavDropdown title="人事管理">
								<Nav.Link as={Link} className="dropdown-item" to="/Positions" href="/Positions">
									職權管理
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/Employees" href="/Employees">
									員工資料管理
								</Nav.Link>
								<NavDropdown.Divider />
								<Nav.Link as={Link} className="dropdown-item" to="/PunchRecords" href="/PunchRecords">
									查詢打卡記錄
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/Schedules" href="/Schedules">
									查詢班表資訊
								</Nav.Link>
							</NavDropdown>
							<NavDropdown title="店面功能管理">
								<Nav.Link as={Link} className="dropdown-item" to="/Guides" href="/Guides">
									設定新進員工指南
								</Nav.Link>
								<Nav.Link as={Link} className="dropdown-item" to="/SOPForm" href="/SOPForm">
									設定開閉店表單內容
								</Nav.Link>
								<NavDropdown.Divider />
								<Nav.Link as={Link} className="dropdown-item" to="/SOPRecord" href="/SOPRecord">
									查詢開閉店記錄
								</Nav.Link>
							</NavDropdown>
						</Nav>

						{loginState.isLogin ? (
							<Button
								variant="outline-dark"
								onClick={() => {
									authService.logout(setLoginState);
									navigate("/login");
								}}>
								登出
							</Button>
						) : (
							<Nav.Link as={Link} className="nav-link" to="/login" href="/login">
								<Button variant="outline-dark">登入</Button>
							</Nav.Link>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
