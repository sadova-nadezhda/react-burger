import React from 'react';
import FeedCard from './parts/FeedCard';

import { useModal } from '../../hooks/useModal';
import { Order } from '../../types/OrderTypes';

import s from './FeedCards.module.scss';

interface FeedOrder {
  price: number;
  images: string[];
  originalOrder: Order;
}

interface FeedCardsProps {
  orders: FeedOrder[];
  isProfile?: boolean;
}

export default function FeedCards({ orders, isProfile = false }: FeedCardsProps) {
  const { openOrderModal } = useModal();

  return (
    <div className={s.cards}>
      {orders.map((order) => (
        <FeedCard 
          key={order.originalOrder.number}
          orderNumber={order.originalOrder.number.toString()}
          title={order.originalOrder.number.toString()}
          price={order.price}
          images={order.images}
          onClick={() => openOrderModal(order.originalOrder, isProfile)}
        />
      ))}
    </div>
  );
}