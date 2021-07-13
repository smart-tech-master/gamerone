import React from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import SponsorSettings from 'containers/Settings/SponsorSettings';
import { BANNER_WIDTH } from 'utils/constants';

interface SponsorSettingsModalProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function SponsorSettingsModal({
  visible = false,
  onClose,
}: SponsorSettingsModalProps) {
  return (
    <ModalWrapper
      show={visible}
      onBackdropClick={onClose}
      width={BANNER_WIDTH / 2}
    >
      <div className="modal__header">
        <h4>Sponsors</h4>
      </div>
      <div className="modal__content">
        <SponsorSettings />
      </div>
    </ModalWrapper>
  );
}
