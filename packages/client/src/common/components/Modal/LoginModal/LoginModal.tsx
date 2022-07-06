import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { Button, Divider, Typography } from "@mui/material";
import { ModalBox, ActionsBox } from "./LoginModal.styles";

interface LoginModalProps {
	open: boolean;
	setOpen: (state: boolean) => void;
	setShownModal: (state: boolean) => void;
}
export const LoginModal = ({ open, setOpen, setShownModal }: LoginModalProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleClose = () => {
		setOpen(false);
		setShownModal(true);
	};
	const onAccept = () => {
		navigate("locations");
		handleClose();
	};
	const onCancel = () => {
		navigate("drivers");// Temporarily until we have live map
		handleClose();
	};
	return <Modal
		open={open}
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