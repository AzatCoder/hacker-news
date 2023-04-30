import type { FC} from 'react';
import { Fragment, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { multiple, normalizeHNTime } from '~/helpers';
import type { HNComment, HNItemProps } from '~/api/types';
import { getHNComments } from '~/api';

interface StoryCommentsProps {
  storyComments: HNItemProps<HNComment>[];
}

interface NestedComment extends HNItemProps<HNComment> {
  isLoading: boolean;
  comments?: NestedComment[];
}

export const StoryComments: FC<StoryCommentsProps> = ({ storyComments }) => {
  const nestedComments = storyComments.map(c => ({ ...c, isLoading: false }));
  const [ comments, setComments ] = useState<NestedComment[]>(nestedComments);

  const showReplies = (comment: NestedComment) => {
    comment.isLoading = true;
    setComments([ ...comments ]);

    getHNComments(comment.kids as number[]).then(fetchedComments => {
      const nestedComments = fetchedComments.map(c => ({ ...c, isLoading: false }));
      comment.comments = nestedComments;
      comment.isLoading = false;
      setComments([ ...comments ]);
    });
  }

  return (
    <Fragment>
      { comments.map(comment => (
        <StoryComment
          { ...comment }
          key={comment.id}
          showReplies={() => showReplies(comment)}
        />
      )) }
    </Fragment>
  );
}

interface StoryCommentProps extends NestedComment {
  isLoading: boolean;
  showReplies: () => void;
}

export const StoryComment: FC<StoryCommentProps> = ({
  id,
  by,
  text,
  time,
  kids,
  isLoading,
  comments,
  showReplies
}) => (
  <Box key={id} marginTop={2}>
    <Typography display='inline' marginRight={1}>
      { by }
    </Typography>
    <Typography variant='caption'>{ normalizeHNTime(time) }</Typography>
    <Box padding={1} dangerouslySetInnerHTML={{ __html: text }} />
    { kids && !comments && (
      <LoadingButton
        onClick={showReplies}
        loading={isLoading}
        sx={{ textTransform: 'none' }}
      >
        show { kids.length } { multiple('replie', kids.length) }
      </LoadingButton>
    ) }
    { comments && (
      <Box marginLeft={2} paddingLeft={1} borderLeft={1}>
        <StoryComments storyComments={comments} />
      </Box>
    ) }
  </Box>
);
