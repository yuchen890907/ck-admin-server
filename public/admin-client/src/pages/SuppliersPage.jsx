import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function SuppliersPage() {
  const { dataState } = useStateContext();
  const tableName = "suppliers";
  const type = {
		keys: ["supplierNo"],
		settings: [{ type: "primary" }],
	};
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="suppliers" title="供應商資訊" tableName={tableName} type={type} edit></DataTableController>
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
}
