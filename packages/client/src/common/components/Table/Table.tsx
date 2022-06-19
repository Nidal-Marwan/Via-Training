import { useState } from 'react';

import { DataGrid, GridColDef, arSD, enUS } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { useTranslation } from 'react-i18next';

import enLocale from 'date-fns/locale/en-GB';
import arLocale from 'date-fns/locale/ar-SA';
import { Box } from '@mui/material';

interface Data {
	columns: any[];
	rows: any[];
	checkbox?: boolean;
	datepicker?: boolean;
}

function Table(props: Data) {
	const { t, i18n } = useTranslation();

	const columns: GridColDef[] = props.columns;

	const [date, setDate] = useState<Date | null>(null);
	const [rows, setRows] = useState(props.rows);

	return (
		<Box style={{ height: 400, width: 800, margin: 15 }}>
			{props.datepicker && (
				<Box
					sx={{
						marginTop: 3,
						marginBottom: 1,
					}}
				>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={i18n.language === 'en' ? enLocale : arLocale}
					>
						<DatePicker
							value={date}
							views={['year', 'month', 'day']}
							inputFormat='dd/MM/yyyy'
							label={t('table.datepicker')}
							onChange={(newValue) => {
								setDate(newValue);
								setRows(
									props.rows.filter((row) => {
										let rowDate = new Date(row.date);
										rowDate.setHours(0, 0, 0, 0);
										newValue?.setHours(0, 0, 0, 0);
										return newValue?.valueOf() === rowDate.valueOf();
									})
								);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
					<IconButton
						aria-label='reset'
						size='large'
						onClick={() => {
							setDate(null);
							setRows(props.rows);
						}}
					>
						<RestartAltIcon
							fontSize='inherit'
							sx={{
								...(i18n.dir() === 'rtl' && {
									transform: 'scaleX(-1)',
								}),
							}}
						/>
					</IconButton>
				</Box>
			)}
			<DataGrid
				localeText={
					i18n.language === 'ar'
						? arSD.components.MuiDataGrid.defaultProps.localeText
						: enUS.components.MuiDataGrid.defaultProps.localeText
				}
				columns={columns}
				rows={rows}
				checkboxSelection={props.checkbox}
				rowsPerPageOptions={[]}
				pageSize={5}
			/>
		</Box>
	);
}

export default Table;
