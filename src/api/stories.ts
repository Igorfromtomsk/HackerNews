import { Comment, Story } from '../libs/types/stories';

const base = 'https://hacker-news.firebaseio.com/v0';

export const getStoriesRequest = async () => {
  const res = await fetch(`${base}/topstories.json`);
  return await res.json();
}

export const getStoryByIdRequest = async (id: number) => {
  const res = await fetch(`${base}/item/${id}.json`);
  return await res.json() as Story;
}

export const getCommentById = async (id: number) => {
  const res = await fetch(`${base}/item/${id}.json`);
  return await res.json() as Comment;
}