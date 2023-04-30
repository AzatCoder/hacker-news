export const HN_API_URL = 'https://hacker-news.firebaseio.com/v0';
export const HN_NEWEST_STORIES_URL = `${HN_API_URL}/newstories.json`;

export const getHNItemUrl = (id: number) => `${HN_API_URL}/item/${id}.json`;
