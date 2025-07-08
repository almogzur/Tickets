import {useEffect,useState , useRef, useContext} from 'react'
import { Container, Typography } from '@mui/material'; '@mui/material'

import WidthContext from '@/context/WidthContext'

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
          const buildMap = (tt) => {
            let map = tt.map({
              key: 'kqMqDGlrzLK57Hu5kYYsApjXyAXmIyuU',
              container: mapElement.current,
              center: [mapLongitude, mapLatitude],
              zoom: 17,
              stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
              },
            });
            setMap(map);
            console.log('mapLanguage:', map.getLanguage());
          };
      
          const initTomTom = async () => {
            const tt = await import('@tomtom-international/web-sdk-maps');
            buildMap(tt);
          };
      
          initTomTom();
      
    
        }, []);
      

        return (
 
        
            <Container sx={{ m:10, boxShadow:' 3px 3px 3px 2px #fff',   marginTop:5 , marginBottom:10}} >
                <Typography textAlign={"center"} variant='h2' > דרכי הגעה </Typography>
               <div style={{height: !xs? 360:  400 , marginBottom:2}} ref={mapElement} className="mapDiv" />
            </Container>
   
        );
}
export default Map
