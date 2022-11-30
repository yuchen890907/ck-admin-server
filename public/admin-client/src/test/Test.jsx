import Axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useStateContext } from "../contexts/ContextProvider";
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Test = () => {
	const { dataState, loginState } = useStateContext();
	const [osState, setOsState] = useState();
	const [dtState, setDtState] = useState();
	const [poState, setPoState] = useState();
	const [pdtState, setPdtState] = useState();

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Button
							onClick={() => {
								let eo = {
									saleInvoice: "",
									purchaseDateTime: "",
									forHere: "",
									count: "",
									total: 0,
									payment: "現金",
								};
								let dt = {
									saleInvoice: "",
									itemNo: 0,
									productNo: "",
									quantity: "",
									unitPrice: 0,
									remarks: "",
								};
								let os = [];
								let dts = [];
								let ns = 60;
								const saleInvoiceStr = "ES-215";
								const saleInvoiceInt = 1112;
								for (let i = 0; i < ns; i++) {
									let total = 0;
									eo.saleInvoice = saleInvoiceStr + (saleInvoiceInt + i).toString().padStart(5, "0");
									eo.forHere = getRandom(0, 1) ? "內用" : "外帶";
									eo.count = getRandom(1, 5);
									eo.saleDateTime = `${getRandom(2022, 2022)}-${getRandom(1, 6)
										.toString()
										.padStart(2, "0")}-${getRandom(1, 28).toString().padStart(2, "0")} ${getRandom(8, 21)
										.toString()
										.padStart(2, "0")}:${getRandom(0, 59).toString().padStart(2, "0")}:${getRandom(0, 59)
										.toString()
										.padStart(2, "0")}`;
									let rn = getRandom(2, 3);
									for (let j = 0; j < rn; j++) {
										dt.saleInvoice = eo.saleInvoice;
										let index = getRandom(0, dataState.products.data.length - 1);
										dt.productNo = dataState.products.data[index].productNo;
										dt.unitPrice = dataState.products.data[index].unitPrice;
										dt.quantity = getRandom(1, 5);
										total += dt.quantity * dt.unitPrice;
										dt.itemNo = j + 1;
										dts.push(JSON.parse(JSON.stringify(dt)));
									}
									eo.total = total;
									os.push(JSON.parse(JSON.stringify(eo)));
								}
								setOsState(os);
								setDtState(dts);
								console.log(os);
								console.log(dts);
							}}>
							!!!!!!
						</Button>
						<br />
						<br />
						<Button
							onClick={() => {
								console.log("-------");
								console.log(osState);
								Axios.post(
									process.env.REACT_APP_API_URL + "/saleorders/test",
									{ data: osState },
									{ headers: { Authorization: loginState.token } }
								);
							}}>
							!!!!!!
						</Button>
						<br />
						<br />
						<Button
							onClick={() => {
								console.log("-------");
								console.log(dtState);
								Axios.post(
									process.env.REACT_APP_API_URL + "/saledetails/test",
									{ data: dtState },
									{ headers: { Authorization: loginState.token } }
								);
							}}>
							!!!!!!
						</Button>
					</Col>
					<Col>
						<Button
							variant="warning"
							onClick={() => {
								let eo = {
									purchaseInvoice: "",
									purchaseDateTime: "",
									total: 0,
									eAccount: "",
									sPhone: "",
								};
								let dt = {
									purchaseInvoice: "",
									genericgoodNo: "",
									quantity: "",
									unit: 0,
									unitPrice: 0,
								};
								let os = [];
								let dts = [];
								let ns = 252;
								const purchaseInvoiceStr = "P";
								const purchaseInvoiceInt = 3;
								for (let i = 0; i < ns; i++) {
									let total = 0;
									eo.purchaseInvoice =
										purchaseInvoiceStr + (purchaseInvoiceInt + i).toString().padStart(5, "0");
									eo.purchaseDateTime = `${getRandom(2015, 2021)}-${getRandom(1, 6)
										.toString()
										.padStart(2, "0")}-${getRandom(1, 28).toString().padStart(2, "0")} ${getRandom(8, 21)
										.toString()
										.padStart(2, "0")}:${getRandom(0, 59).toString().padStart(2, "0")}:${getRandom(0, 59)
										.toString()
										.padStart(2, "0")}`;
									eo.eAccount =
										dataState.employees.data[getRandom(0, dataState.employees.data.length - 1)].account;
									eo.sPhone =
										dataState.suppliers.data[getRandom(0, dataState.suppliers.data.length - 1)].phone;
									let rn = getRandom(2, 5);
									for (let j = 0; j < rn; j++) {
										dt.purchaseInvoice = eo.purchaseInvoice;
										let index = getRandom(0, dataState.genericgoods.data.length - 1);
										dt.genericgoodNo = dataState.genericgoods.data[index].genericgoodNo;
										dt.unitPrice = getRandom(1, 12) * 50;
										dt.unit = dataState.genericgoods.data[index].unit;
										dt.quantity = getRandom(3, 15);
										total += dt.quantity * dt.unitPrice;
										dts.push(JSON.parse(JSON.stringify(dt)));
									}
									eo.total = total;
									os.push(JSON.parse(JSON.stringify(eo)));
								}
								setPoState(os);
								setPdtState(dts);
								console.log(os);
								console.log(dts);
							}}>
							!!!!!!
						</Button>
						<br />
						<br />
						<Button
							variant="warning"
							onClick={() => {
								console.log("-------");
								console.log(osState);
								Axios.post(
									process.env.REACT_APP_API_URL + "/saleorders/test",
									{ data: osState },
									{ headers: { Authorization: loginState.token } }
								);
							}}>
							!!!!!!
						</Button>
						<br />
						<br />
						<Button
							variant="warning"
							onClick={() => {
								console.log("-------");
								console.log(dtState);
								Axios.post(
									process.env.REACT_APP_API_URL + "/saledetails/test",
									{ data: dtState },
									{ headers: { Authorization: loginState.token } }
								);
							}}>
							!!!!!!
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Test;
