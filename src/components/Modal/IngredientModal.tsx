import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { clearCurrentIngredient, setCurrentIngredient } from '../../services/ingredients/slice';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../IngredientDetails';

export default function IngredientModal() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { closeModal, isModalOpen } = useModal();
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  useEffect(() => {
    if (!ingredients.length) return;
    const ingredient = ingredients.find((item) => item._id === id);
    if (ingredient) {
      dispatch(setCurrentIngredient(ingredient));
    }
  }, [ingredients, id, dispatch]);

  if (!isModalOpen && !id) return null;

  return (
    <Modal
      onClose={() => {
        closeModal();
        dispatch(clearCurrentIngredient());
      }}
      title="Детали ингредиента"
      isOpen={isModalOpen || !!id} 
    >
      <IngredientDetails />
    </Modal>
  );
}