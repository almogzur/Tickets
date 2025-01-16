import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef , GridRowModes, GridRowsProp, GridValidRowModel} from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GRID_DEFAULT_HEBROW_TEXT} from './grid-loc-texts';
import WidthContext from '@/context/WidthContext';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';



const rowsData :GridRowsProp = [
  { id: 1, eventName: 'אלמוג', date: 'Jon', price: 14 },
  { id: 2, eventName: 'Lannister', date: 'Cersei', price: 31 },
  { id: 3, eventName: 'Lannister', date: 'Jaime', price: 31 },
  { id: 4, eventName: 'Stark', date: 'Arya', price: 11 },
  { id: 5, eventName: 'Targaryen', date: 'Daenerys', price: null },
  { id: 6, eventName: 'Melisandre', date: null, price: 150 },
  { id: 7, eventName: 'Clifford', date: 'Ferrara', price: 44 },
  { id: 8, eventName: 'Frances', date: 'Rossini', price: 36 },
  { id: 9, eventName: 'Roxie', date: 'Harvey', price: 65 },

];



const columns: GridColDef[] = [
    { field: 'eventName', headerName: 'שם', align:'right' , width: 150  },
    { field: 'date', headerName: 'תאריך', align:'right', width: 150 },
    { field: 'price', headerName: 'מחיר', align:'right', width: 150 },
    //{
    //    field: 'actions',
    //    type: 'actions',
    //    headerName: 'Actions',
    //    width: 100,
    //    cellClassName: 'actions',
    //   getActions: ({ id }) => {[]},
    //},

  ];
interface DataGridWrapType  {
    columnsData?:GridColDef
    rowsData?:  GridRowsProp 
}

export default function DataGridWrap({}:DataGridWrapType) {

            const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
            const [rows, setRows] = React.useState(rowsData);
            const [rowModesModel, setRowModesModel] = React.useState({});



  
    
  return (
    <Container>
    <Box 
        sx={{ height: 400, width: '100%' , background:grey[200] ,mt:5}}>
      <DataGrid 
        sx={{direction:'rtl' , fontSize:!sm? 11 :14}}
        localeText={GRID_DEFAULT_HEBROW_TEXT}
        rows={ rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}

        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick

      />
    </Box>
    </Container>
  );
}