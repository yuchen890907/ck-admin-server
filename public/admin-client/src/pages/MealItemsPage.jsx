import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function MealItemsPage() {
  const { dataState, setFilter } = useStateContext();
  const tableName = "products";
  const type = {
    keys: ["productNo", "classNo", "img"],
    settings: [
      { type: "primary" },
      {
        type: "foreignKey",
        ref: "productclasses",
        column: "classNo",
        cname: "className",
      },
      { type: "img" },
    ],
  };
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="mealItems" title="商品品項管理" tableName={tableName} type={type} edit filter>
            <DataTableFilter>
              <DataTableFilter.Number label="單價範圍" column="unitPrice" min max />
              <DataTableFilter.Select
                label="商品類別"
                refTable="productclasses"
                column="classNo"
                refColumn="classNo"
                cname="className"
              />
            </DataTableFilter>
          </DataTableController>
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
}
