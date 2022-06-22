import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	MenuItem,
	Menu,
} from '@mui/material';
import { StyledToolBar, StyledBox } from './NavBar.style';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export const NavBar: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Box>
			<AppBar color='secondary' position='static'>
				<StyledToolBar>
					<StyledBox>
						<MenuItem>
							<Typography variant='h6' component='div'>
								<Link to='liveMap'>{t('nav.map')}</Link>
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='h6' component='div'>
								<Link to='drivers'> {t('nav.driver')}</Link>
							</Typography>
						</MenuItem>
						<MenuItem>
							<Typography variant='h6' component='div'>
								<Link to='locations'> {t('nav.location')}</Link>
							</Typography>
						</MenuItem>
					</StyledBox>
					<LanguageSelector />
				</StyledToolBar>
			</AppBar>
		</Box>
	);
};
