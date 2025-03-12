import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ingredient } from '../types/IngredientTypes';
import { Order } from '../types/OrderTypes';

export function useModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (ingredient: Ingredient) => {
    setModalOpen(true);
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  };

  const openOrderModal = (order: Order, isProfile: boolean = false) => {
    setModalOpen(true);
    const route = isProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`;
    navigate(route, { state: { background: location } });
  };

  const closeOrderModal = () => {
    setModalOpen(false);
  
    if (location.pathname.startsWith("/profile/orders")) {
      navigate("/profile/orders", { replace: true });
    } else {
      navigate("/feed", { replace: true });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate("/", { replace: true });
  };

  return {
    isModalOpen,
    openModal,
    openOrderModal,
    closeOrderModal,
    closeModal,
  };
}
