import { LocationModal } from "../Modal/LocationModel/LocationModal";
import { LoginModal } from "../Modal/LoginModal/LoginModal";
interface ModalProps {
	page: string,
	position?: {
		lat: number,
		lng: number
	},
	data?: {
		id: number,
		name: string,
		lat: number,
		long: number
		date: Date
	}
	callBackData?: any
}

export const ModalContainer = ({ page, position, data, callBackData }: ModalProps) => {
	let content;
	if (page === "login") {
		content = <LoginModal />;
	} else if (page === "location" && position) {
		content = <LocationModal callBackData={callBackData} data={data} position={position} />;
	}
	return (
		<>
			{content}
		</>
	);
};
