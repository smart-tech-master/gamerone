import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

import PostCard from 'containers/Cards/PostCard';
import SponsorsCard from 'containers/Cards/SponsorsCard';
import AchievementsCard from 'containers/Cards/AchievementsCard';
import SocialNetworksCard from 'containers/Cards/SocialNetworksCard';
import NowPlayingCard from 'containers/Cards/NowPlayingCard';
import GearsCard from 'containers/Cards/GearCard';
import Comments from 'containers/Post/Comments';

import ProfileActions from 'redux/profile/actions';
import {
  selectCurrentProfileLayout,
  selectProfileLayoutProcess,
  selectProfileLayoutTemp,
} from 'redux/profile/selectors';
// import { selectGetLayoutStatus } from 'redux/request-status/selectors';
import { selectIsSelfProfile } from 'redux/selectors';

import { LayoutSettings } from 'interfaces';
import { PostModel } from 'models/post';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.scss';
import Timeline from '../Timeline';

import {
  PROFILE_LAYOUT_DEFAULT,
  PROFILE_LAYOUT_BREAKPOINTS,
  PROFILE_LAYOUT_COLUMNS,
} from '../layoutConstants';
import SponsorSettingsModal from '../SponsorSettingsModal';
import StoreCard from 'containers/Cards/StoreCard';
import SocialNetworkSettingsModal from '../SocialNetworkSettingsModal';
import StoreSettingsModal from '../StoreSettingsModal';
import NowPlayingSettingsModal from '../NowPlayingSettingsModal';
import {
  selectSocialNetworks,
  selectSponsors,
  selectProducts,
} from 'redux/selectors';
import { ProfileLayoutProcessTypeEnum } from 'redux/profile/types';
import { selectCurrentlyPlaying } from 'redux/settings/selectors';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Overview: React.FC = (): JSX.Element => {
  const nowPlayingGame = useSelector(selectCurrentlyPlaying);
  const [nowPlayingSettingsIsOpen, setNowPlayingSettingsIsOpen] = useState(
    false,
  );
  const [
    socialNetworkSettingsIsOpen,
    setSocialNetworkSettingsIsOpen,
  ] = useState(false);
  const [sponsorSettingsIsOpen, setSponsorSettingsIsOpen] = useState(false);
  const [storeSettingsIsOpen, setStoreSettingsIsOpen] = useState(false);

  const profileLayout = useSelector(selectCurrentProfileLayout);
  // current layouts that will be applied to the react-grid-layout
  const [layouts, setLayouts] = useState(
    profileLayout ? profileLayout.settings : PROFILE_LAYOUT_DEFAULT,
  );

  // a user can change only his profile layout
  const [layoutsBeforeEdit, setLayoutsBeforeEdit] = useState(layouts);

  const isOwner = useSelector(selectIsSelfProfile);
  const socialNetworks = useSelector(selectSocialNetworks);
  const sponsors = useSelector(selectSponsors);
  const products = useSelector(selectProducts);

  const profileLayoutProcess = useSelector(selectProfileLayoutProcess);
  const dispatch = useDispatch();

  const tempLayout = useSelector(selectProfileLayoutTemp);
  useEffect(() => {
    if (tempLayout?.settings) {
      setLayouts(tempLayout?.settings);
    }
  }, [tempLayout]);
  /**
   * get current react-grid-layout layouts from user's edition
   * @param layout current screen size
   * @param layouts all screen sizes
   */
  const onLayoutChange = (_: any, layouts: any) => {
    dispatch(ProfileActions.getProfileLayoutTemp(layouts));
    setLayouts(layouts);
  };

  const onSaveLayout = () => {
    const layoutSettings: LayoutSettings = {
      settings: tempLayout,
      visibility: profileLayout?.visibility,
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  const onDefaultLayout = () => {
    setLayouts(PROFILE_LAYOUT_DEFAULT);
    const layoutSettings: LayoutSettings = {
      settings: PROFILE_LAYOUT_DEFAULT,
      visibility: {
        achievements: true,
        currentlyPlaying: true,
        gear: true,
        socialNetworks: true,
        sponsors: true,
        store: true,
      },
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  const onCancelLayoutEdit = () => {
    setLayouts(layoutsBeforeEdit);
    dispatch(
      ProfileActions.getProfileLayoutProcess(
        ProfileLayoutProcessTypeEnum.Initial,
      ),
    );
  };

  useEffect(() => {
    if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit) {
      setLayoutsBeforeEdit(layouts);
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Save) {
      onSaveLayout();
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Default) {
      onDefaultLayout();
    } else if (profileLayoutProcess === ProfileLayoutProcessTypeEnum.Cancel) {
      onCancelLayoutEdit();
    }
    // eslint-disable-next-line
  }, [profileLayoutProcess]);

  // handlers to show/hide card modals
  const handleClickNowPlayingEdit = useCallback(() => {
    setNowPlayingSettingsIsOpen(true);
  }, []);

  const handleCloseNowPlayingSettings = useCallback(() => {
    setNowPlayingSettingsIsOpen(false);
  }, []);

  const handleClickSocialNetworkEdit = useCallback(() => {
    setSocialNetworkSettingsIsOpen(true);
  }, []);

  const handleCloseSocialNetworkSettings = useCallback(() => {
    setSocialNetworkSettingsIsOpen(false);
  }, []);

  const handleClickSponsorsEdit = useCallback(() => {
    setSponsorSettingsIsOpen(true);
  }, []);

  const handleCloseSponsorSettings = useCallback(() => {
    setSponsorSettingsIsOpen(false);
  }, []);

  const handleClickStoreEdit = useCallback(() => {
    setStoreSettingsIsOpen(true);
  }, []);

  const handleCloseStoreSettings = useCallback(() => {
    setStoreSettingsIsOpen(false);
  }, []);

  return (
    <>
      <ResponsiveGridLayout
        className="layout overview"
        margin={[40, 40]}
        rowHeight={180}
        layouts={layouts}
        cols={PROFILE_LAYOUT_COLUMNS}
        breakpoints={PROFILE_LAYOUT_BREAKPOINTS}
        isResizable={
          isOwner &&
          profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit
            ? true
            : false
        }
        isDraggable={
          isOwner &&
          profileLayoutProcess === ProfileLayoutProcessTypeEnum.IsEdit
            ? true
            : false
        }
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        useCSSTransforms={false}
      >
        <div key="block-user"></div>
        <div key="block-nav"></div>
        <div key="block-sponsors" className={'grid-card'}>
          {sponsors && profileLayout?.visibility.sponsors && (
            <SponsorsCard
              sponsors={sponsors}
              isOwner={isOwner}
              handleClickEdit={handleClickSponsorsEdit}
            />
          )}
        </div>
        <div key="block-achievements" className={'grid-card'}>
          {profileLayout?.visibility.achievements && (
            <AchievementsCard achievements={[]} />
          )}
        </div>
        <div key="block-latest-post" className={'grid-card'}>
          <PostCard post={new PostModel()} isLatest={true} />
        </div>
        <div key="block-gears" className={'grid-card'}>
          {profileLayout?.visibility.gear && <GearsCard gears={[]} />}
        </div>
        <div key="block-social-networks" className={'grid-card'}>
          {profileLayout?.visibility.socialNetworks && (
            <SocialNetworksCard
              networks={socialNetworks}
              isOwner={isOwner}
              handleClickEdit={handleClickSocialNetworkEdit}
            />
          )}
        </div>
        <div key="block-timeline" className={'grid-card'}>
          <Timeline />
        </div>
        <div key="block-now-playing" className={'grid-card'}>
          {profileLayout?.visibility.currentlyPlaying && (
            <NowPlayingCard
              playing={nowPlayingGame}
              isOwner={isOwner}
              handleClickEdit={handleClickNowPlayingEdit}
            />
          )}
        </div>
        <div key="block-store" className={'grid-card'}>
          {profileLayout?.visibility.store && (
            <StoreCard
              products={products}
              isOwner={isOwner}
              handleClickEdit={handleClickStoreEdit}
            />
          )}
        </div>
      </ResponsiveGridLayout>

      <Comments />

      <NowPlayingSettingsModal
        visible={nowPlayingSettingsIsOpen}
        onClose={handleCloseNowPlayingSettings}
      />

      <SocialNetworkSettingsModal
        visible={socialNetworkSettingsIsOpen}
        onClose={handleCloseSocialNetworkSettings}
      />

      <SponsorSettingsModal
        visible={sponsorSettingsIsOpen}
        onClose={handleCloseSponsorSettings}
      />

      <StoreSettingsModal
        visible={storeSettingsIsOpen}
        onClose={handleCloseStoreSettings}
      />
    </>
  );
};

export default Overview;
