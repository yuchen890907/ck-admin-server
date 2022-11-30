import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function EmployeesPage() {
	const { dataState } = useStateContext();
	const tableName = "employees";
	const type = {
		keys: ["account","password", "enrollmentDate", "resignationDate", "sex", "position"],
		settings: [
			{ type: "primary" },
			{ type: "password" },
			{ type: "date" },
			{ type: "date" },
			{ type: "enum", values: ["男性", "女性"] },
			{
				type: "foreignKey",
				ref: "positions",
				column: "position",
				cname: "position",
			},
		],
	};
	return (
		<Authorization>
			<Container>
				{(dataState && dataState[tableName] && dataState["positions"] && (
					<DataTableController id="employees" title="員工管理" tableName={tableName} type={type} edit>
						<DataTableFilter>
							<DataTableFilter.Number label="薪水範圍" column="salary" min max />
							<DataTableFilter.Time label="入職日期" type="date" column="enrollmentDate" />
							<DataTableFilter.Select
								label="職稱"
								refTable="positions"
								column="position"
								refColumn="position"
								cname="position"
							/>
						</DataTableFilter>
					</DataTableController>
				)) ||
					"載入中...."}
			</Container>
		</Authorization>
	);
}
