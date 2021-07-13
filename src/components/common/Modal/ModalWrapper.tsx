import React, { ReactNode, useRef } from 'react';
import useOutsideClick from 'lib/useOutsideClick';

import './style.scss';

export interface Props {
  show?: boolean;
  width?: number;
  onBackdropClick?: () => void;
  children?: ReactNode;
}

const ModalWrapper: React.FC<Props> = ({
  show = false,
  width,
  children,
  onBackdropClick,
}: Props): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick([wrapperRef], onBackdropClick);

  return show ? (
    <div className="fullscreen">
      <div
        className="modal"
        style={{ width: width ? `calc(${width}px + 3.5rem)` : '45%' }}
        ref={wrapperRef}
      >
        {children}
      </div>
    </div>
  ) : (
    <> </>
  );
};

export default ModalWrapper;
