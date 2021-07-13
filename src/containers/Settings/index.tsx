import React from 'react';
import withChrome from 'components/common/Chrome/withChrome';
import Grid from 'components/layout/Grid';
import SettingsMenu from './SettingsMenu';
import SettingsContent from './SettingsContent';

function Settings() {
  return (
    <section>
      <div style={{ marginTop: '6rem' }}>
        <Grid>
          <div style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }}>
            <SettingsMenu />
          </div>
          <div style={{ gridColumn: '2 / span 3', gridRow: '1 / span 5' }}>
            <SettingsContent />
          </div>
        </Grid>
      </div>
    </section>
  );
}

export default withChrome(Settings);
