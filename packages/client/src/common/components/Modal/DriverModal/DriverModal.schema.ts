import * as Yup from "yup";

const driverSchema = Yup.object({
	name: Yup.string().required("drivers.modal.errors.name"),
	phone: Yup.number()
		.required("drivers.modal.errors.phone.required")
		.min(10, "drivers.modal.errors.phone.min"),
	carModel: Yup.string().required("drivers.modal.errors.car_model"),
	licensePlate: Yup.string().required("drivers.modal.errors.license_plate"),
	location: Yup.number().required("drivers.modal.errors.location")
});

export default driverSchema;