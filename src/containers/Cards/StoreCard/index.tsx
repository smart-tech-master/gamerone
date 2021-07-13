import React from 'react';
import { Product } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Image from 'components/common/Image/index';
import Carousel from 'nuka-carousel';
import './style.scss';
import Icon, { IconNameEnum } from 'components/common/Icon';

export interface StoreCardProps {
  products?: Product[];
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
  products,
  isOwner = false,
  handleClickEdit,
}: StoreCardProps): JSX.Element => {
  const productItems =
    products != null &&
    products.map((product: Product) => {
      return (
        <a
          key={product.id}
          href={product.link}
          title={'Click to view'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <Image
            id={''}
            src={'/' + product.image}
            alt={product.name}
            width={253}
            height={380}
          />
          {/* <div>
            <h5>{product.name}</h5>
          </div> */}
        </a>
      );
    });

  return (
    <Card type={CardTypeEnum.STORE} isOwner={isOwner} onEdit={handleClickEdit}>
      {products && products.length > 0 ? (
        <div className="store-card carousel-wrapper">
          <Carousel
            renderCenterLeftControls={({ previousSlide }) => (
              <button className="controls" onClick={previousSlide}>
                <Icon name={IconNameEnum.ARROW_LEFT} />
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button className="controls" onClick={nextSlide}>
                <Icon name={IconNameEnum.ARROW_RIGHT} />
              </button>
            )}
          >
            {productItems}
          </Carousel>
        </div>
      ) : (
        <div className="card__content empty">
          <p>No products yet.</p>
        </div>
      )}
    </Card>
  );
};

export default StoreCard;
