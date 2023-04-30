import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { V2_MetaFunction} from '@remix-run/node';
import { Link, useLoaderData, useRevalidator } from '@remix-run/react';
import { Fragment, useEffect } from 'react';
import { getHNNewestStories } from '~/api';
import { StoryCard } from '~/components';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Hacker News' }];
};

export const loader = async () => {
  const newStories = await getHNNewestStories(100);

  return { newStories };
}

export default function Index() {
  const { newStories } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  useEffect(() => {
    const minute = 60000;
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, minute);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Box display='flex' gap={1} marginBottom={2}>
        <Typography variant='h4'>100 Latest News</Typography>
        <LoadingButton
          loading={revalidator.state === 'loading'}
          onClick={revalidator.revalidate}
        >
          Update
        </LoadingButton>
      </Box>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        { newStories.map(story => (
          <Grid key={story.id} item xs={4}>
            <Link
              to={story.id.toString()}
              style={{ textDecoration: 'none' }}
            >
              <StoryCard { ...story } />
            </Link>
          </Grid>
        )) }
      </Grid>
    </Fragment>
  );
}
