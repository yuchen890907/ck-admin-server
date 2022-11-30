import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter, DataTableHolder, DataTableViewer } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function BomsPage() {
  const { dataState } = useStateContext();
  const tableName = "boms";
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
          <DataTableController id="boms" title="商品原物料清單" tableName={tableName} type={type} edit>
            <DataTableFilter>
              <DataTableFilter.Select
                label="商品"
                refTable="products"
                column="productNo"
                refColumn="productNo"
                cname="productName"
              />
              <DataTableFilter.Select
                label="原物料"
                refTable="genericgoods"
                column="genericgoodNo"
                refColumn="genericgoodNo"
                cname="genericgoodName"
              />
            </DataTableFilter>
          </DataTableController>
        )) || <DataTableHolder />}
      </Container>
    </Authorization>
  );
}
