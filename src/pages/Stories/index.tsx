import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getStoriesRequest } from '../../api/stories';
import useApi from '../../libs/hooks/useApi';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import s from './styles.module.sass';
import shared from '../../libs/styles/shared.module.sass';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux';
import { updateStoriesIds } from '../../redux/stories';
import StoryComponent from './Story';

let timer: NodeJS.Timeout | null = null
const GET_STORIES_TIMEOUT = 60 * 1000; // 60sec 1000ms

const StoriesPage: React.FC = () => {
  const [ getStories, stories ] = useApi<number[]>(getStoriesRequest, []);
  const [ isLoading, setLoading ] = useState(false);

  const { ids } = useSelector((state: State) => state.stories);
  const dispatch = useDispatch();

  /** Makes a request for stories and repeat it by GET_STORIES_TIMEOUT */
  const getStoriesTimeToTime = () => {
    getStories().finally(() => setLoading(false));

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(getStoriesTimeToTime, GET_STORIES_TIMEOUT);
  }

  const refreshImmediately = () => {
    setLoading(true);
    getStoriesTimeToTime();
  }

  useEffect(() => {
    getStoriesTimeToTime();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (stories.length) {
      dispatch(updateStoriesIds(stories));
    }
  }, [ stories ]);

  const renderStoriesList = () => ids.map(storyId => <StoryComponent key={storyId} id={storyId} />);

  return (
    <div className={s.storiesContainer}>
      <div className={classNames(s.headerRow, shared.stickyHeader)}>
        <h3 className={classNames(s.mainTitle, shared.title)}>New and top stories!</h3>
        <Button
          variant="contained"
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress size={20} className={shared.loadingIcon}  /> : <RefreshIcon />}
          sx={{ height: 36 }}
          onClick={refreshImmediately}
        >
          Refresh
        </Button>
      </div>
      <div className={s.stories}>
        {renderStoriesList()}
      </div>
    </div>
  );
};

export default StoriesPage;
