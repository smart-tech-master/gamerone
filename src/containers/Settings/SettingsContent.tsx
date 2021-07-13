import React from 'react';

import SettingsRoutes from './route';

function SettingsContent({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ width: '100%' }}>
      <SettingsRoutes />
      {children}
    </div>
  );
}

export default SettingsContent;
