import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function MealTypesPage() {
	const { dataState } = useStateContext();
	const tableName = "productclasses";
	const type = {
		keys: ["classNo"],
		settings: [{ type: "primary" }],
	};
	return (
		<Authorization>
			<Container>
				{(dataState && dataState[tableName] && (
					<DataTableController id="mealTypes" title="商品類別管理" tableName={tableName} type={type} edit />
				)) ||
					"載入中...."}
			</Container>
		</Authorization>
	);
}
