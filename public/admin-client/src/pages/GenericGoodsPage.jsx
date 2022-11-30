import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController, DataTableFilter } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
export default function GenericGoodsPage() {
	const { dataState } = useStateContext();
	const tableName = "genericgoods";
	const type = {
		keys: ["genericgoodNo"],
		settings: [{ type: "primary" }],
	};

	return (
		<Authorization>
			<Container>
				{(dataState && dataState[tableName] && (
					<DataTableController id="genericGoods" title="原物料品項管理" tableName={tableName} type={type} edit>
						<DataTableFilter>
							<DataTableFilter.Compare
								label="小於安全庫存量"
								compare="l"
								columns={["inventory", "sale_Inventory"]}
							/>
						</DataTableFilter>
						<DataTableFilter>
							<DataTableFilter.Compare
								label="大於安全庫存量"
								compare="g"
								columns={["inventory", "sale_Inventory"]}
							/>
						</DataTableFilter>
					</DataTableController>
				)) ||
					"載入中...."}
			</Container>
		</Authorization>
	);
}
