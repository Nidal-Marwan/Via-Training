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
import CloseIcon from "@mui/icons-material/Close";
import {userSelector} from "../../../../redux/Actions/User/user.selector";
import { userState } from "../../../../redux/Reducers/userReducer";
import { State } from "../../../../redux/Reducers/reducers";
import { connect } from "react-redux";

interface DriverModalProps {
	data?: {
		id: number,
		name: string,
		phone: number,
		carModel: string,
		licensePlate: string,
		locationId: number
	};
	open: boolean;
	setOpen: (state: boolean) => void;
	callBackData: any;
	locationData: any;
	buttonType: any;
	user?:userState
}
const DriverModal =({ data, open, setOpen, callBackData, locationData, buttonType,user }: DriverModalProps) => {
	const { t } = useTranslation();
	const [error, setError] = useState<string | null>(null);
	const handleClose = () => {
		setOpen(false);
	};
	const onCancel = () => {
		handleClose();
	};

	const initialValues = {
		name: "",
		phone: "",
		carModel: "",
		licensePlate: "",
		locationId: "",
	}; 
	
	const editValues = {
		name: data?.name,
		phone: data?.phone,
		carModel: data?.carModel,
		licensePlate: data?.licensePlate,
		locationId: data?.locationId,
	};

	const handleSubmit = async(values: any) => {
		const payload = { ...values, userId: user?.id, id: data?.id };
		if(buttonType === "button"){
			const response = await trainingClient.put("/drivers", payload);
			if (response.data.status === 200) {
				const response = await trainingClient.get(`/drivers/${user?.id}`);
				if (response.data.status === 200) {
					callBackData(response.data.drivers.driversInfo);
				}
				handleClose();
			}
		}else{
			const response = await trainingClient.post("/drivers", payload);
			if (response.data.status === 200) {
				const response = await trainingClient.get(`/drivers/${user?.id}`);
				if (response.data.status === 200) {
					callBackData(response.data.drivers.driversInfo);
				}
				handleClose();
			}
		}
	};

	return (
		<Modal open={open} onCancel={onCancel}>
			<ModalBox>
				{buttonType === "button" ? <Typography variant="h4" >{t("drivers.modal.editTitle")}</Typography> : <Typography variant="h4" >{t("drivers.modal.addTitle")}</Typography>}
				
				<Divider style={{ width: "90%" }} />
				<Formik
					initialValues={ buttonType === "button" ? editValues : initialValues}
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
							name="locationId"
							label={t("drivers.modal.form.location")}
						>
							<MenuItem key={0} value={0}>{"No location"}</MenuItem>
							{locationData?.map((item: { id: number, name: string; }) => (
								<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
							))}
						</SelectInput>
						<ActionsBox>
							<CustomButton
								color='primary'
								title={t("drivers.modal.actions.submit")}
								type={"submit"}
							/>
							<Button variant="outlined" onClick={onCancel}>{t("drivers.modal.actions.cancel")}</Button>
						</ActionsBox>
					</StyledForm>
				</Formik>
			</ModalBox>
		</Modal >
	);
};

const mapState = (state:State)=>{
	return{
		user: userSelector(state)
	};
};

export default connect(mapState)(DriverModal);