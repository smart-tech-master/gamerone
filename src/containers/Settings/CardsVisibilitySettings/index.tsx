import React from 'react';
import Card from 'components/common/Card';
import CardsVisibilityForm from './CardsVisibilityForm';

export default function CardsVisibilitySettings() {
  return (
    <Card>
      <div className="card__content">
        <h4>Cards</h4>
        <CardsVisibilityForm />
      </div>
    </Card>
  );
}
