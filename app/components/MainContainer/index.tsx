import type { FC} from 'react';
import { Fragment } from 'react';
import type { BoxProps } from '@mui/material';
import { LinearProgress, Box, Fade } from '@mui/material';
import { useNavigation, } from '@remix-run/react';

export const MainContainer: FC<BoxProps> = ({ children, ...boxProps }) => {
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
