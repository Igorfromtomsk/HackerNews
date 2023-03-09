import { Button, CircularProgress } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { State } from '../../redux';
import FormattedTime from '../../shared/Date';
import shared from '../../libs/styles/shared.module.sass';
import s from './styles.module.sass';
import storiesStyles from '../Stories/styles.module.sass';
import ChatIcon from '@mui/icons-material/Chat';
import { isValidUrl, withRightPlural } from '../../libs/helpers';
import { getCommentById } from '../../api/stories';
import CommentComponent from './Comment';
import { clearComments, setCommentToRedux } from '../../redux/comments';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

const Story: React.FC = () => {
  const [ isLoading, setLoading ] = useState(false);
  const stories = useSelector((state: State) => state.stories);
  const comments = useSelector((state: State) => state.comments);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const story = stories.objects[+(id || 0)];

  useEffect(() => {
    if (!id || !stories.objects[+id]) {
      navigate('/');
    } else {
      getCommentsByList(story.kids);
    }
  }, []);

  const refreshComments = () => {
    dispatch(clearComments());
    getCommentsByList(comments.ids, true);
  };

  const getCommentsByList = useCallback((list: number[], withoutCache = false) => {
    list.forEach(id => {
      if (withoutCache || !comments.objects[id]) {
        setLoading(true);
        getCommentById(id).then(res => {
          dispatch(setCommentToRedux(res));
          setLoading(false);
        });
      }
    });
  }, [ comments ]);

  const renderLink = () => {
    if (isValidUrl(story.url)) {
      return <a href={story.url}>{new URL(story.url).host}</a>;
    }

    return null;
  }

  if (!story) return null;

  return (
    <div className={s.storyContainer}>
      <div className={shared.stickyHeader}>
        <div className={s.headerRow}>
          <Button
            variant="text"
            sx={{ height: 36 }}
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
          >
            Return
          </Button>
          <div className={s.infoRow}>
            <span className={s.commentsSummery}>
              <span>{story.descendants}</span>
              <span>{withRightPlural(story.descendants, 'comment', 's')}</span>
              <ChatIcon sx={{ height: 15, marginLeft: -1 }} />
            </span>
            <Button
              variant="contained"
              sx={{ height: 36 }}
              onClick={refreshComments}
              endIcon={isLoading ? <CircularProgress size={20} className={shared.loadingIcon}  /> : <RefreshIcon />}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>
        </div>
        <div className={s.headerRow}>
          <div className={s.titleWrapper}>
            <h2 className={shared.title}>{story.title}</h2>
            <div className={storiesStyles.info}>
              <span>{story.by}</span>
              <FormattedTime time={story.time} />
              {renderLink()}
            </div>
          </div>
        </div>
      </div>
      <div className={s.storyBody}>
        <div className={s.comments}>
          {story.kids.map(commentId => (
            <CommentComponent
              key={commentId}
              comment={comments.objects[commentId]}
              getCommentsByList={getCommentsByList}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
