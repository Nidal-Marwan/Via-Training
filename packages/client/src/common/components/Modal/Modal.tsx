import {Modal as MuiModal} from "@mui/material";
interface ModalProps {
	open: boolean;
	onAccept: () => void;
	onCancel: () => void;
	children:React.ReactElement;
}

export default function Modal(props: ModalProps) {
	return (
		<div>
			<MuiModal
				open={props.open}
				onClose={props.onCancel}
				aria-labelledby='modal-modal-title'
			>
				{props.children}
			</MuiModal>
		</div>
	);
}
