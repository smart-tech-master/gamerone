import React from 'react';
import Grid from 'components/layout/Grid';
import './style.scss';
import Card from 'components/common/Card';

const Gear: React.FC = (): JSX.Element => {
  return (
    <Grid startPos={2} onProfile={true}>
      <Card>
        <div className="card__content">Gear 1</div>
      </Card>
      <Card>
        <div className="card__content">Gear 2</div>
      </Card>
      <Card>
        <div className="card__content">Gear 3</div>
      </Card>
      <Card>
        <div className="card__content">Gear 4</div>
      </Card>
      <Card>
        <div className="card__content">Gear 5</div>
      </Card>
      <Card>
        <div className="card__content">Gear 6</div>
      </Card>
      <Card>
        <div className="card__content">Gear 7</div>
      </Card>
    </Grid>
  );
};

export default Gear;
