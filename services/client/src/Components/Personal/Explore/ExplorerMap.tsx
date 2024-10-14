/* eslint-disable react/no-unknown-property */
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box } from '@mui/material';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useAppSelector } from '@Redux/hooks';
import { selectLocationsArray } from '@Redux/Slices/Locations/locations.selectors';
import { useEffect, useState } from 'react';
import { CubeTextureLoader } from 'three';

import { binaryLocationTree, MappedLocation } from '../Routes/RouteUtilities';

const SkyBox: React.FC = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader
    .setPath('/Assets/media/Skybox/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
  scene.background = texture;
  return null;
};

export const ExploreMap: React.FC = () => {
  const locations = useAppSelector(selectLocationsArray);
  const [locationMap, setLocationMap] = useState([] as [string, MappedLocation][]);
  useEffect(() => {
    setLocationMap(Array.from(binaryLocationTree(locations)));
  }, [locations]);
  return (
    <GlassDisplay
      data-testid="ExploreApp-Explorer__Map_Container"
      sx={{
        display: 'flex',
        minHeight: '80%',
        width: '100%',
        p: '1em',
      }}
    >
      <Box
        data-testid="ExploreApp-Explorer-Map__Wrapper"
        sx={{
          display: 'flex',
          background: 'linear-gradient(135deg, rgba(0,0,0,.3), rgba(0,1,19,.5))',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: 'rgba(33,150,243,.4)',
          boxShadow: '0 6px 12px rgba(0,0,0,.8)',
          '&:hover': {
            borderColor: 'primary.light',
          },
        }}
      >
        <Canvas>
          <SkyBox />
          <OrbitControls zoomSpeed={5} />
          {locationMap
            .filter(
              (l) =>
                l[1].location.short_name != 'Earth' && l[1].location.parent != 'Earth',
            )
            .map(([id, location]) => {
              const p = location.position;
              if (location.location.parent == 'Earth') console.log(location.location);
              return (
                <>
                  <Text
                    key={id}
                    scale={4}
                    position={[p.x / 150000, p.z / 150000 + 10, p.y / 150000]}
                  >
                    {location.location.waypoint_name}
                  </Text>
                  {location.location.category == 'Planet' && (
                    <Sphere
                      scale={5}
                      position={[p.x / 150000, p.z / 150000, p.y / 150000]}
                    />
                  )}
                </>
              );
            })}
        </Canvas>
      </Box>
    </GlassDisplay>
  );
};
