import { Typography, Box, Link } from '@mui/material';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { LoadingButton } from '@mui/lab';
import { useLoaderData, useRevalidator, Link as RemixLink } from '@remix-run/react';
import { getHNStory } from '~/api';
import { MainContainer, StoryComments } from '~/components';
import { multiple, normalizeHNTime } from '~/helpers';

export const loader = async({ params }: LoaderArgs) => {
  // @ts-ignore
  const story = await getHNStory(params.storyId);
  return story;
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.title }];
}

export default function Blog () {
  const { title, url, by, descendants, comments, time } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  return (
    <MainContainer>
      <RemixLink style={{ textDecoration: 'none' }} to='/'>
        <Typography color='blue'>Back to news</Typography>
      </RemixLink>
      <Box marginTop={2}>
        <Typography display='inline' marginRight={1}>by { by }</Typography>
        <Typography variant='caption'>{ normalizeHNTime(time) }</Typography>
        <Typography variant='h5'>{ title }</Typography>
        <Link href={url}>{ url }</Link>
      </Box>
      <Box marginTop={3}>
        <Typography display='inline' marginRight={1}>
          { descendants } { multiple('comment', descendants) }
        </Typography>
        <LoadingButton
          loading={revalidator.state === 'loading'}
          onClick={revalidator.revalidate}
        >
          Update
        </LoadingButton>
        <StoryComments storyComments={comments} />
      </Box>
    </MainContainer>
  );
}
