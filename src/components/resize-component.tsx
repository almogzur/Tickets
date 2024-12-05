import { useState } from "react";
import { Rnd } from "react-rnd";

const ResizeComponent =  ()=> {

    const [ position, setPositions]= useState<{x: number,y:number}> ({ x: 0, y:0 })

    return ( <Rnd
        className="rnd"
        position={{ x:position.x , y:position.y}}
        enableUserSelectHack={false}
        onDrag={(e:MouseEvent, d) => { 
        
        const movingObjectWidth :number = 50
        
        const innerWidth:number = e.view.innerWidth
        
        const CurrentXPos:number = e.x
        
        // Negative : Total size - pos si not beger the the moving item mens it at the end of the left hand pos
        // Psoitive Rule :  if Curnt size  is equle to the size innerWidth + moving object we got to the end of screen
        
        const negRule : boolean = innerWidth - CurrentXPos <= movingObjectWidth  // faceing the screen right hend side hndler
        const posRule : boolean =  (innerWidth - CurrentXPos)  >= (innerWidth-movingObjectWidth) // left hand 
        
        
        setPositions({ x: d.x, y: d.y })
        
          if(negRule||posRule){
        
                 // console.log("bonded")
          setPositions({ x: 0, y: 0 })
        }
        
        
        
        }}
        
        
        default={{
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        
        }}
        > 
        </Rnd>
        );
}

export default ResizeComponent




