import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Map } from "../../Map/Map";
import Table from "../../Table/Table";
import { trainingClient } from "../../../api/trainingClient";
import { ModalBox, MapBox, ActionsBox } from "./LocationModal.styles";
import { GridCellParams } from "@mui/x-data-grid";
import { userSelector } from "../../../../redux/Actions/User/user.selector";

interface LocationProps {
	position: {
		lat: number,
		lng: number;
	},
	data?: {
		id: number,
		name: string,
		lat: number,
		long: number;
		date: Date;
	};
	callBackData: any;
	open: boolean;
	setOpen: (state: boolean) => void;
}

export const LocationModal = ({ position, data, callBackData, open, setOpen }: LocationProps) => {
	const user = userSelector();
	const { t } = useTranslation();
	const [locationInfo, setLocationInfo] = useState({ lat: data?.lat, lng: data?.long });
	const [locationName, setLocationName] = useState(data?.name);
	const row = [{
		id: data?.id,
		name: data?.name,
		lat: locationInfo.lat,
		long: locationInfo.lng,

	}];
	const column = [
		{
			field: "name", headerName: "Name", headerAlign: "center", width: 150, align: "center", renderCell: (params: GridCellParams) => (
				<TextField
					onChange={(e) => setLocationName(e.target.value)}
					autoFocus
					defaultValue={params.row.name}
					variant="standard"
				/>
			),
		},
		{ field: "lat", headerName: "Latitude", headerAlign: "center", type: "number", width: 100, align: "center" },
		{ field: "long", headerName: "Longitude", headerAlign: "center", type: "number", width: 100, align: "center" }
	];
	const handleClose = () => {
		setOpen(false);
	};
	const onAccept = async () => {
		const payload = { id: data?.id, name: locationName, lat: locationInfo.lat, long: locationInfo.lng, date: data?.date, userId: user.id };
		const response = await trainingClient.put("/locations", payload);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/locations/${user.id}`);
			if (response.data.status === 200) {
				callBackData(response.data.data);
			}
			handleClose();
		}
	};
	const onCancel = () => {
		handleClose();

	};
	const handleCallback = (lat: number, lng: number) => {
		setLocationInfo({ lat, lng });
	};
	return <Modal
		open={open}
		onCancel={onCancel}
	>
		<ModalBox>
			<Typography sx={{ textAlign: "center" }} id='modal-modal-title' variant='h6' component='h2'>
				{t("modal.location.editMessage")}
			</Typography>
			<Divider />
			<MapBox>
				<Map modalCallback={handleCallback} position={position} />
				<Box>
					<Table height={170} width={400} margin={15} columns={column} rows={row} />
					<ActionsBox>
						<Button variant='contained' onClick={onAccept}>
							{t("modal.location.accept")}
						</Button>
						<Button variant='outlined' onClick={onCancel}>
							{t("modal.location.decline")}
						</Button>
					</ActionsBox>
				</Box>

			</MapBox>


		</ModalBox>
	</Modal>;
};
