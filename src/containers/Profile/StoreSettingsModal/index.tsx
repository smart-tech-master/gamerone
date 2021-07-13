import React from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import StoreSettings from 'containers/Settings/StoreSettings';
import { BANNER_WIDTH } from 'utils/constants';

interface StoreSettingsModalProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function StoreSettingsModal({
  visible = false,
  onClose,
}: StoreSettingsModalProps) {
  return (
    <ModalWrapper
      show={visible}
      onBackdropClick={onClose}
      width={BANNER_WIDTH / 2}
    >
      <div className="modal__header">
        <h4>Store</h4>
      </div>
      <div className="modal__content">
        <StoreSettings />
      </div>
    </ModalWrapper>
  );
}
