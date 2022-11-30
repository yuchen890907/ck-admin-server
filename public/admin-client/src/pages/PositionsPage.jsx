import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import fetchService from "../service/fetch.service";

const PositionsPage = () => {
  const { dataState } = useStateContext();
  const tableName = "positions";
  const emptyEditState = { type: "", level: 0, position: "", permissions: dataState[tableName]?.permissions || {} };
  const [editState, setEditState] = useState(emptyEditState);
  const [modalMessage, setModalMessage] = useState("");
  const closeHandler = () => {
    setModalMessage("");
    setEditState(emptyEditState);
  };
  return (
    <Authorization>
      <Container className="positions-page">
        <Card>
          <Card.Header className="py-3">
            <Card.Title>職權管理</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div
                  className="control-btn"
                  onClick={() => {
                    setEditState({ ...emptyEditState, type: "insert" });
                  }}
                >
                  <i className="bi bi-plus" style={{ fontWeight: "700" }} />
                  <span>新增職位</span>
                </div>
              </Col>
            </Row>
            {dataState[tableName]?.data.map((record, index) => {
              return <Record key={`rd-${index}`} record={record} />;
            })}
          </Card.Body>
        </Card>

        {/* {(dataState && dataState[tableName] && (
					<DataTableController id="positions" title="職權管理" tableName={tableName} edit></DataTableController>
				)) ||
					"載入中...."} */}

        <Modal show={editState.type} onHide={closeHandler}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editState.type === "delete" ? "刪除" : editState.type === "insert" ? "新增" : "編輯"}
              職位
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
                    <FloatingLabel label="職稱">
                      <Form.Control
                        type="text"
                        min="0"
                        value={editState.position}
                        onChange={(e) => {
                          setEditState((pre) => {
                            let o = { ...pre };
                            o.position = e.target.value;
                            return o;
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <FloatingLabel label="權限">
                      <Form.Control
                        type="number"
                        min="1"
                        step="1"
                        max="99"
                        value={editState.level}
                        onChange={(e) => {
                          setEditState((pre) => {
                            let o = { ...pre };
                            if (Math.round(e.target.value) > 0 && Math.round(e.target.value) < 100)
                              o.level = Math.round(e.target.value);
                            return o;
                          });
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <EditModalBody />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
              取消
            </Button>
            <Button variant={editState?.type === "delete" ? "danger" : "primary"} onClick={submitHandler}>
              {editState?.type === "delete" ? "確認刪除" : editState?.type === "edit" ? "確認編輯" : "新增"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Authorization>
  );
  function submitHandler() {
    let table = tableName;
    if (editState?.type === "delete") {
      fetchService
        .deleteOne(table, editState)
        .then((res) => {
          if (res.data.success) setEditState(emptyEditState);
          setModalMessage("");
        })
        .catch((error) => setModalMessage(error.response.data.message));
    } else if (editState?.type === "edit") {
      fetchService
        .updateOne(table, editState)
        .then((res) => {
          if (res.data.success) setEditState(emptyEditState);
          setModalMessage("");
        })
        .catch((error) => setModalMessage(error.response.data.message));
    } else if (editState?.type === "insert") {
      fetchService
        .insertOne(table, editState)
        .then((res) => {
          if (res.data.success) setEditState(emptyEditState);
          setModalMessage("");
        })
        .catch((error) => setModalMessage(error.response.data.message));
    }
  }

  function Record({ record }) {
    return (
      <Row className="mt-4 mt-sm-2 ms-1">
        <Col className="d-sm-flex col-7">
          <Col className="mt-2 me-2 text">
            {dataState[tableName]?.labels[0]} : {record.position}
          </Col>
          <Col className="mt-2 me-2 text">
            {dataState[tableName]?.labels[1]} : {record.level}
          </Col>
        </Col>
        <Col className="d-sm-flex col-5 px-0">
          <div className="me-2 me-md-3 control-btn mt-2 " onClick={() => setEditState({ type: "edit", ...record })}>
            <i className="bi bi-pencil-fill" />
            <span>編輯</span>
          </div>
          <div
            className="me-md-3 control-btn control-btn-delete mt-2"
            onClick={() => setEditState({ type: "delete", ...record })}
          >
            <i className="bi bi-trash3-fill" />
            <span>刪除</span>
          </div>
        </Col>
      </Row>
    );
  }

  function EditModalBody() {
    return (
      <>
        {Object.values(editState.permissions).map((permission, index) => {
          return <Permission key={`permission-${index}`} permission={permission} />;
        })}
      </>
    );
  }

  function Permission({ permission }) {
    if (permission.type === "table")
      return (
        <Row className="mt-2">
          <Col>{permission.label}</Col>
          <Col className="d-flex algin-items-center">
            <Col className="d-flex">
              <span className="me-1">編輯</span>
              <Form.Check
                type="switch"
                checked={permission.write}
                onChange={() =>
                  setEditState((pre) => {
                    let o = JSON.parse(JSON.stringify(pre));
                    o.permissions[permission.permission].write = !o.permissions[permission.permission].write;
                    return o;
                  })
                }
              />
            </Col>
            <Col className="d-flex">
              <span className="me-1">查詢</span>
              <Form.Check
                type="switch"
                checked={permission.read}
                onChange={() =>
                  setEditState((pre) => {
                    let o = JSON.parse(JSON.stringify(pre));
                    o.permissions[permission.permission].read = !o.permissions[permission.permission].read;
                    return o;
                  })
                }
              />
            </Col>
          </Col>
        </Row>
      );
    else if (permission.type === "system") {
      return (
        <Row className="mt-2">
          <Col>{permission.label}</Col>{" "}
          <Col className="d-flex algin-items-center">
            <Col className="d-flex">
              <span className="me-1">允許</span>
              <Form.Check
                type="switch"
                checked={permission.allow}
                onChange={() =>
                  setEditState((pre) => {
                    let o = JSON.parse(JSON.stringify(pre));
                    o.permissions[permission.permission].allow = !o.permissions[permission.permission].allow;
                    return o;
                  })
                }
              />
            </Col>
          </Col>
        </Row>
      );
    }
  }
};

export default PositionsPage;
