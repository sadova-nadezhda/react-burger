import React from 'react';
import FeedCard from './parts/FeedCard';
import s from './FeedCards.module.scss';

interface Order {
  orderNumber: string;
  title: string;
  price: number;
  images: string[];
}

interface FeedCardsProps {
  orders: Order[];
}

export default function FeedCards({ orders }: FeedCardsProps) {
  return (
    <div className={s.cards}>
      {orders.map((order) => (
        <FeedCard 
          key={order.orderNumber}
          orderNumber={order.orderNumber}
          title={order.title}
          price={order.price}
          images={order.images}
        />
      ))}
    </div>
  );
}