import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: Array<any>;
}

/**
 * Default state object with initial values.
 */
const initialState: CartState = {
  cart: [],
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.cart>
    ) => {
      state.cart = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getCartState = (state: { cart: CartState }) => state.cart;

// Exports all actions
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
