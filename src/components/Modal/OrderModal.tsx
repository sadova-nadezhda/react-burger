import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useModal } from '../../hooks/useModal';
import { clearCurrentOrder, setCurrentOrder } from '../../services/orders/slice';

import Modal from './Modal';
import OrderInfo from '../OrderInfo';

export default function OrderModal() {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const { closeOrderModal, isModalOpen } = useModal();
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {  
    if (!orders.length || !number) return;

    const foundOrder = orders.find((o) => o.number === +number);
  
    if (foundOrder) {
      dispatch(setCurrentOrder(foundOrder));
    }
  }, [orders, number, dispatch]);

  if (!isModalOpen && !number) return null;

  return (
    <Modal
      onClose={() => {
        closeOrderModal();
        dispatch(clearCurrentOrder());
      }}
      isOpen={isModalOpen || !!number} 
    >
      <OrderInfo />
    </Modal>
  );
}