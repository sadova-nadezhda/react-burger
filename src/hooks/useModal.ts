import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Ingredient } from '../types/IngredientTypes';

export function useModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (ingredient: Ingredient) => {
    setModalOpen(true);
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate("/", { replace: true });
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
