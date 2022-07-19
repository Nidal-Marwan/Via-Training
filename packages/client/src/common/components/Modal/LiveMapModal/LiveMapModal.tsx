import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { Button, Divider, Typography } from "@mui/material";
import { ModalBox, ActionsBox } from "./LiveMapModal.styles";
import { bindActionCreators } from "redux";
import { useAppDispatch } from "../../../../redux/Reducers/reducers";
import * as modalActionCreators from "../../../../redux/Actions/Modal/modalActionsCreators";
import { useEffect } from "react";

interface LiveMapModalProps {
	open: boolean;
	setOpen: (state: boolean) => void;
	setPosition: any;
}
export const LiveMapModal = ({ open, setOpen, setPosition }: LiveMapModalProps) => {
	const dispatch = useAppDispatch();
	const { setClose } = bindActionCreators(modalActionCreators, dispatch);
	const { t } = useTranslation();

	const handleClose = () => {
		setOpen(false);
		dispatch(setClose());
	};

	const onAccept = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			setPosition({ lat, lng });
		});
		handleClose();
	};
	const onCancel = () => {
		handleClose();
	};
	return <Modal
		open={open}
		onCancel={onCancel}
	>
		<ModalBox>
			<Typography id='modal-modal-title' variant='h6' component='h2'>
				{t("modal.liveMap.message")}
			</Typography>
			<Divider />
			<ActionsBox>
				<Button variant='contained' onClick={onAccept}>
					{t("modal.liveMap.accept")}
				</Button>
				<Button variant='outlined' onClick={onCancel}>
					{t("modal.liveMap.decline")}
				</Button>
			</ActionsBox>
		</ModalBox>
	</Modal>;
};