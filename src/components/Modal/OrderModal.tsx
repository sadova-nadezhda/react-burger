import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useModal } from '../../hooks/useModal';
import { clearCurrentOrder, setCurrentOrder } from '../../services/order/slice';

import Modal from './Modal';
import OrderInfo from '../OrderInfo';

export default function OrderModal() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { closeOrderModal, isModalOpen } = useModal();
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    console.log("Orders in store:", orders);
    console.log("Order ID from URL:", id);
  
    if (!orders.length) return;
  
    const foundOrder = orders.find((o) => o._id === id);
    console.log("Found order:", foundOrder);
  
    if (foundOrder) {
      dispatch(setCurrentOrder(foundOrder));
    }
  }, [orders, id, dispatch]);

  if (!isModalOpen && !id) return null;

  return (
    <Modal
      onClose={() => {
        closeOrderModal();
        dispatch(clearCurrentOrder());
      }}
      isOpen={isModalOpen || !!id} 
    >
      <OrderInfo />
    </Modal>
  );
}