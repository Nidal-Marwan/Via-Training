import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { Box, Button, Divider, TextField, Typography, Input } from "@mui/material";
import { Map } from "../../Map/Map";
import { trainingClient } from "../../../api/trainingClient";
import { ModalBox, MapBox, ActionsBox } from "./LocationModal.styles";
import { format } from "date-fns";
import { userSelector } from "../../../../redux/Actions/User/user.selector";
import { useSelector } from "react-redux";
import LocationTableModal from "../../Table/LocationTableModal";
interface LocationProps {
	position: {
		lat: number,
		lng: number;
	},
	callBackData: any;
	open: boolean;
	setOpen: (state: boolean) => void;
}

export const AddLocationModal = ({ position, callBackData, open, setOpen }: LocationProps) => {
	const userInfo = useSelector(userSelector);
	const { t } = useTranslation();
	const [locationInfo, setLocationInfo] = useState({ lat: position.lat, lng: position.lng });
	const [locationName, setLocationName] = useState("");
	const date = new Date();
	const formattedDate = format(date, "yyyy-MM-dd H:mm:ss");
	const handleClose = () => {
		setOpen(false);
		setLocationInfo({ lat: 0, lng: 0 });
		setLocationName("");
	};
	const onAccept = async () => {
		const payload = { name: locationName, lat: locationInfo.lat, long: locationInfo.lng, date: formattedDate, userId: userInfo.id };
		const response = await trainingClient.post("/locations", payload);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/locations/${userInfo.id}`);
			if (response.data.status === 200) {
				callBackData(response.data.data);
			}
		}
		handleClose();
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
				{t("modal.location.addMessage")}
			</Typography>
			<Divider />
			<MapBox>
				<Map modalCallback={handleCallback} position={position} />
				<Box>
					<LocationTableModal 
						setLocationName={setLocationName}
						lat={Number(locationInfo.lat.toFixed(3))}
						lng={Number(locationInfo.lng.toFixed(3))}
					/>
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
