import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/IngredientTypes';

interface ConstructorState {
  constructorIngredients: Ingredient[];
}

const initialState: ConstructorState = {
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: (state, action: PayloadAction<Ingredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorIngredients = [
          ...state.constructorIngredients.filter((item) => item.type !== 'bun'),
          ingredient,
        ];
      } else {
        state.constructorIngredients.push(ingredient);
      }
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      const index = state.constructorIngredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );
    
      if (index !== -1) {
        state.constructorIngredients.splice(index, 1); 
      }
    },
    resetConstructor: (state) => {
      state.constructorIngredients = [];
    },
  },
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
