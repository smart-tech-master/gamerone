import React from 'react';
import TimeAgo from 'timeago-react';

import Card, { CardTypeEnum } from 'components/common/Card';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Dropdown from 'components/common/Dropdown';
import PostVotes from 'containers/Post/PostVotes';
import ImageCarousel from 'components/common/ImageCarousel';

import { PostModel } from 'models/post';
import './style.scss';

export interface PostCardProps {
  post: PostModel;
  isLatest?: boolean;
  isSelf?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isLatest = false,
}: PostCardProps): JSX.Element => {
  // const { username, avatar } = post.user;
  const { description, createdAt, title, games } = post;

  const gameNames = games.map((game) => (
    <a href={`/${game.name}`} key={game.id}>
      {game.name}
    </a>
  ));

  return post.id !== 0 ? (
    <Card type={CardTypeEnum.POST}>
      <div className="post-card-wrapper">
        <div className="content-wrapper">
          <div className="post-content">
            <div className="post-header">
              <h4>{isLatest ? 'Latest Post' : 'Post'}</h4>
              <TimeAgo datetime={createdAt} />
            </div>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            {gameNames.length > 0 && <p>Game/s: {gameNames}</p>}
          </div>
          <div className="post-footer">
            <div>
              <PostVotes post={post} />
            </div>
            <div className="watch">
              <Dropdown
                options={[
                  { label: 'Share' },
                  { label: 'Unfollow' },
                  { label: 'Report' },
                  { label: 'Invite to Squad' },
                ]}
              >
                <Button scheme={ButtonSchemeEnum.SQUARE}>...</Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="image-wrapper">
          <div className="image">
            <ImageCarousel images={post.images} />
          </div>
        </div>
      </div>
    </Card>
  ) : (
    <Card type={CardTypeEnum.POST}>
      <div className="card__content empty">
        <p>No posts yet.</p>
      </div>
    </Card>
  );
};

export default PostCard;
