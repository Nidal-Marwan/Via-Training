import Table from "../../common/components/Table/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { GridCellParams } from "@mui/x-data-grid";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { trainingClient } from "../../common/api/trainingClient";
import { CustomButton } from "../../common/components/Button/Button";
import { DriversInfo, LocationInfo, useGetDrivers } from "../../common/hooks/useGetDrivers.hook";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/Actions/User/user.selector";

export const Drivers = () => {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const userInfo = useSelector(userSelector);
	const [cursor, setCursor] = useState("auto");
	const [selectedData, setSelectedData] = useState<DriversInfo>();
	const { rowData, driverLocationData, setRowData } = useGetDrivers(userInfo.id);
	const { locationData } = useGetLocations(userInfo.id);
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
			const response = await trainingClient.get(`/drivers/${userInfo.id}`);
			if (response.data.status === 200) {
				setRowData(response.data.drivers.driversInfo);
			}
			if (response.data.status === 204) {
				setRowData([]);
			}
		}
	};

	const getLocationFromId = () => {
		driverLocationData?.map((location: LocationInfo) => {
			rowData?.map((item: DriversInfo) => {
				if (item.locationId === location.id){
					item.locationName = location.name;
				}
			});
		});
	};
	useEffect(()=>{
		getLocationFromId();
	},[rowData]);
	
	const changeCursor = () => {
		setCursor("pointer");
	};

	const headers = [
		{ field: "name", headerName: `${t("table.driver.name")}`, headerAlign: "center", width: 150, align: "center" },
		{ field: "phone", headerName: `${t("table.driver.phone")}`, headerAlign: "center", type: "number", width: 150, align: "center" },
		{ field: "carModel", headerName: `${t("table.driver.carModel")}`, headerAlign: "center", width: 150, align: "center" },
		{ field: "licensePlate", headerName: `${t("table.driver.licensePlate")}`, headerAlign: "center", width: 150, align: "center" },
		{ field: "locationName", headerName: `${t("table.driver.location")}`, headerAlign: "center", width: 150, align: "center" },
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
		<p>Welcome {userInfo.email} </p>
		<CustomButton title={t("drivers.modal.addDriverButton")} type={"button"} color={"inherit"} onClick={handleClick} />
		<Table datepicker={true} height={400} width={950} margin={15} columns={headers} rows={rowData ? rowData : []} />
		<ModalContainer callBackData={setRowData} buttonType={buttonType} data={selectedData} locationData={locationData} page="drivers" open={openModal} setOpen={setOpenModal} />

	</>;
};
export default Drivers;
