import { Accordion, AccordionDetails, AccordionSummary, Grid, Skeleton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Comment } from '../../libs/types/stories';
import s from './styles.module.sass';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { State } from '../../redux';
import classNames from 'classnames';
import FormattedTime from '../../shared/Date';

interface CommentInterface {
  getCommentsByList: (list: number[]) => void;
  comment?: Comment;
};

const CommentComponent: React.FC<CommentInterface> = ({ comment, getCommentsByList }) => {
  const comments = useSelector((state: State) => state.comments).objects;
  
  const renderCommentInner = () => {
    if (!comment) return null;
    
    const commentHtml = DOMPurify.sanitize(comment?.text || '');

    return (
      <Grid container spacing="2" className={s.comment}>
        <Grid item xs={2}>
          <Typography className={s.author}>{comment?.by} //</Typography>
          <small><FormattedTime time={comment.time} /></small>
        </Grid>
        <Grid item xs={10}>
          <span dangerouslySetInnerHTML={{ __html: commentHtml }} />
        </Grid>
      </Grid>
    )
  };

  if (!comment) return <Skeleton variant="rectangular" height={48} />;

  if (!comment.kids?.length) return renderCommentInner();

  const loadComments = () => {
    getCommentsByList(comment.kids);
  }

  return (
    <Accordion className={s.commentWrapper} onChange={loadComments}>
      <AccordionSummary
        expandIcon={(comment?.kids || []).length > 0 ? <ExpandMoreIcon /> : ''}
      >
        {renderCommentInner()}
      </AccordionSummary>
      <AccordionDetails>
        {comment.kids.map(commentId => (
          <CommentComponent
            key={commentId}
            comment={comments[commentId]}
            getCommentsByList={getCommentsByList}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default CommentComponent;