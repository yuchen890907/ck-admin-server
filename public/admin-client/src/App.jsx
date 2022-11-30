import {
	LoginPage,
	EarningRecordPage,
	MealItemsPage,
	MealTypesPage,
	StockStatusPage,
	PurchaseOrderPage,
	EmployeesPage,
	GenericGoodsPage,
	BomsPage,
	SuppliersPage,
	PunchRecordsPage,
	SchedulesPage,
	GuidesPage,
	SOPRecordsPage,
	SOPFormPage,
	SeatsPage,
	PositionsPage,
	CustomizationPage,
	SaleOrdersPage,
	OrdersPage,
} from "./pages";
import { MyNavbar } from "./components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "./contexts/ContextProvider";
import { useIdleTimer } from "react-idle-timer";
import fetchService from "./service/fetch.service";
import Test from "./test/Test";
import { Button, Offcanvas } from "react-bootstrap";
import authService from "./service/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "./styles/adminStyle.css";

function App() {
	const timeout = 1000 * 5 * 60 * 1000; // milliseconds
	const promptTimeout = 45 * 1000; // milliseconds
	const navigate = useNavigate();
	const { loginState, APIState, setLoginState } = useStateContext();
	const [showPrompt, setShowPrompt] = useState(false);
	const onIdle = () => {
		if (loginState.isLogin) {
			authService.logout(setLoginState);
			navigate("/login");
		}
	};
	const onPrompt = (event) => {
		setShowPrompt(true);
	};
	const onAction = (event) => {
		start();
		setShowPrompt(false);
	};
	const { start } = useIdleTimer({
		onIdle,
		onAction,
		onPrompt,
		timeout,
		promptTimeout,
	});

	useEffect(() => {
		if (loginState.isLogin) {
			APIState.fetchAllTable();
		}

		// eslint-disable-next-line
		//
	}, [loginState]);

	return (
		<>
			<MyNavbar />
			<div className="my-5">
				<Routes>
					{/* <Route path="/" element={<HomePage />} /> */}
					<Route path="/" element={<EarningRecordPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/sales" element={<SaleOrdersPage />} />
					<Route path="/mealTypes" element={<MealTypesPage />} />
					<Route path="/mealItems" element={<MealItemsPage />} />
					<Route path="/customization" element={<CustomizationPage />} />
					<Route path="/StockStatus" element={<StockStatusPage />} />
					<Route path="/PurchaseOrder" element={<PurchaseOrderPage />} />
					<Route path="/GenericGoods" element={<GenericGoodsPage />} />
					<Route path="/Boms" element={<BomsPage />} />
					<Route path="/Employees" element={<EmployeesPage />} />
					<Route path="/Suppliers" element={<SuppliersPage />} />
					<Route path="/Positions" element={<PositionsPage />} />
					<Route path="/PunchRecords" element={<PunchRecordsPage />} />
					<Route path="/Schedules" element={<SchedulesPage />} />
					<Route path="/Guides" element={<GuidesPage />} />
					<Route path="/SOPRecord" element={<SOPRecordsPage />} />
					<Route path="/SOPForm" element={<SOPFormPage />} />
					<Route path="/Seats" element={<SeatsPage />} />
					<Route path="/test" element={<Test />} />
				</Routes>
			</div>
			{/* 閒置自動登出設定 */}
			<Offcanvas className="text-center" show={showPrompt && loginState.isLogin} backdrop="static" placement="top">
				<Offcanvas.Header className="d-flex justify-content-center">
					<Offcanvas.Title>帳戶安全系統</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>您已一段時間沒有任何動作，若沒有任何操作系統將為您登出。</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default App;
