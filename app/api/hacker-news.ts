import { typedJSONFetch } from '~/helpers';
import type { HNComment, HNItemProps, HNStory } from './types';
import { HN_NEWEST_STORIES_URL, getHNItemUrl } from './urls';

export const getHNItem = async <T extends {}> (id: number) => {
  const response = await typedJSONFetch<HNItemProps<T>>(getHNItemUrl(id));

  return response;
}

export const getHNComments = async (ids: number[]) => {
  const fetchKids = ids.map(getHNItem<HNComment>);
  const kids = await Promise.all(fetchKids);
  const comments = kids.filter(kid => kid.type === 'comment');

  return comments;
}

export const getHNStory = async (id: number) => {
  const story = await getHNItem<HNStory>(id);
  const comments = story.kids ? await getHNComments(story.kids) : [];

  return {
    ...story,
    comments,
  };
}

export const getHNNewestStories = async (len: number) => {
  const newStoriesIds = await typedJSONFetch<number[]>(HN_NEWEST_STORIES_URL);
  const fetchNewStories = newStoriesIds.slice(0, len).map(getHNItem<HNStory>);
  const newStories = await Promise.all(fetchNewStories);

  return newStories;
}
