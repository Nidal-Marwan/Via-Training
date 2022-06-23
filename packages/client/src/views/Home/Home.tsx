import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Login from '../../common/components/Login/login';
import MapImg from '../../assets/images/maps.png';

export const Home: React.FC = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
			}}
		>
			<Box>
				<Box
					component='img'
					sx={{ width: '50%' }}
					src={MapImg}
					alt='Google-Maps'
				/>

				<Box>
					<Typography
						sx={{ fontSize: '1.7rem', textAlign: 'center', width: '60%' }}
					>
						Welcome to the google-map dashboard, You can add your favourite
						locations and assign drivers.
					</Typography>
				</Box>
			</Box>
			<Login />
		</Container>
	);
};
