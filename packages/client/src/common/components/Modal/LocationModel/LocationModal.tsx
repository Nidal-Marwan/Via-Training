import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { Box, Button, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { Map } from "../../Map/Map";
import Table from "../../Table/Table";
import { trainingClient } from "../../../api/trainingClient";
import { ModalBox, MapBox, ActionsBox } from "./LocationModal.styles";
import { GridCellParams } from "@mui/x-data-grid";
import { userSelector } from "../../../../redux/Actions/User/user.selector";
import { useSelector } from "react-redux";
import { useMe } from "../../../hooks/useMe.hook";
import LocationTableModal from "../../Table/LocationTableModal";
interface LocationProps {
	position: {
		lat: number,
		lng: number;
	},
	data: {
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
	const userInfo = useSelector(userSelector);
	const { t } = useTranslation();
	const [locationInfo, setLocationInfo] = useState({ lat: data.lat, lng: data.long });
	const [locationName, setLocationName] = useState(data.name);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setLocationInfo({ lat: data.lat, lng: data.long });
		setLocationName(data.name);
		setIsLoading(true);
		const timer = setTimeout(() => setIsLoading(false), 600);
		return () => clearTimeout(timer);
	}, [data]);

	const handleClose = () => {
		setOpen(false);
	};

	const onAccept = async () => {
		const payload = { id: data.id, name: locationName, lat: locationInfo.lat, long: locationInfo.lng, date: data.date, userId: userInfo.id };
		const response = await trainingClient.put("/locations", payload);
		if (response.data.status === 200) {
			const response = await trainingClient.get(`/locations/${userInfo.id}`);
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
					<LocationTableModal 
						locationName={data?.name}
						setLocationName={setLocationName}
						lat={Number(locationInfo.lat?.toFixed(3))}
						lng={Number(locationInfo.lng?.toFixed(3))}
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
