import {
	Modal as MuiModal,
	Box,
	Typography,
	Button,
	Divider,
} from '@mui/material';
import { styled } from '@mui/system';

const ModalBox = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: '#fff',
	boder: '2px solid #000',
	boxShadow: '24',
	p: 4,
	outline: 0,
	padding: 15,
	borderRadius: '2px',
});

const ActionsBox = styled(Box)({
	marginTop: 30,
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '10px',
	'& > *': {
		flexBasis: 100,
	},
});
interface ModalProps {
	message: string;
	acceptText: string;
	cancelText: string;
	open: boolean;
	onAccept: () => void;
	onCancel: () => void;
}

export default function Modal(props: ModalProps) {
	return (
		<div>
			<MuiModal
				open={props.open}
				onClose={props.onCancel}
				aria-labelledby='modal-modal-title'
			>
				<ModalBox>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{props.message}
					</Typography>
					<Divider />
					<ActionsBox>
						<Button variant='contained' onClick={props.onAccept}>
							{props.acceptText}
						</Button>
						<Button variant='outlined' onClick={props.onCancel}>
							{props.cancelText}
						</Button>
					</ActionsBox>
				</ModalBox>
			</MuiModal>
		</div>
	);
}
