import { useState } from "react";
import Modal from "../Modal";
import { ActionsBox, ModalBox, StyledForm } from "./DriverModal.styles";
import { Formik, } from "formik";
import driverSchema from "./DriverModal.schema";
import { TextInput } from "../../TextInput/TextInput";
import { Button, Divider, MenuItem, Typography, IconButton, Alert } from "@mui/material";
import { SelectInput } from "../../SelectInput/SelectInput";
import { CustomButton } from "../../Button/Button";
import { useTranslation } from "react-i18next";
import { trainingClient } from "../../../api/trainingClient";
import { useMe } from "../../../hooks/useMe.hook";
import CloseIcon from "@mui/icons-material/Close";


interface DriverModalProps {
	data: any[];
	setOpen: any;
}
export default function DriverModal(props: DriverModalProps) {
	const { t } = useTranslation();
	const { userInfo } = useMe();
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(true);

	const handleClose = () => {
		setShowModal(false);
		props.setOpen(false);
	};
	const onCancel = () => {
		handleClose();
	};

	const initialValues = {
		name: "",
		phone: "",
		carModel: "",
		licensePlate: "",
		location: "",
	};
	const handleSubmit = async (values: any) => {
		const payload = { ...values, locationId: location, userId: userInfo?.user.userInfo.id };
		const response = await trainingClient.post("/drivers", payload);
		if (response.data.status === 409) {
			setError(response.data.message);
		}
		if (response.data.status === 200) {
			handleClose();
		}
	};

	return (

		<Modal open={showModal} onCancel={onCancel}>
			<ModalBox>
				<Typography variant="h4" >{t("drivers.modal.title")}</Typography>
				<Divider style={{ width: "90%" }} />
				<Formik
					initialValues={initialValues}
					validationSchema={driverSchema}
					onSubmit={handleSubmit}
					validateOnChange={false}
				>
					<StyledForm>
						{error && (
							<Alert
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										onClick={() => {
											setError(null);
										}}
									>
										<CloseIcon fontSize="inherit" />
									</IconButton>
								}
								severity='error'>
								{t(`${error}`)}
							</Alert>
						)}
						<TextInput
							name="name"
							type="text"
							id='outlined-basic'
							label={t("drivers.modal.form.name")}
						/>
						<TextInput
							name="phone"
							type="number"
							id='outlined-basic'
							label={t("drivers.modal.form.phone")}
						/>
						<TextInput
							name="carModel"
							type="text"
							id='outlined-basic'
							label={t("drivers.modal.form.car_model")}
						/>
						<TextInput
							name="licensePlate"
							type="text"
							id='outlined-basic'
							label={t("drivers.modal.form.license_plate")}
						/>
						<SelectInput
							name="location"
							label={t("drivers.modal.form.location")}
						>
							{props.data.map((item: { id: number, name: string; }) => (
								<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
							))}
						</SelectInput>
						<ActionsBox>
							<CustomButton
								color='primary'
								title={t("drivers.modal.actions.submit")}
								type='submit'
							/>
							<Button variant="outlined" onClick={onCancel}>{t("drivers.modal.actions.cancel")}</Button>
						</ActionsBox>
					</StyledForm>

				</Formik>

			</ModalBox>
		</Modal >
	);
}