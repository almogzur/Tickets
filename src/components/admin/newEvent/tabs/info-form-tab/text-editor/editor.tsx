import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack as Flex, Typography , useTheme } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { useCallback, useContext, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./menu-controls";
import useExtensions from "./useExtensions";
import { Colors } from "@/lib/colors";
import WidthContext from "@/context/WidthContext";
import { blue, grey } from "@mui/material/colors";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";

import DOMPurify from "isomorphic-dompurify";

import { RiSave3Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";


function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

export default function Editor() {

  const theme  = useTheme()
  const extensions = useExtensions({
    placeholder: "הוסף טקסט על האירוע",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const [submittedContent, setSubmittedContent] = useState("");


  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
  
      });
    },
    [],
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles],
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files,
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles],
    );


  return (
      <Box
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
            background:"#fff",
            
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
                 scale:1.3
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
          extensions={extensions} 
          immediatelyRender
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
         content={infoFileds.pre}
         onUpdate={({editor,transaction})=>{
            
           const cleanEditorContent = DOMPurify.sanitize(editor.getHTML(),{})
           setInfoFileds(p => ({ ...p, pre: cleanEditorContent }));
           
              

        }}
          renderControls={() => <Box sx={{  p:1, m:0 ,borderRadius:1,  background:grey[200]  }}><EditorMenuControls  /> </Box> }
          RichTextFieldProps={{
            // The "outlined" variant is the default (shown here only as

            // example), but can be changed to "standard" to remove the outlined
            // field border from the editor
            variant: 'standard',
            
            
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
              
                <MenuButton 
                     tooltipLabel={"תצוגה מקדומה"}         
                     IconComponent={FaEye}
                     style={{color:theme.palette.primary.main, background:grey[200]}}
                       />
                  
      
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
              <LinkBubbleMenu />
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
