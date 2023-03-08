const base = 'https://hacker-news.firebaseio.com/v0';

export const getStoriesRequest = async () => {
  const res = await fetch(`${base}/topstories.json`);
  return await res.json();
}