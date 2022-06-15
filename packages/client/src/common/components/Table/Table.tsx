import { useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface Data {
	columns: any[];
	rows: any[];
	checkbox?: boolean;
	datepicker?: boolean;
}

function Table(props: Data) {
	const columns: GridColDef[] = props.columns;

	const [date, setDate] = useState<Date | null>(null);
	const [rows, setRows] = useState(props.rows);

	return (
		<div style={{ height: 400, width: 800, margin: 15 }}>
			{props.datepicker && (
        <>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						value={date}
						views={['year', 'month', 'day']}
            inputFormat="dd/MM/yyyy"
            label="Pick a date"
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
        <IconButton aria-label='reset' size='large' onClick={()=>{
					setDate(null);
          setRows(props.rows);
        }}>
            <RestartAltIcon fontSize='inherit'/>
        </IconButton>
        </>
			)}
			<DataGrid
				columns={columns}
				rows={rows}
				checkboxSelection={props.checkbox}
				rowsPerPageOptions={[]}
			/>
		</div>
	);
}

export default Table;
