import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { clearCurrentIngredient, setCurrentIngredient } from '../../services/ingredients/slice';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../IngredientDetails';
import { fetchIngredients } from '../../services/ingredients/actions';


export default function IngredientModal() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { closeModal } = useModal();
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  useEffect(() => {
      if (!ingredients.length) {
        dispatch(fetchIngredients());
      }
    }, [dispatch]);

  useEffect(()=>{
    if(!ingredients) return
    const ingredient = ingredients.find((item) => item._id === id);
    if(!ingredient) return 
    dispatch(setCurrentIngredient(ingredient));
  }, [ingredients])

  return (
    <Modal
      onClose={() => {
        closeModal();
        dispatch(clearCurrentIngredient());
      }}
      title="Детали ингредиента"
    >
      <IngredientDetails />
    </Modal>
  )
}
