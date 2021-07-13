import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { selectProfilePosts } from 'redux/post/selectors';
import { PostModel } from 'models/post';
import Card, { CardTypeEnum } from 'components/common/Card';
import PostCard from 'containers/Cards/PostCard';
import './style.scss';

function Timeline({ posts }: MappedProps) {
  return (
    <Card type={CardTypeEnum.HISTORY}>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
      {posts.length === 0 && (
        <div className="card__content empty">
          <p>No posts yet.</p>
        </div>
      )}
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  posts: selectProfilePosts(state) as PostModel[],
});

type MappedProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Timeline);
