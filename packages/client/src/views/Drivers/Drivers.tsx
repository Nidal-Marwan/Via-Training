import { Button, CircularProgress } from "@mui/material";
import { userInfo } from "os";
import { useState } from "react";
import { ModalContainer } from "../../common/components/ModalContainer/ModalContainer";
import { useGetLocations } from "../../common/hooks/useGetLocations.hook";
import { useAppSelector, State } from "../../redux/Reducers/reducers";


export default function Drivers() {
	const [openModal, setOpenModal] = useState(false);
	const user = useAppSelector((state:State)=>state.user);
	const { rowData, isLoading } = useGetLocations(user.id);
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
			<ModalContainer data={rowData} page="drivers" open={openModal} setOpen={setOpenModal} />
		</>
	);
}