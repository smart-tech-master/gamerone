import React, { useEffect, useState } from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import TabNav, { TabNavOption } from './TabNav';
import TabPane from './TabPane';

function investigatePanes(children?: React.ReactNode) {
  const tabPaneTitles: TabNavOption[] = [];

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;

    if (element.type === TabPane) {
      const { title } = element.props;
      tabPaneTitles.push({
        key: element.key || title,
        title,
      });
    }
  });

  return tabPaneTitles;
}

interface TabProps {
  show?: boolean;
  active?: number;
  children?: React.ReactNode;
  tabWidth?: number;
  onClose?: () => void;
}

export default function Tab({
  active = 0,
  children,
  tabWidth,
  show = false,
  onClose,
}: TabProps) {
  const [options, setOptions] = useState<TabNavOption[]>([]);
  const [activePane, setActivePane] = useState(active);

  useEffect(() => {
    setOptions(investigatePanes(children));
  }, [children]);

  return (
    <ModalWrapper show={show} onBackdropClick={onClose} width={tabWidth}>
      <div className="modal__header">
        <TabNav
          options={options}
          onSelected={(idx) => setActivePane(idx)}
          active={activePane}
        />
      </div>
      <div className="modal__content">
        {React.Children.map(children, (child, index) => {
          if (index !== activePane) return undefined;
          return child;
        })}
      </div>
      {/* <div className="modal__actions"></div> */}
    </ModalWrapper>
  );
}
