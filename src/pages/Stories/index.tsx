import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { getStoriesRequest } from '../../api/stories';
import useApi from '../../libs/hooks/useApi';
import CachedIcon from '@mui/icons-material/Cached';
import s from './styles.module.sass';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux';
import { updateStoriesIds } from '../../redux/stories';

const StoriesPage: React.FC = () => {
  const [ getStories, stories, isLoading ] = useApi<number[]>(getStoriesRequest, []);

  const { ids } = useSelector((state: State) => state.stories);
  const dispatch = useDispatch();

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    dispatch(updateStoriesIds(stories));
  }, [ stories ]);

  const renderStoriesList = () => ids.map(storyId => <div key={storyId}>{storyId}</div>);

  return (
    <div className={s.storiesWrapper}>
      <div className={s.headerRow}>
        <h3 className={s.title}>New and top stories!</h3>
        <Button
          variant="contained"
          disabled={isLoading}
          endIcon={<CachedIcon className={classNames({ [s.spin]: isLoading })} />}
          sx={{ height: 36 }}
          onClick={getStories}
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
