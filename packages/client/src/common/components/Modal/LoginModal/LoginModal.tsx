import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { Button, Divider, Typography } from "@mui/material";
import { ModalBox, ActionsBox } from "./LoginModal.styles";

export const LoginModal = () =>{
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(true);
	const handleClose = () => {
		setShowModal(false);
	};
	const onAccept = () => {
		handleClose();
		navigate("locations");
	};
	const onCancel = () => {
		handleClose();
		
	};
	return 	<Modal
		open={showModal}
		onAccept={onAccept}
		onCancel={onCancel}
	>
		<ModalBox>
			<Typography id='modal-modal-title' variant='h6' component='h2'>
				{t("modal.favorites.message")}
			</Typography>
			<Divider />
			<ActionsBox>
				<Button variant='contained' onClick={onAccept}>
					{t("modal.favorites.accept")}
				</Button>
				<Button variant='outlined' onClick={onCancel}>
					{t("modal.favorites.decline")}
				</Button>
			</ActionsBox>
		</ModalBox>
	</Modal>;
};