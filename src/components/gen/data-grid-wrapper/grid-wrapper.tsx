import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef , GridRowModes, GridRowsProp, GridValidRowModel} from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GRID_DEFAULT_HEBROW_TEXT} from './grid-loc-texts';
import WidthContext from '@/context/WidthContext';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useContext,useState } from 'react';


interface DataGridWrapType  {
    columnsData?:GridColDef[] |undefined
    rowsData?:  GridRowsProp 
    
}

const DataGridWrap = ({columnsData,rowsData}:DataGridWrapType) => {

      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      const [rowModesModel, setRowModesModel] = useState({});
  
  return (
    <Container>
    <Box 
        sx={{ height: 400, width: '100%' , background:grey[200] ,mt:5}}>
      <DataGrid 
        sx={{direction:'rtl' , fontSize:!sm? 11 :14}}
        localeText={GRID_DEFAULT_HEBROW_TEXT}
        rows={rowsData}
        columns={columnsData?? []}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        rowSelection={false}
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
        isCellEditable={(params)=> false}
        isRowSelectable={(params)=>false}
        hideFooterSelectedRowCount
        disableColumnSelector
        
 
      />
    </Box>
    </Container>
  );
}
export default DataGridWrap