import React from 'react';
import Tab from 'components/common/Tab';
import TabPane from 'components/common/Tab/TabPane';
import AvatarSettings from 'containers/Settings/AvatarSettings';
import CoverSettings from 'containers/Settings/CoverSettings';
import ProfileSettings from 'containers/Settings/ProfileSettings';
import { BANNER_WIDTH } from 'utils/constants';

interface UserSettingsTabProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function UserSettingsTab({
  visible = false,
  onClose,
}: UserSettingsTabProps) {
  return (
    <Tab show={visible} onClose={onClose} tabWidth={BANNER_WIDTH / 3 + 200}>
      <TabPane key="avatar" title="Profile Image">
        <AvatarSettings />
      </TabPane>
      <TabPane key="cover" title="Header Image">
        <CoverSettings />
      </TabPane>
      <TabPane key="profile" title="Profile">
        <ProfileSettings />
      </TabPane>
    </Tab>
  );
}
