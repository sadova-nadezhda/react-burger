import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from '../../types/IngredientTypes';

interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

interface ConstructorState {
  constructorIngredients: ConstructorIngredient[];
}

const initialState: ConstructorState = {
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
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
      prepare: (ingredient: Ingredient) => ({
        payload: {
          ...ingredient,
          uuid: uuidv4(),
        },
      }),
    },
    reorderIngredients: (state, action: PayloadAction<ConstructorIngredient[]>) => {
      state.constructorIngredients = action.payload;
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (ingredient) => ingredient.uuid !== action.payload
      );
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