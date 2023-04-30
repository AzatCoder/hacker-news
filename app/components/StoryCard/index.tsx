import type { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import type { HNItemProps, HNStory } from '~/api/types';
import { multiple, normalizeHNTime } from '~/helpers';

const AdditionalInfo: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid item>
    <Typography variant='body2' color='text.secondary'>{ children }</Typography>
  </Grid>
);

export const StoryCard: FC<HNItemProps<HNStory>> = ({
  id,
  time,
  title,
  by,
  score,
  descendants
}) => (
  <Card key={id} sx={{ maxWidth: 370 }}>
    <CardActionArea>
      <CardContent sx={{ height: 170 }}>
        <Typography variant='body2' color='text.secondary'>{ normalizeHNTime(time) }</Typography>
        <Typography variant='h6'>{ title }</Typography>
        <Grid
          container
          spacing={2}
          position='absolute'
          bottom='10px'
        >
          <AdditionalInfo>by { by }</AdditionalInfo>
          <AdditionalInfo>{ score } { multiple('point', score) }</AdditionalInfo>
          <AdditionalInfo>{ descendants } { multiple('comment', descendants) }</AdditionalInfo>
        </Grid>
      </CardContent>
    </CardActionArea>
  </Card>
);
