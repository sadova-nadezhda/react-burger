import React from 'react';
import FeedCard from './parts/FeedCard';

import { useModal } from '../../hooks/useModal';

import s from './FeedCards.module.scss';

interface Order {
  orderNumber: string;
  title: string;
  price: number;
  images: string[];
}

interface FeedCardsProps {
  orders: Order[];
  isProfile?: boolean;
}

export default function FeedCards({ orders, isProfile = false }: FeedCardsProps) {
  const { openOrderModal } = useModal();

  return (
    <div className={s.cards}>
      {orders.map((order) => (
        <FeedCard 
          key={order.orderNumber}
          orderNumber={order.orderNumber}
          title={order.title}
          price={order.price}
          images={order.images}
          onClick={() => openOrderModal(order, isProfile)}
        />
      ))}
    </div>
  );
}