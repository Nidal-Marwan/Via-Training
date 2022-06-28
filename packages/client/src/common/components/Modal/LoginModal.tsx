import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { styled } from '@mui/system';
import { Box, Button, Divider, Typography } from "@mui/material";

const ModalBox = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: '#fff',
	boder: '2px solid #000',
	boxShadow: '24',
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: '2px',
});
const ActionsBox = styled(Box)({
	marginTop: 30,
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '10px',
	'& > *': {
		flexBasis: 100,
	},
});

export const LoginModal = () =>{
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(true);

	const handleOpen = () => {
		setShowModal(true);
	};
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