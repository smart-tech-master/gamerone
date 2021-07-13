import React from 'react';
import TimeAgo from 'timeago-react';
import Avatar from 'components/common/Avatar';
import { Comment } from 'interfaces';

import './style.scss';

export interface CommentProps {
  data: Comment;
}

function CommentBox({ data }: CommentProps) {
  const { user, comment, createdAt } = data;
  const { username, avatar } = user;
  return (
    <div className="comment-box">
      <Avatar alt={username} className="mr-2" src={avatar} />
      <div className="comment-content">
        <h6 className="username">{username}</h6>
        <div className="comment-text">{comment}</div>
      </div>
      <TimeAgo datetime={createdAt} />
    </div>
  );
}

export default React.memo(CommentBox);
