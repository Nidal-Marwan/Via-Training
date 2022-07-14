import Table from "../../common/components/Table/Table";
import { useMe } from "../../common/hooks/useMe.hook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { trainingClient } from "../../common/api/trainingClient";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { CircularProgress } from "@mui/material";
import { CustomButton } from "../../common/components/Button/Button";

export const FavLocation: React.FC = () => {
	const { userInfo } = useMe();
	const [cursor, setCursor] = useState("auto");
	const [openMap, setOpenMap] = useState(false);
	const [openAddLocation, setOpenAddLocation] = useState(false);
	const [position, setPosition] = useState({ lat: 0, lng: 0 });
	const [selectedData, setSelectedData] = useState({});
	const { locationData, isLoading, setLocationData } = useGetLocations(userInfo?.user.userInfo.id);
	const handleEdit = (cell: GridCellParams) => {
		setOpenMap(!openMap);
		setPosition({ lat: cell.row.lat, lng: cell.row.long });
		setSelectedData(cell.row);
	};
	const handleDelete = async (cell: GridCellParams) => {
		const cellId = +cell.row.id;
		const response = await trainingClient.delete(`/locations/${cellId}`);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/locations/${userInfo?.user.userInfo.id}`);
			if (response.data.status === 200) {
				setLocationData(response.data.data);
			}
			if (response.data.status === 204) {
				setLocationData([]);
			}
		}
	};
	const changeCursor = () => {
		setCursor("pointer");
	};
	const headers = [
		{
			field: "name", headerName: "Name", headerAlign: "center", width: 150, align: "center",
		},
		{ field: "lat", headerName: "Latitude", headerAlign: "center", type: "number", width: 100, align: "center" },
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
	return <>
		<p>Welcome {userInfo?.user.userInfo.email} </p>
		<CustomButton title={"Add Location"} type={"button"} color={"inherit"} onClick={() => { setOpenAddLocation(true); }} />
		{isLoading ? <CircularProgress /> : <Table datepicker height={400} width={800} margin={15} columns={headers} rows={locationData ? locationData : []} />}
		<ModalContainer callBackData={setLocationData} data={selectedData} position={{ lat: position.lat, lng: position.lng }} open={openMap} setOpen={setOpenMap} page='location' />
		<ModalContainer callBackData={setLocationData} position={{ lat: 0, lng: 0 }} open={openAddLocation} setOpen={setOpenAddLocation} page="addLocation" />

	</>;
};
