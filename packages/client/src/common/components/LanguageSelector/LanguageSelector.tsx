import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import languages from '../../localization/languages';
import cookies from 'js-cookie';
import { Box, MenuItem, Select, SelectChangeEvent, Icon } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export default function LanguageSelector() {
	const { i18n } = useTranslation();
	document.body.dir = i18n.dir();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		document.body.dir = i18n.dir();
	};

	const currentLanguageCode = cookies.get('i18next') || 'en';

	const [language, setLanguage] = useState(
		currentLanguageCode === 'en' ? 'English' : 'العربية'
	);
	const handleChange = (event: SelectChangeEvent) => {
		setLanguage(event.target.value);
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<Icon>
				<LanguageIcon />
			</Icon>
			<Select
				sx={{ backgroundColor: '#fff' }}
				onChange={handleChange}
				value={language}
			>
				{languages.map(({ code, name }) => (
					<MenuItem
						key={code}
						value={name}
						onClick={() => changeLanguage(code)}
					>
						{name}
					</MenuItem>
				))}
			</Select>
		</Box>
	);
}
