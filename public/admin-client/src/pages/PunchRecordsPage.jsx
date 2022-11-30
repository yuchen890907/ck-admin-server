import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const PunchRecordsPage = () => {
  const { dataState } = useStateContext();
  const tableName = "punchrecords";
  const type = {
    keys: ["punchDateTime", "eAccount", "status", "GPS"],
    settings: [
      { type: "datetime-local" },
      { type: "foreignKey", ref: "employees", column: "account", cname: "name" },
      { type: "enum", values: ["上班", "下班"] },
      { type: "img" },
    ],
  };
  return (
    <Authorization>
      <Container>
        {(dataState && dataState[tableName] && (
          <DataTableController id="punchrecords" title="打卡紀錄" tableName={tableName} type={type} edit>
            <DataTableFilter>
              <DataTableFilter.Time label="打卡時間" type="datetime-local" column="punchDateTime" />
              <DataTableFilter.Select
                label="職員"
                refTable="employees"
                column="eAccount"
                refColumn="account"
                cname="name"
              />
            </DataTableFilter>
          </DataTableController>
        )) ||
          "載入中...."}
      </Container>
    </Authorization>
  );
};

export default PunchRecordsPage;
