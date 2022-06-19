import { Modal, Box, Typography, Button, Divider } from '@mui/material';
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
	declineText: string;
	open: boolean;
	accept: () => void;
	decline: () => void;
}

export default function ModalComponent(props: ModalProps) {
	return (
		<div>
			<Modal
				open={props.open}
				onClose={props.decline}
				aria-labelledby='modal-modal-title'
			>
				<ModalBox>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{props.message}
					</Typography>
					<Divider />
					<ActionsBox>
						<Button variant='contained' onClick={props.accept}>
							{props.acceptText}
						</Button>
						<Button variant='outlined' onClick={props.decline}>
							{props.declineText}
						</Button>
					</ActionsBox>
				</ModalBox>
			</Modal>
		</div>
	);
}
