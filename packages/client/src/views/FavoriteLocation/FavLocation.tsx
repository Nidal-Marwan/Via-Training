import Table from "../../common/components/Table/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { trainingClient } from "../../common/api/trainingClient";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { CircularProgress } from "@mui/material";
import { CustomButton } from "../../common/components/Button/Button";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/Actions/User/user.selector";
import { useTranslation } from "react-i18next";

export const FavLocation:React.FC = () => {
	const { t } = useTranslation();
	const userInfo = useSelector(userSelector);
	const [cursor, setCursor] = useState("auto");
	const [openMap, setOpenMap] = useState(false);
	const [openAddLocation, setOpenAddLocation] = useState(false);
	const [position, setPosition] = useState({ lat: 0, lng: 0 });
	const [selectedData, setSelectedData] = useState<any>();
	const { locationData, isLoading, setLocationData } = useGetLocations(userInfo?.id);
	const handleEdit = (cell: GridCellParams) => {
		setOpenMap(!openMap);
		setPosition({ lat: cell.row.lat, lng: cell.row.long });
		setSelectedData(cell.row);
	};
	const handleDelete = async (cell: GridCellParams) => {
		const cellId = +cell.row.id;
		const response = await trainingClient.delete(`/locations/${cellId}`);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/locations/${userInfo?.id}`);
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
		{ field: "name", headerName: `${t("table.location.name")}`, headerAlign: "center", width: 150, align: "center" },
		{ field: "lat", headerName: `${t("table.location.latitude")}`, headerAlign: "center", type: "number", width: 100, align: "center" },
		{ field: "long", headerName: `${t("table.location.longitude")}`, headerAlign: "center", type: "number", width: 100, align: "center" },
		{ field: "date", headerName: `${t("table.location.date")}`, headerAlign: "center", type: "date", width: 100, align: "center" },
		{
			field: "edit", headerName: `${t("table.edit")}`, headerAlign: "center", align: "center", renderCell: (param: GridCellParams) => {
				return <EditIcon sx={{ cursor: `${cursor}` }} onMouseEnter={changeCursor} onClick={() => handleEdit(param)} />;
			}
		},
		{
			field: "delete", headerName: `${t("table.delete")}`, headerAlign: "center", align: "center", renderCell: (param: GridCellParams) => {
				return <DeleteIcon sx={{ cursor: `${cursor}` }} onMouseEnter={changeCursor} onClick={() => handleDelete(param)} />;
			}
		},

	];
	return <>
		<p>Welcome {userInfo?.email} </p>
		<CustomButton title={"Add Location"} type={"button"} color={"inherit"} onClick={()=>{setOpenAddLocation(true);}}/>
		{isLoading ? <CircularProgress /> : <Table datepicker={true} height={400} width={800} margin={15} columns={headers} rows={locationData ? locationData : []} />}		
		<ModalContainer callBackData={setLocationData} data={selectedData} position={{ lat: position.lat, lng: position.lng }} open={openMap} setOpen={setOpenMap} page='location' />
		<ModalContainer callBackData={setLocationData} position={{ lat: 0, lng: 0 }} open={openAddLocation} setOpen={setOpenAddLocation} page="addLocation" />

	</>;
};



