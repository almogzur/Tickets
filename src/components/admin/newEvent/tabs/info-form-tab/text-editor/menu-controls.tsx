import { Typography, useTheme } from "@mui/material";
import {
  MenuButtonAddTable,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonStrikethrough,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
MenuButtonUnderline,
  isTouchDevice,
} from "mui-tiptap";

export default function EditorMenuControls() {
  const theme = useTheme();
  return (
 
    <MenuControlsContainer debounced={true}  >

        
      <MenuSelectFontFamily
        tooltipTitle="פונט"
        unsetOptionLabel
        hideUnsetOption
        emptyLabel={<Typography> פונט </Typography>}
        options={[
          {label:"פונט",value:""},
          { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
          { label: "Cursive", value: "cursive" },
          { label: "Monospace", value: "monospace" },
          { label: "Serif", value: "serif" },
        ]}
      />

      <MenuDivider />

      <MenuSelectHeading 
          tooltipTitle="פיסקה" 
            labels={{paragraph:<Typography>גודל פיסקה </Typography>}}
                    
          
 />

      <MenuDivider  />

      <MenuSelectFontSize tooltipTitle="גודל טסקס" />
      <MenuButtonUnderline/>

      <MenuDivider />

      <MenuButtonBold />

      <MenuButtonItalic />


      <MenuButtonStrikethrough />


      <MenuDivider />

      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />

      <MenuDivider />

      <MenuSelectTextAlign />

      <MenuDivider />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      <MenuButtonTaskList />

      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />


      <MenuButtonCode />


      <MenuDivider />

      <MenuButtonHorizontalRule />

      <MenuButtonAddTable />

      <MenuDivider />


      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />

    </MenuControlsContainer>
   

  );
}
