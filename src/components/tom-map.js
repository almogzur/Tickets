import {useEffect,useState , useRef, useContext} from 'react'
import { Container, Typography } from '@mui/material'; '@mui/material'
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

import WidthContext from '../context/WidthContext';

const Map = () =>{
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const mapElement = useRef();
    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});
    const MAX_ZOOM = 17

        const increaseZoom = () => {
            setMapZoom(mapZoom + 1);
          if (mapZoom < MAX_ZOOM) {
          }
        };

        const decreaseZoom = () => {
          if (mapZoom > 1) {
            setMapZoom(mapZoom - 1);
          }
        };

        const updateMap = () => {
          map.setCenter([pa-rseFloat(mapLongitude), parseFloat(mapLatitude)]);
          map.setZoom(mapZoom);
        };

         useEffect(() => {
           let map = tt.map({
             /* 
             This key will API key only works on this Stackblitz. To use this code in your own project,
             sign up for an API key on the TomTom Developer Portal.
             */
             key: "kqMqDGlrzLK57Hu5kYYsApjXyAXmIyuU",
             container: mapElement.current,
             center: [mapLongitude, mapLatitude],
             zoom: mapZoom
           });
     
           setMap(map);
           return () => map.remove();
         }, []);

        return (
 
        
            <Container sx={{  boxShadow:' 3px 3px 3px 2px #fff',   marginTop:5 , marginBottom:10}} >
                <Typography textAlign={"center"} variant='h2' > דרכי הגעה </Typography>
               <div style={{height: !xs? 400:  600}} ref={mapElement} className="mapDiv" />
            </Container>
   
        );
}
export default Map
