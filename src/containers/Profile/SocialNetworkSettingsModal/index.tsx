import React from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import SocialNetworkSettings from 'containers/Settings/SocialNetworkSettings';
import { BANNER_WIDTH } from 'utils/constants';

interface SocialNetworkSettingsModalProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function SocialNetworkSettingsModal({
  visible = false,
  onClose,
}: SocialNetworkSettingsModalProps) {
  return (
    <ModalWrapper
      show={visible}
      onBackdropClick={onClose}
      width={BANNER_WIDTH / 2}
    >
      <div className="modal__header">
        <h4>Social Networks</h4>
      </div>
      <div className="modal__content">
        <SocialNetworkSettings />
      </div>
    </ModalWrapper>
  );
}
