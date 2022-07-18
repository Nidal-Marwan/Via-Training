import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { Button, Divider, Typography } from "@mui/material";
import { ModalBox, ActionsBox } from "./LoginModal.styles";
import { bindActionCreators } from "redux";
import { useAppDispatch } from "../../../../redux/Reducers/reducers";
import * as modalActionCreators from "../../../../redux/Actions/Modal/modalActionsCreators";

interface LoginModalProps {
	open: boolean;
	setOpen: (state: boolean) => void;
}
export const LoginModal = ({ open, setOpen }: LoginModalProps) => {
	const dispatch = useAppDispatch();
	const {setClose} = bindActionCreators(modalActionCreators,dispatch);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleClose = () => {
		setOpen(false);
		dispatch(setClose());
	};
	const onAccept = () => {
		navigate("locations");
		handleClose();
	};
	const onCancel = () => {
		navigate("liveMap");
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