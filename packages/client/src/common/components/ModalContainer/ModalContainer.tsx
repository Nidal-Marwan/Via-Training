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
}

export const ModalContainer = ({ page, position, data, callBackData, setOpen }: ModalProps) => {
	let content;
	if (page === "login") {
		content = <LoginModal />;
	} else if (page === "location" && position) {
		content = <LocationModal callBackData={callBackData} data={data} position={position} />;
	} else if (page === "drivers") {
		content = <DriverModal data={data} setOpen={setOpen} />;
	}
	return (
		<>
			{content}
		</>
	);
};
