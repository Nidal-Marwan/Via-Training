import Table from "../../common/components/Table/Table";
import { useMe } from "../../common/hooks/useMe.hook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { trainingClient } from "../../common/api/trainingClient";

export const FavLocation: React.FC = () => {
	const { userInfo } = useMe();
	const token = window.localStorage.getItem("access_token");
	const [cursor, setCursor] = useState("auto");
	const [openMap, setOpenMap] = useState(false);
	const [position, setPosition] = useState({ lat: 0, lng: 0 });
	const [selectedData, setSelectedData] = useState<any>();
	const handleEdit = (cell: GridCellParams) => {
		setOpenMap(!openMap);
		setPosition({ ...position, lat: cell.row.lat, lng: cell.row.long });
		setSelectedData(cell.row);
	};
	const handleDelete = async (cell: GridCellParams) => {
		const response = await trainingClient.delete(`/locations/${cell.row.id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (response.data.status === 200) {
			await trainingClient.get("locations");
		}
	};
	const changeCursor = () => {
		setCursor("pointer");
	};
	const headers = [
		{
			field: "name", headerName: "Name", headerAlign: "center", width: 150, align: "center",
		},
		{ field: "lat", editable: true, headerName: "Latitude", headerAlign: "center", type: "number", width: 100, align: "center" },
		{ field: "long", headerName: "Longitude", headerAlign: "center", type: "number", width: 100, align: "center" },
		{ field: "date", headerName: "Date", headerAlign: "center", type: "date", width: 100, align: "center" },
		{
			field: "edit", headerName: "Edit", headerAlign: "center", align: "center", renderCell: (param: GridCellParams) => {
				return <EditIcon sx={{ cursor: `${cursor}` }} onMouseEnter={changeCursor} onClick={() => handleEdit(param)} />;
			}
		},
		{
			field: "delete", headerName: "Delete", headerAlign: "center", align: "center", renderCell: (param: GridCellParams) => {
				return <DeleteIcon sx={{ cursor: `${cursor}` }} onMouseEnter={changeCursor} onClick={() => handleDelete(param)} />;
			}
		},

	];
	const data = [
		{
			id: 1,
			name: "London",
			lat: 35.3,
			long: 35.3,
			date: new Date("2022-6-10")
		},
		{
			id: 4,
			name: "London",
			lat: 35.3,
			long: 35.3,
			date: new Date("2022-6-10")
		},
		{
			id: 2,
			name: "London",
			lat: 33.3,
			long: 35.3,
			date: new Date("2022-6-9")
		},
		{
			id: 3,
			name: "London",
			lat: 34.3,
			long: 35.3,
			date: new Date("2022-6-12")
		},
	];
	return <>
		<p>Welcome {userInfo?.user.userInfo.email} </p>
		<Table height={400} width={800} margin={15} columns={headers} rows={data} />
		{openMap && <ModalContainer data={selectedData} position={{ lat: position.lat, lng: position.lng }} page='location' />}

	</>;
};
