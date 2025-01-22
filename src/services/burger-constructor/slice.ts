import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
    addIngredientToConstructor: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
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
      prepare: (ingredient: Ingredient) => {
        return {
          payload: {
            ...ingredient,
            uuid: uuidv4(),
          },
        };
      },
    },
    reorderIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.constructorIngredients = action.payload;
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
  reorderIngredients,
  removeIngredientFromConstructor,
  resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
