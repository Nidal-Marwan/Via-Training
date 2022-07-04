import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { useMe } from "../../common/hooks/useMe.hook";

export default function Drivers() {
	const [openModal, setOpenModal] = useState(false);
	const { userInfo } = useMe();
	const { rowData, isLoading } = useGetLocations(userInfo?.user.userInfo.id);
	const handleClick = () => {
		setOpenModal(!openModal);
	};
	return (
		<>
			<p>Drivers page initializtion</p>
			{isLoading ?
				<CircularProgress />
				:
				<Button onClick={handleClick}>Add new driver</Button>
			}
			{openModal && <ModalContainer data={rowData} page="drivers" setOpen={setOpenModal} />}
		</>
	);
}