import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, FormControl, InputGroup, Row, Tab, Table, Tabs } from "react-bootstrap";
import { Authorization, MyCard } from "../components";
import { CardImg1, CardImg2, CardImg3, CardImg4 } from "../img/svg";

import { Chart, Doughnut, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	CategoryScale,
	BarElement,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarController,
} from "chart.js";
import ChartConfig from "../data/chart.config";
import { useStateContext } from "../contexts/ContextProvider";
ChartJS.register(ArcElement, CategoryScale, BarElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarController);
const imgs = [CardImg1, CardImg2, CardImg3, CardImg4];
const fontTitleSize = 18;

export default function EarningRecordPage() {
	let now = new Date();
	now = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
	let end = now.toISOString().split("T")[0];
	now.setMonth(now.getMonth() - 1);
	let start = now.toISOString().split("T")[0];
	const { dataState, APIState } = useStateContext();
	const tableName = "earningrecord";
	const [earningState, setEarningState] = useState();
	const [saleState, setSaleState] = useState();
	const [earningMessage, setEarningMessage] = useState("");
	const [saleMessage, setSaleMessage] = useState("");
	const [earningDate, setEarningDate] = useState({ start, end });
	const [saleDate, setSaleDate] = useState({ start, end });
	const [saleQueryType, setSaleQueryType] = useState("class");
	const [saleQueryObject, setSaleQueryObject] = useState("");

	const earningQuery = (start, end) => {
		setEarningMessage("");
		if (start && end && start <= end) {
			APIState.fetchAll(`/${tableName}/date?start=${start}&end=${end}`)
				.then((res) => {
					if (res.data.success) setEarningState(res.data.data);
				})
				.catch((err) => console.error(err));
		} else {
			setEarningMessage("請輸入正確的時間");
		}
	};
	const saleQuery = (start, end) => {
		setSaleMessage("");
		if (start && end && start <= end) {
			APIState.fetchAll(`/${tableName}/sale?start=${start}&end=${end}&type=${saleQueryType}&id=${saleQueryObject}`)
				.then((res) => {
					if (res.data?.success) setSaleState(res.data.data);
					else setSaleMessage(res.message);
				})
				.catch((err) => setSaleMessage(err.response.data.message));
		} else {
			setSaleMessage("請輸入正確的時間");
		}
	};
	return (
		<Authorization>
			<Container>
				<Card className="p-5">
					<Card.Title>營收紀錄</Card.Title>
					{dataState && dataState[tableName] && (
						<Row>
							<Col lg="6" className="mt-4">
								<Tabs defaultActiveKey="月" id="uncontrolled-tab-example" className="mb-3">
									<Tab eventKey="月" title="月">
										<Line
											options={ChartConfig.earningLineOptions}
											data={dataState[tableName].monthRevenueData}
										/>
									</Tab>
									<Tab eventKey="季" title="季">
										<Line
											options={ChartConfig.earningLineOptions}
											data={dataState[tableName].seasonRevenueData}
										/>
									</Tab>
									<Tab eventKey="年" title="年">
										<Line
											options={ChartConfig.earningLineOptions}
											data={dataState[tableName].yearRevenueData}
										/>
									</Tab>
								</Tabs>
							</Col>
							<Col lg="6" className="mt-4">
								<Tabs defaultActiveKey="月" id="uncontrolled-tab-example" className="mb-3">
									<Tab eventKey="月" title="月">
										<Line
											options={ChartConfig.customerCountLineOptions}
											data={dataState[tableName].monthCustomCountData}
										/>
									</Tab>
									<Tab eventKey="季" title="季">
										<Line
											options={ChartConfig.customerCountLineOptions}
											data={dataState[tableName].seasonCustomCountData}
										/>
									</Tab>
									<Tab eventKey="年" title="年">
										<Line
											options={ChartConfig.customerCountLineOptions}
											data={dataState[tableName].yearCustomCountData}
										/>
									</Tab>
								</Tabs>
							</Col>
							<Col lg="6" className="mt-4">
								<Tabs defaultActiveKey="月" id="uncontrolled-tab-example" className="mb-3">
									<Tab eventKey="月" title="月">
										<Chart
											options={ChartConfig.forHereLineOptions}
											data={dataState[tableName].monthForHereData}
										/>
									</Tab>
									<Tab eventKey="季" title="季">
										<Chart
											options={ChartConfig.forHereLineOptions}
											data={dataState[tableName].seasonForHereData}
										/>
									</Tab>
									<Tab eventKey="年" title="年">
										<Chart
											options={ChartConfig.forHereLineOptions}
											data={dataState[tableName].yearForHereData}
										/>
									</Tab>
								</Tabs>
							</Col>
						</Row>
					)}
				</Card>

				<Card className="p-5 mt-4">
					<Card.Title>營收查詢</Card.Title>
					<Row>
						<Row className="mt-4">
							<Alert variant="danger" show={earningMessage.length > 0}>
								{earningMessage}
							</Alert>
						</Row>
						<DatePicker date={earningDate} setDate={setEarningDate} submitHandler={earningQuery} />
					</Row>
					{earningState && (
						<Row className="mt-4 justify-content-center">
							{earningState.cards.map((d, i) => (
								<MyCard key={`card-${i}`} title={d.title} value={d.value}>
									{imgs[i]()}
								</MyCard>
							))}

							{earningState.hotRank && (
								<Col md="6" className="mt-5">
									<Chart
										type="bar"
										options={{
											indexAxis: "y",
											responsive: true,
											plugins: {
												legend: {
													position: "right",
												},
												title: {
													display: true,
													text: "熱門商品銷售額",
													// fontSize: 25,
													font: {
														size: fontTitleSize,
													},
												},
											},
										}}
										data={earningState.hotRankTotalChart}
									/>
									<Chart
										type="bar"
										options={{
											indexAxis: "y",
											responsive: true,
											plugins: {
												legend: {
													position: "right",
												},
												title: {
													display: true,
													text: "熱門商品銷售量",
													font: {
														size: fontTitleSize,
													},
												},
											},
										}}
										data={earningState.hotRankQuantityChart}
									/>
								</Col>
							)}

							<Col md="5" className="mt-5">
								<Doughnut options={ChartConfig.doughnutOptions} data={earningState.doughnutData} />
							</Col>
						</Row>
					)}
				</Card>

				<Card className="p-5 mt-4">
					<Card.Title>銷售查詢</Card.Title>
					<Row>
						<Row className="mt-4">
							<Alert variant="danger" show={saleMessage.length > 0}>
								{saleMessage}
							</Alert>
						</Row>
						<DatePicker date={saleDate} setDate={setSaleDate} submitHandler={saleQuery} />
						<InputGroup className="mt-4">
							<InputGroup.Radio
								name="saleQueryType"
								value="class"
								checked={saleQueryType === "class"}
								onChange={(e) => setSaleQueryType(e.target.value)}
							/>
							<InputGroup.Text>依類別查詢</InputGroup.Text>
							<Form.Select
								value={saleQueryObject}
								onChange={(e) => setSaleQueryObject(e.target.value)}
								disabled={saleQueryType !== "class"}>
								<option>請選擇</option>
								{dataState?.productclasses?.data.map((record, i) => {
									return (
										<option key={`classes-in-${i}`} value={record.classNo}>
											{record.className}
										</option>
									);
								})}
							</Form.Select>
						</InputGroup>
						<InputGroup className="mt-4">
							<InputGroup.Radio
								name="saleQueryType"
								value="product"
								checked={saleQueryType === "product"}
								onChange={(e) => setSaleQueryType(e.target.value)}
							/>
							<InputGroup.Text>依產品查詢</InputGroup.Text>
							<Form.Select
								value={saleQueryObject}
								onChange={(e) => setSaleQueryObject(e.target.value)}
								disabled={saleQueryType !== "product"}>
								<option>請選擇</option>
								{dataState?.products?.data.map((record, i) => {
									return (
										<option key={`products-in-${i}`} value={record.productNo}>
											{record.productName}
										</option>
									);
								})}
							</Form.Select>
						</InputGroup>
					</Row>

					<Row className="mt-4 justify-content-center">
						{saleState?.saleQuantityChart && (
							<Col md="12" className="mt-5">
								<Chart
									options={{
										responsive: true,
										plugins: {
											legend: {
												position: "top",
											},
											title: {
												display: true,
												text: "銷售量",
											},
										},
										scales: {
											y: {
												type: "linear",
												display: true,
												position: "left",
											},
											y1: {
												type: "linear",
												display: true,
												position: "right",
											},
										},
									}}
									data={saleState.saleQuantityChart}
								/>
							</Col>
						)}
						{saleState?.saleTotalChart && (
							<Col md="12" className="mt-5">
								<Chart
									options={{
										responsive: true,
										plugins: {
											legend: {
												position: "top",
											},
											title: {
												display: true,
												text: "銷售額",
											},
										},
										scales: {
											y: {
												type: "linear",
												display: true,
												position: "left",
											},
											y1: {
												type: "linear",
												display: true,
												position: "right",
											},
										},
									}}
									data={saleState.saleTotalChart}
								/>
							</Col>
						)}
					</Row>
				</Card>
			</Container>
		</Authorization>
	);
}
const DatePicker = ({ date, setDate, submitHandler }) => {
	return (
		<InputGroup>
			<InputGroup.Text>起始日期</InputGroup.Text>
			<FormControl
				type="date"
				value={date.start}
				onChange={(e) =>
					setDate((pre) => {
						return { ...pre, start: e.target.value };
					})
				}
			/>
			<InputGroup.Text>結束日期</InputGroup.Text>
			<FormControl
				type="date"
				value={date.end}
				onChange={(e) =>
					setDate((pre) => {
						return { ...pre, end: e.target.value };
					})
				}
			/>
			<Button variant="secondary" onClick={() => submitHandler(date.start, date.end)}>
				查詢
			</Button>
		</InputGroup>
	);
};
