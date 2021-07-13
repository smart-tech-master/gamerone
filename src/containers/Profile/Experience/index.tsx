import React from 'react';
import Card from 'components/common/Card';
import './style.scss';
import Grid from 'components/layout/Grid';

const Experience: React.FC = (): JSX.Element => {
  return (
    <Grid startPos={2} onProfile={true}>
      <Card>
        <div className="card__content">Experience 1</div>
      </Card>
      <Card>
        <div className="card__content">Experience 2</div>
      </Card>
      <Card>
        <div className="card__content">Experience 3</div>
      </Card>
      <Card>
        <div className="card__content">Experience 4</div>
      </Card>
    </Grid>
  );
};

export default Experience;
