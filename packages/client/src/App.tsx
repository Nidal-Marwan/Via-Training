import { useState } from 'react';

import Table from './common/components/Table';

import { useTranslation } from 'react-i18next';
import languages from './common/localization/languages';

import cookies from 'js-cookie';

import { Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';

export const App = () => {
	const { t, i18n } = useTranslation();
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
	const headers = [
		{ field: 'name', headerName: 'Name', width: 150 },
		{ field: 'lat', headerName: 'Latitude', type: 'number', width: 100 },
		{ field: 'long', headerName: 'Longitude', type: 'number', width: 100 },
		{ field: 'date', headerName: 'Date', type: 'date', width: 150 },
	];
	const data = [{id:1, name: 'London', lat: 35.3, long: 35.3, date: new Date()  }];
	return (
		<>
			<Select onChange={handleChange} value={language}>
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
			<Box>{t('app.sekeleton')}</Box>
			<Table columns={headers} rows={data}/>
		</>
	);
};
