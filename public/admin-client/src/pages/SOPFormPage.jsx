import React from "react";
import { Container } from "react-bootstrap";
import { Authorization, DataTableController } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const SOPFormPage = () => {
	const { dataState } = useStateContext();
	const tableName = "sopform";
	const type = {
		keys: ["sopClass", "eAccount", "status"],
		settings: [{ type: "enum", values: ["開店", "閉店"] }],
	};
	return (
		<Authorization>
			<Container>
				{(dataState && dataState[tableName] && (
					<DataTableController
						id="sopform"
						title="設定開閉店表單內容"
						tableName={tableName}
						type={type}
						edit
						noEdit
					/>
				)) ||
					"載入中...."}
			</Container>
		</Authorization>
	);
};

export default SOPFormPage;
