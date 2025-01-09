import {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { IconType } from 'react-icons';
import { CSSProperties } from '@mui/styled-engine-sc';
import { TooltipProps } from '@mui/material';
import WidthContext from '@/context/WidthContext';


interface ActionType {
    icon:React.ReactElement,
    name:string
    ClickHendler:(e:React.MouseEvent<HTMLDivElement>) => void
}

type SpeedDailPositionsType = 
  | { top: CSSProperties['top']; bottom?: CSSProperties['bottom']; left: CSSProperties['left']; right?: CSSProperties['right'] }
  | { top: CSSProperties['top']; bottom?: CSSProperties['bottom']; right: CSSProperties['right']; left?: CSSProperties['left'] }
  | { bottom: CSSProperties['bottom']; top?: CSSProperties['top']; left: CSSProperties['left']; right?: CSSProperties['right'] }
  | { bottom: CSSProperties['bottom']; top?: CSSProperties['top']; right: CSSProperties['right']; left?: CSSProperties['left'] };


interface SpeedDialWrapPropsType {
    actions:ActionType[]
    positions:SpeedDailPositionsType
    direction?:'down'| 'left'| 'right' | 'up'
    openToolTip?:boolean
    openToolTipPlacement?: TooltipProps['placement'];
    mainIcon?:JSX.Element
    itemSize?:"small" | "large" | "medium"
}



export default function SpeedDialWrap({mainIcon,itemSize,actions,positions,direction,openToolTip,openToolTipPlacement}:SpeedDialWrapPropsType) {
     const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  
  return (
    <Box>
      <SpeedDial
        direction={direction?? "up"}
        ariaLabel="Tabs SpeedDial"
        
        sx={{ 
           position: 'fixed',
           top: positions.top ,
           left: positions.left ,
           bottom: positions.bottom,
           right:positions.right,
           zIndex:9,
           scale:!sm?0.7:1
            }}
           icon={mainIcon}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen={openToolTip}
            tooltipPlacement={openToolTipPlacement}
            slotProps={{tooltip:{style:{background:"gray"}}}}
            FabProps={{size:itemSize?? 'large'}}
            onClick={action.ClickHendler}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
