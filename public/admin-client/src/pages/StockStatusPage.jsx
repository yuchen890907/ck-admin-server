import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function StockStatusPage() {
  const { dataState } = useStateContext();
  const tableName = "genericgoods";
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="stockstatus" title="庫存現況" tableName={tableName}>
            <DataTableFilter>
              <DataTableFilter.Compare label="小於安全庫存量" compare="l" columns={["inventory", "sale_Inventory"]} />
              <DataTableFilter.Compare label="大於安全庫存量" compare="g" columns={["inventory", "sale_Inventory"]} />
            </DataTableFilter>
          </DataTableController>
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
}
