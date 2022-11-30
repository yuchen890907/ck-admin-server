import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const SeatsPage = () => {
  const { dataState } = useStateContext();
  const tableName = "seats";
  const type = {
    keys: ["productNo", "genericgoodNo"],
    settings: [
      { type: "foreignKey", ref: "products", column: "productNo", cname: "productName" },
      { type: "foreignKey", ref: "genericgoods", column: "genericgoodNo", cname: "genericgoodName" },
    ],
  };
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="seats" title="設定店內座位" tableName={tableName} type={type} edit />
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
};

export default SeatsPage;
