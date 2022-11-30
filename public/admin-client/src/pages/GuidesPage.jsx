import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const GuidesPage = () => {
  const { dataState } = useStateContext();
  const tableName = "guides";
  const type = {
    keys: ["dataID", "updateDateTime", "file", "eAccount"],
    settings: [{ type: "disable" }, { type: "auto" }, { type: "file" }, { type: "user" }],
  };
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="guides" title="新進員工指南" tableName={tableName} type={type} edit>
            <DataTableFilter>
              <DataTableFilter.Time label="更新時間" type="datetime-local" column="updateDateTime" />
            </DataTableFilter>
          </DataTableController>
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
};

export default GuidesPage;
