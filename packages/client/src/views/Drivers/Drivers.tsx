import Table from "../../common/components/Table/Table";
import { useMe } from "../../common/hooks/useMe.hook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { trainingClient } from "../../common/api/trainingClient";
import { CircularProgress } from "@mui/material";
import { CustomButton } from "../../common/components/Button/Button";
import { useGetDrivers } from "../../common/hooks/useGetDrivers.hook";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { useTranslation } from "react-i18next";

export const Drivers = () => {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const { userInfo } = useMe();
	const [cursor, setCursor] = useState("auto");
	const [selectedData, setSelectedData] = useState<any>();
	const { rowData, driverLocationData, setRowData } = useGetDrivers(userInfo?.user.userInfo.id);
	const { locationData } = useGetLocations(userInfo?.user.userInfo.id);
	const [buttonType, setButtonType] = useState("submit");
	const handleEdit = (cell: GridCellParams) => {
		setOpenModal(!openModal);		
		setSelectedData(cell.row);
		setButtonType("button");
	};

	const handleClick = () => {
		setButtonType("submit");
		setOpenModal(!openModal);
	};
	const handleDelete = async (cell: GridCellParams) => {
		const cellId = +cell.row.id;
		const response = await trainingClient.delete(`/drivers/${cellId}`);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/drivers/${userInfo?.user.userInfo.id}`);
			if (response.data.status === 200) {
				setRowData(response.data.drivers.driversInfo);
			}
			if (response.data.status === 204) {
				setRowData([]);
			}
		}
	};
	const getLocationFromId = () => {
		driverLocationData?.map((location: any)=>{
			rowData?.map((item: any)=>{
				item.locationName = location[0].name;
			});
		});
	};
	getLocationFromId();
	const changeCursor = () => {
		setCursor("pointer");
	};
	const headers = [
		{ field: "name", headerName: "Name", headerAlign: "center", width: 150, align: "center" },
		{ field: "phone", headerName: "Phone", headerAlign: "center", type: "number", width: 150, align: "center" },
		{ field: "carModel", headerName: "Car Model", headerAlign: "center", width: 150, align: "center" },
		{ field: "licensePlate", headerName: "License Plate", headerAlign: "center", width: 150, align: "center" },
		{ field: "locationName", headerName: "Location", headerAlign: "center", width: 150, align: "center" },
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
		<CustomButton title={t("drivers.modal.addDriverButton")} type={"button"} color={"inherit"} onClick={handleClick}/>
		<Table datepicker={true} height={400} width={950} margin={15} columns={headers} rows={rowData ? rowData : []} />
		<ModalContainer callBackData={setRowData} buttonType={buttonType} data={selectedData} locationData={locationData} page="drivers" open={openModal} setOpen={setOpenModal} />

	</>;
};
export default Drivers;
