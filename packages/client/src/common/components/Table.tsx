import {DataGrid, GridColDef} from '@mui/x-data-grid';

interface Data {
	columns: any[];
  rows:any[];
}

function Table (props: Data){
 return (
  <div style={{ height: 400, width: 800 }}>
  <DataGrid
    rows={props.rows}
    columns={props.columns}
    checkboxSelection
    rowsPerPageOptions={[]}
  />
</div>
 )
};

export default Table;