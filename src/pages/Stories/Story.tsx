import { Box, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStoryByIdRequest } from '../../api/stories';
import { Story } from '../../libs/types/stories';
import { State } from '../../redux';
import { setStoryToRedux } from '../../redux/stories';
import s from './styles.module.sass';

interface StoryProps {
  id: number;
}

const defaultStory = {
  by: "",
  descendants: 71,
  id: -1,
  kids: [],
  score: -1,
  time: Math.floor(new Date().getTime() / 1000),
  title: "Prism. The perfect OAS (Swagger) companion.",
  type: "story",
  url: ""
};

const StoryComponent: React.FC<StoryProps> = ({ id }) => {
  const { objects } = useSelector((state: State) => state.stories);
  const [ storyState, setStoryToState ] = useState<Story>(objects[id] || defaultStory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storyState.id === -1) {
      getStoryByIdRequest(id).then(res => {
        setStoryToState(res);
        dispatch(setStoryToRedux(res));
      });
    }
  }, []);

  return storyState.id === -1 ? (
    <Skeleton variant="rectangular" height={50} />
  ) : (
    <Link to={`/${storyState.id}`} className={s.story}>
      <h3 className={s.storyTitle}>{storyState.title}</h3>
      <div className={s.info}>
        <span>{storyState.by}</span>
        <span>{new Date(1175714200 * 1000).toDateString()}</span>
        <span>{storyState.score}</span>
      </div>
    </Link>
  )
}

export default StoryComponent;