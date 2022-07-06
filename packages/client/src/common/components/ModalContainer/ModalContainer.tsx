import DriverModal from "../Modal/DriverModal/DriverModal";
import { LocationModal } from "../Modal/LocationModel/LocationModal";
import { LoginModal } from "../Modal/LoginModal/LoginModal";
interface ModalProps {
	page: string,
	position?: {
		lat: number,
		lng: number;
	},
	data?: {
		id: number,
		name: string,
		lat: number,
		long: number;
		date: Date;
	} | any;
	callBackData?: any;
	setOpen?: any;
	locationData?: any;
	buttonType?: any;
}

export const ModalContainer = ({ page, position, data, callBackData, setOpen, locationData, buttonType }: ModalProps) => {
	let content;
	if (page === "login") {
		content = <LoginModal />;
	} else if (page === "location" && position) {
		content = <LocationModal callBackData={callBackData} data={data} position={position} />;
	} else if (page === "drivers") {
		content = <DriverModal buttonType={buttonType} callBackData={callBackData} data={data} locationData={locationData} setOpen={setOpen} />;
	}
	return (
		<>
			{content}
		</>
	);
};
