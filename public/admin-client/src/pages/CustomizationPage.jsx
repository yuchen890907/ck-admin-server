import React, { useState } from "react";
import {
	Container,
	Button,
	Row,
	Col,
	Form,
	InputGroup,
	Modal,
	Card,
	FloatingLabel,
	Alert,
	Accordion,
} from "react-bootstrap";
import { Authorization } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import fetchService from "../service/fetch.service";

export default function CustomizationPage() {
	const emptyEditState = { index: -1, customclasses: { item: "", type: "radio" }, type: "" };
	const emptyContentState = { item: "", content: "", price: "", originContent: "", type: "" };
	const emptyProductState = { class: "", products: [] };
	const { dataState } = useStateContext();
	const [editState, setEditState] = useState(emptyEditState);
	const [editContentState, setEditContentState] = useState(emptyContentState);
	const [editProductState, setEditProductState] = useState(emptyProductState);

	const [message, setMessage] = useState("");
	const [modalMessage, setModalMessage] = useState("");
	const classesTypes = [
		["radio", "僅單選"],
		["check", "可複選"],
	];
	return (
		<Authorization>
			<Container className="customization-page">
				{dataState?.productcustom && dataState?.customclasses && (
					<Card className="p-5">
						<Card.Header>
							<Card.Title className="d-flex justify-content-between">
								<div>商品客製化設定</div>
								<div
									className="control-btn ps-2 pe-3"
									onClick={() => {
										let o = { ...emptyEditState };
										o.type = "insert";
										setEditState(o);
									}}>
									<i className="bi bi-plus" />
									<span style={{ fontSize: "1rem" }}>新增項目</span>
								</div>
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<Alert show={message?.length > 0} variant="info" className="mt-2">
								{message}
							</Alert>

							<Accordion>
								{dataState.customclasses?.data.map((record, i) => {
									return (
										<Accordion.Item eventKey={i} key={`item-${i}`}>
											<Accordion.Header>{record.item}</Accordion.Header>
											<Accordion.Body>
												{editState.index === i ? (
													<EditContent record={record} i={i} />
												) : (
													<>
														<Row className="">
															<Col>
																<div
																	className="control-btn"
																	onClick={() => {
																		setEditState((pre) => {
																			let o = { ...emptyEditState };
																			o.index = i;
																			o.type = "edit";
																			o.customclasses = record;
																			return o;
																		});
																	}}>
																	<i className="bi bi-pencil-fill" />
																	<span>編輯內容</span>
																</div>
															</Col>
														</Row>
														{dataState.customization?.data
															.filter((r) => record.item === r.item)
															.map((r, j) => {
																return (
																	<div key={`content-${i}-${j}`}>
																		<div className=" d-flex mb-5 my-sm-2">
																			<Row
																				style={{ flex: "1" }}
																				className="pe-sm-3 pe-3">
																				<Col sm="5" className="my-1">
																					<FloatingLabel label="內容">
																						<Form.Control
																							type="text"
																							min="0"
																							placeholder="內容"
																							value={r.content}
																							onChange={(e) => {}}
																						/>
																					</FloatingLabel>
																				</Col>
																				<Col sm="5" className="my-1">
																					<FloatingLabel label="價格">
																						<Form.Control
																							type="number"
																							placeholder="價格"
																							min="0"
																							value={r.price}
																							onChange={(e) => {}}
																						/>
																					</FloatingLabel>
																				</Col>
																			</Row>
																			{/* <Button
																		className="d-flex align-items-center justify-content-center my-1"
																		variant="outline-secondary"
																		onClick={() => {}}
																		style={{ flex: "0 1 35px" }}>
																		<i className="bi bi-trash3-fill"></i>
																	</Button>
																	<Button
																		className="d-flex align-items-center justify-content-center my-1"
																		variant="outline-secondary"
																		onClick={() => {}}
																		style={{ flex: "0 1 35px" }}>
																		<i className="bi bi-trash3-fill"></i>
																	</Button> */}
																		</div>
																	</div>
																);
															})}
													</>
												)}
											</Accordion.Body>
										</Accordion.Item>
									);
								})}
							</Accordion>
						</Card.Body>
					</Card>
				)}
				<Modal
					show={editContentState?.item}
					onHide={() => {
						setModalMessage("");
						setEditContentState(emptyContentState);
					}}>
					<Modal.Header closeButton>
						<Modal.Title>
							{editContentState?.type === "delete"
								? "刪除"
								: editContentState?.type === "edit"
								? "編輯"
								: "新增"}
							客製化內容
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Alert show={modalMessage?.length > 0} variant="danger" className="mt-2">
							{modalMessage}
						</Alert>
						{editContentState?.type === "delete" ? (
							"刪除後無法復原，您確定要刪除嗎?"
						) : (
							<>
								<Row className="my-1">
									<Col>
										<FloatingLabel label="內容">
											<Form.Control
												type="text"
												min="0"
												placeholder="內容"
												value={editContentState?.content}
												onChange={(e) => {
													setEditContentState((pre) => {
														let o = { ...pre };
														o.content = e.target.value;
														return o;
													});
												}}
											/>
										</FloatingLabel>
									</Col>
								</Row>
								<Row className="my-1">
									<Col>
										<FloatingLabel label="價格">
											<Form.Control
												type="number"
												placeholder="價格"
												min="0"
												value={editContentState?.price}
												onChange={(e) => {
													setEditContentState((pre) => {
														let o = { ...pre };
														o.price = e.target.value;
														return o;
													});
												}}
											/>
										</FloatingLabel>
									</Col>
								</Row>
							</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => {
								setModalMessage("");
								setEditContentState(emptyContentState);
							}}>
							取消
						</Button>
						<Button
							variant={editContentState?.type === "delete" ? "danger" : "primary"}
							onClick={() => {
								let table = "customization";
								if (editContentState?.type === "delete") {
									fetchService
										.deleteOne(table, editContentState)
										.then((res) => {
											if (res.data.success) setEditContentState(emptyContentState);
										})
										.catch((error) => console.log(error));
								} else if (editContentState?.type === "edit") {
									fetchService
										.updateOne(table, editContentState)
										.then((res) => {
											if (res.data.success) setEditContentState(emptyContentState);
										})
										.catch((error) => setModalMessage(error.response.data.message));
								} else if (editContentState?.type === "insert") {
									fetchService
										.insertOne(table, editContentState)
										.then((res) => {
											if (res.data.success) setEditContentState(emptyContentState);
										})
										.catch((error) => setModalMessage(error.response.data.message));
								}
							}}>
							{editContentState?.type === "edit"
								? "確認編輯"
								: editContentState?.type === "delete"
								? "確定刪除"
								: "新增"}
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={editState.type && editState.type != "edit"}
					onHide={() => {
						setModalMessage("");
						setEditState((pre) => {
							let o = { ...pre };
							o.type = "";
							return o;
						});
					}}>
					<Modal.Header closeButton>
						<Modal.Title>
							{editState.type === "delete" ? "刪除" : "新增"}
							客製化類別
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Alert show={modalMessage?.length > 0} variant="danger" className="mt-2">
							{modalMessage}
						</Alert>
						{editState.type === "delete" ? (
							"刪除後無法復原，您確定要刪除嗎?"
						) : (
							<>
								<Row className="my-1">
									<Col>
										<FloatingLabel label="客製化項目">
											<Form.Control
												type="text"
												min="0"
												placeholder="客製化項目"
												value={editState.customclasses.item}
												onChange={(e) => {
													setEditState((pre) => {
														let o = { ...pre };
														o.customclasses.item = e.target.value;
														return o;
													});
												}}
											/>
										</FloatingLabel>
									</Col>
								</Row>
							</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => {
								setModalMessage("");
								setEditState((pre) => {
									let o = { ...pre };
									o.type = "";
									return o;
								});
							}}>
							取消
						</Button>
						<Button
							variant={editState?.type === "delete" ? "danger" : "primary"}
							onClick={() => {
								let table = "customclasses";
								if (editState?.type === "delete") {
									fetchService
										.deleteOne(table, editState.customclasses)
										.then((res) => {
											if (res.data.success) setEditState(emptyEditState);
										})
										.catch((error) => console.log(error));
								} else if (editState?.type === "edit") {
									fetchService
										.updateOne(table, { ...editState.customclasses })
										.then((res) => {
											if (res.data.success) setEditState(emptyEditState);
										})
										.catch((error) => setModalMessage(error.response.data.message));
								} else if (editState?.type === "insert") {
									fetchService
										.insertOne(table, editState.customclasses)
										.then((res) => {
											if (res.data.success) setEditState(emptyEditState);
										})
										.catch((error) => setModalMessage(error.response.data.message));
								}
							}}>
							{editState?.type === "delete" ? "確認刪除" : "新增"}
						</Button>
					</Modal.Footer>
				</Modal>
				<ProductsModal />
			</Container>
		</Authorization>
	);

	function EditContent({ i, record }) {
		return (
			<>
				<Row>
					<Col className="d-flex justify-content-between flex-md-row flex-column">
						<div className="d-flex flex-sm-row flex-column">
							<div className="me-2 control-btn mt-2 " onClick={() => setEditState(emptyEditState)}>
								<span>取消編輯</span>
							</div>
							<div
								className="me-2 control-btn mt-2 "
								onClick={() => setEditProductState({ class: record.item })}>
								<span>品項管理</span>
							</div>
							<div
								className="me-2 control-btn control-btn-done mt-2 "
								onClick={() => {
									let table = "customclasses";
									fetchService
										.updateOne(table, { ...editState.customclasses })
										.then((res) => {
											if (res.data.success) setEditState(emptyEditState);
										})
										.catch((error) => setModalMessage(error.response.data.message));
								}}>
								<span>確認修改</span>
							</div>
						</div>
						<div>
							<div
								className="control-btn control-btn-delete mt-2"
								onClick={() => {
									let o = { ...emptyEditState };
									o.customclasses = record;
									o.type = "delete";
									o.index = i;
									setEditState(o);
								}}>
								<i className="bi bi-trash3-fill" />
								<span>刪除類別</span>
							</div>
						</div>
					</Col>
				</Row>
				<FloatingLabel className="my-3" label={dataState.customclasses?.labels[1]}>
					<Form.Select
						value={editState.customclasses.type}
						onChange={(e) =>
							setEditState((pre) => {
								let o = JSON.parse(JSON.stringify(pre));
								o.customclasses.type = e.target.value;
								return o;
							})
						}>
						{classesTypes.map((tuple, i) => (
							<option key={`type-${i}`} value={tuple[0]}>
								{tuple[1]}
							</option>
						))}
					</Form.Select>
				</FloatingLabel>
				{dataState.customization?.data
					.filter((r) => record.item === r.item)
					.map((r, j) => {
						return (
							<div key={`content-${i}-${j}`}>
								<div className=" d-flex mb-5 my-sm-2 justify-content-between">
									<Row style={{ flex: "1" }} className="pe-sm-3 pe-3">
										<Col sm="5" className="my-1">
											<FloatingLabel label="內容">
												<Form.Control
													type="text"
													min="0"
													placeholder="內容"
													value={r.content}
													onChange={(e) => {}}
												/>
											</FloatingLabel>
										</Col>
										<Col sm="5" className="my-1">
											<FloatingLabel label="價格">
												<Form.Control
													type="number"
													placeholder="價格"
													min="0"
													value={r.price}
													onChange={(e) => {}}
												/>
											</FloatingLabel>
										</Col>
									</Row>
									<Button
										className="d-flex align-items-center justify-content-center my-1"
										variant="outline-secondary"
										onClick={() => {
											r.type = "edit";
											r.originContent = r.content;
											setEditContentState(r);
										}}
										style={{ flex: "0 1 35px" }}>
										<i className="bi bi-pencil-square"></i>
									</Button>
									<Button
										className="d-flex align-items-center justify-content-center my-1"
										variant="outline-secondary"
										onClick={() => {
											r.type = "delete";
											setEditContentState(r);
										}}
										style={{ flex: "0 1 35px" }}>
										<i className="bi bi-trash3-fill"></i>
									</Button>
								</div>
							</div>
						);
					})}
				<Button
					className="d-flex align-items-center my-2 p-0 ps-2 pe-3"
					variant="outline-secondary"
					style={{ fontWeight: "600" }}
					onClick={() => {
						let o = { ...emptyContentState };
						o.item = dataState.customclasses.data[i].item;
						o.type = "insert";
						setEditContentState(o);
					}}>
					<i className="bi bi-plus" style={{ fontSize: "1.5rem", fontWeight: "700" }}></i>新增內容
				</Button>
			</>
		);
	}

	function ProductsModal() {
		const [selectState, setSelectState] = useState(makeSelectState());
		const closeHandler = () => {
			setModalMessage("");
			setEditProductState(emptyProductState);
		};
		return (
			<Modal show={editProductState.class.length > 0} onHide={closeHandler}>
				<Modal.Header closeButton>客製化品項選擇</Modal.Header>
				<Modal.Body>
					<Alert show={modalMessage?.length > 0} variant="danger" className="mt-2">
						{modalMessage}
					</Alert>
					{selectState &&
						Object.values(selectState).map((productClass) => (
							<ClassBlock key={`CB-${productClass.classNo}`} productClass={productClass} />
						))}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={closeHandler} variant="secondary">
						取消
					</Button>
					<Button
						onClick={() => {
							const records = [];
							Object.values(selectState).forEach((customclasses) => {
								customclasses.products.forEach((product) => {
									if (product.selected)
										records.push({ item: editProductState.class, productNo: product.productNo });
								});
							});
							fetchService
								.updateOne("productcustom", { data: records, item: editProductState.class })
								.then((res) => {
									if (res.data.success) setModalMessage("");
								})
								.catch((err) => {
									setModalMessage(err.response.data.message);
								});
						}}>
						完成
					</Button>
				</Modal.Footer>
			</Modal>
		);
		function ClassBlock({ productClass }) {
			return (
				<div>
					<Row className="mt-3">
						<Col className="d-flex">
							<div>
								<Form.Check
									type="checkbox"
									checked={productClass.select}
									label={productClass.className}
									onChange={() => {
										setSelectState((pre) => {
											let o = JSON.parse(JSON.stringify(pre));
											o[productClass.classNo].select = !o[productClass.classNo].select;
											o[productClass.classNo].products.forEach((product) => {
												product.selected = o[productClass.classNo].select;
											});
											return o;
										});
									}}
								/>
							</div>
							<div>
								<i
									className={`bi bi-eye-${productClass.show ? "fill" : "slash-fill"}`}
									onClick={() => {
										setSelectState((pre) => {
											let o = JSON.parse(JSON.stringify(pre));
											o[productClass.classNo].show = !o[productClass.classNo].show;
											return o;
										});
									}}
								/>
							</div>
						</Col>
					</Row>
					{productClass.show &&
						productClass.products.map((product, index) => (
							<Row className="my-1 px-4" key={`CB-${productClass.classNo}-${index}`}>
								<Form.Check
									type="checkbox"
									checked={product.selected}
									label={product.productName}
									onChange={() => {
										setSelectState((pre) => {
											let o = JSON.parse(JSON.stringify(pre));
											o[product.classNo].products[index].selected =
												!o[product.classNo].products[index].selected;
											return o;
										});
									}}
								/>
							</Row>
						))}
				</div>
			);
		}
	}
	function makeSelectState() {
		const products = dataState.productcustom?.data.filter((product) => product.item === editState.customclasses.item);
		const state = dataState.products?.data
			.map((product) =>
				products?.findIndex((p) => p.productNo === product.productNo) > -1 ? { ...product, selected: true } : product
			)
			.reduce((groups, product) => {
				const group = groups[product.classNo] || {
					classNo: product.classNo,
					className: dataState.productclasses.data.find((record) => record.classNo === product.classNo).className,
					selected: false,
					show: true,
					products: [],
				};
				group.products.push(product);
				groups[product.classNo] = group;
				return groups;
			}, {});
		return state;
	}
}
