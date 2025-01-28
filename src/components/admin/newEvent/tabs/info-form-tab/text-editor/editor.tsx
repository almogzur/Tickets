"use client"
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Stack as Flex , useTheme } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import {  useContext, useEffect, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./menu-controls";
import useExtensions from "./useExtensions";
import { grey } from "@mui/material/colors";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";

import DOMPurify from "isomorphic-dompurify";

import WidthContext from "@/context/WidthContext";


export default function Editor() {

  const theme  = useTheme()
  const extensions = useExtensions({
    placeholder: "הוסף טקסט",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const [submittedContent, setSubmittedContent] = useState("");
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const editor = rteRef.current?.editor;

useEffect(() => {
  if (!editor || editor.isDestroyed) {
    return;
  }
  if (!editor.isFocused || !editor.isEditable) {
    // Use queueMicrotask per https://github.com/ueberdosis/tiptap/issues/3764#issuecomment-1546854730
    queueMicrotask(() => {
      const currentSelection = editor.state.selection;
      editor
        .chain()
        .setContent(infoFileds.pre)
        .setTextSelection(currentSelection)
        .run();
    });
  }
}, [editor,  infoFileds.pre]);




  return (
      <Box
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
            "& .MuiCollapse-root":{
              background:grey[200]
            }, 
            "& .MuiBox-root":{
              background:grey[200]
            },

            "& .MuiTiptap-RichTextContent-root":{
                color:'black',
                

          
                
              "& p.is-editor-empty:first-child::before":{ 
                display:"flex" ,
                width:"100%" , 
                fontWeight:"700",
                fontSize:20,
                
                }
             },
            "& .MuiTiptap-RichTextField-content":{ 

             },
            "& .MuiTiptap-RichTextContent-editable":{

             },
            
            "& .MuiSvgIcon-root":{
                color:theme.palette.primary.main,
                 scale:sm?1.3:1
                },
            "& .ProseMirror": {
              "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
              
           },
    
          },
        }}
      > 
         <RichTextEditor    
          ref={rteRef}
          immediatelyRender
          extensions={extensions} 
          editable={isEditable}
          shouldRerenderOnTransaction
          content={infoFileds.pre }
          

          
          onUpdate={({editor,transaction})=>{
            const cleanEditorContent = DOMPurify.sanitize(editor.getHTML(),{})
            setInfoFileds(p => ({ ...p, pre: cleanEditorContent }));
          }}
          
          renderControls={() => <Box sx={{  p:1, m:0 ,borderRadius:1,   }}><EditorMenuControls  /> </Box> }
          RichTextFieldProps={{
            // The "outlined" variant is the default (shown here only as

            // example), but can be changed to "standard" to remove the outlined
            // field border from the editor
            variant: 'outlined',
          
            
            MenuBarProps: {
              hide: !showMenuBar,
              
            },
            
            // Below is an example of adding a toggle within the outlined field
            // for showing/hiding the editor menu bar, and a "submit" button for
            // saving/viewing the HTML content
            footer: (
              <Flex
                direction="row"
                alignItems={"center"}
                gap={1}
                sx={{
                  background:grey[200],
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1.5,
                  px: 1,
                }}
              >
              { /*    <MenuButton    
                  onClick={() => { } } 
                  IconComponent={RiSave3Fill}
                  tooltipLabel={"שמור"}           
                  style={{color:theme.palette.primary.main, background:grey[200] }}
                  
                  
                       />
              */}
              
             { /*       <MenuButton 
                     tooltipLabel={"תצוגה מקדומה"}         
                     IconComponent={FaEye}
                     style={{color:theme.palette.primary.main, background:grey[200]}}
                       />
             */}
                  
      
                {/* <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "הסתר תפריט " : "החזר תפריט"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                /> */}

                <MenuButton
                  value="formatting"
                  
                  tooltipLabel={
                    isEditable
                      ? "נעל לעריכה"
                      : "אפשר עריכה "
                  }
                  size="small"
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                  style={{color:theme.palette.primary.main, background:grey[200]}}
                />

      
              </Flex>
            ),
          }}
          
          
        >
          {() => (
            <>
      
              <TableBubbleMenu />
              
            </>
          )}
          
        </RichTextEditor>
      </Box>



/* {submittedContent && (
        <>
          <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
            {submittedContent}
          </pre>

          <Box mt={3}>


            <RichTextReadOnly
              content={submittedContent}
              extensions={extensions}
            />
          </Box>
        </>
      ) } */
      



  );
}
