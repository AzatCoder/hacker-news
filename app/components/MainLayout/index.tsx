import type { FC} from 'react';
import { Fragment } from 'react';
import type { BoxProps } from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useNavigation, } from '@remix-run/react';

export const MainLayout: FC<BoxProps> = ({ children, ...boxProps }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  
  return (
    <Fragment>
      <Box
        zIndex={1}
        position='fixed'
        width='100%'
        bgcolor={isLoading ? 'white' : ''}
      >
        <Fade in={isLoading}>
          <LinearProgress sx={{ color: 'lightblue' }} />
        </Fade>
      </Box>
      <Box margin='auto' maxWidth={1200} padding={2}>
        { children }
      </Box>
    </Fragment>
  );
}
