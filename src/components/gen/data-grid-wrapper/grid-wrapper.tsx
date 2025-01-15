import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef , GridRowModes, GridRowsProp, GridValidRowModel} from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GRID_DEFAULT_HEBROW_TEXT} from './grid-loc-texts';
import WidthContext from '@/context/WidthContext';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';



const rowsData :GridRowsProp = [
  { id: 1, lastName: 'אלמוג', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },

];



const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'תור 1', align:'right' , width: 150  },
    { field: 'firstName', headerName: 'תור 2', align:'right', width: 150 },
    { field: 'age', headerName: 'תור 3', align:'right', width: 150 },
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