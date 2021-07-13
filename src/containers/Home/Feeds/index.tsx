import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import NewPostForm from 'containers/Post/NewPostForm';
import PostCard from 'containers/Cards/PostCard';
import UserCard from 'containers/Cards/UserCard';
import Comments from 'containers/Post/Comments';
import Cover from 'components/common/Cover';

import { RootState } from 'redux/types';
import { selectSelfFeed } from 'redux/post/selectors';
import { PostModel } from 'models/post';
import Grid from 'components/layout/Grid';
import {
  selectSettingProfileType,
  selectSettingsProfileUser,
} from 'redux/settings/selectors';

function UserFeeds({ feed, user, userType }: MappedProps) {
  const FeedPosts = feed.map((feed) => <PostCard post={feed} key={feed.id} />);
  const { banner } = user;

  return (
    <>
      <Cover src={banner} />
      <section>
        <Grid>
          {user && <UserCard user={user} isSelf={true} userType={userType} />}
          <NewPostForm />
          {FeedPosts}
          <Comments />
        </Grid>
      </section>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: selectSettingsProfileUser(state),
  feed: selectSelfFeed(state) as PostModel[],
  userType: selectSettingProfileType(state),
});

type MappedProps = ReturnType<typeof mapStateToProps>;

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(UserFeeds) as React.ElementType;
