
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  products: Array<any>;
}


/**
 * Default state object with initial values.
 */
const initialState: ProductState = {
  products: [],
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductss: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.products>
    ) => {
      state.products = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getProductState = (state: { product: ProductState }) => state.product;

// Exports all actions
export const { setProductss } = productSlice.actions;

export default productSlice.reducer;