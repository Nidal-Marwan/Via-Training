import DriverModal from "../Modal/DriverModal/DriverModal";
import { AddLocationModal } from "../Modal/LocationModel/AddLocationModal";
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
	open: boolean;
	setOpen: (state: boolean) => void;
}

export const ModalContainer = ({ page, position, data, callBackData, open, setOpen }: ModalProps) => {
	let content;
	if (page === "login") {
		content = <LoginModal open={open} setOpen={setOpen} />;
	} else if (page === "location" && position) {
		content = <LocationModal callBackData={callBackData} data={data} position={position} open={open} setOpen={setOpen} />;
	} else if (page === "drivers") {
		content = <DriverModal data={data} open={open} setOpen={setOpen} />;
	} else if (page === "addLocation" && position) {
		content = <AddLocationModal callBackData={callBackData} position={position} open={open} setOpen={setOpen} />;
	}
	return (
		<>
			{content}
		</>
	);
};
