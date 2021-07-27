import * as types from '../mutation-types';

export const state = {
  cart: [],
  isCategoryLoading: false, // To indicate whether or not the items of a selected category are being loaded.
};

export const getters = {
  cart: state => state.cart,
  cartItemQuantity: state => (product_id) => {
    const record = state.cart.find((p, i) => p.id === product_id);

    return record ? record.quantity : 0;
  },
  totalCartItems: (state) => {
    let total = 0;

    state.cart.forEach(({ price, quantity }) => {
      total += (price * quantity);
    });

    return total;
  },
  totalCartAmount: (state) => {
    let total = 0;

    state.cart.forEach(({ price, quantity }) => {
      total += quantity;
    });

    return total;
  },
};

export const mutations = {

  [types.STOP_LOADING_CATEGORY](state) {
    state.isCategoryLoading = false;
  },

  [types.START_LOADING_CATEGORY](state) {
    state.isCategoryLoading = true;
  },

  [types.ADD_TO_CART](state, product) {
    let index = -1;
    const record = state.cart.find((p, i) => {
      index = i;
      return p.id === product.id;
    });

    if (!record) {
      return state.cart.push(Object.assign(product, { quantity: 1 }));
    }

    // Create a new cart object, otherwise vue won't automatically refresh
    state.cart.splice(index, 1, Object.assign(record, { quantity: ++record.quantity }));
  },

  [types.REMOVE_FROM_CART](state, product) {
    let index = -1;
    const record = state.cart.find((p, i) => {
      index = i;
      return p.id === product.id;
    });

    // Record doesn't exist
    if (!record) {
      return;
    }

    if (record.quantity) { state.cart.splice(index, 1, Object.assign(record, { quantity: --record.quantity })); }

    // Quantity is 0
    if (!record.quantity) { state.cart.splice(index, 1); }
  },

  [types.CLEAR_CART](state) {
    state.cart = [];
  },
};

export const actions = {
  addToCart({ commit, dispatch }, payload) {
    commit(types.ADD_TO_CART, payload);
  },
  removeFromCart({ commit, dispatch }, payload) {
    commit(types.REMOVE_FROM_CART, payload);
  },
  clearCart({ commit, dispatch }) {
    commit(types.CLEAR_CART);
  },
  startLoadingCategory({ commit, dispatch }) {
    commit(types.START_LOADING_CATEGORY);
  },
  stopLoadingCategory({ commit, dispatch }) {
    commit(types.STOP_LOADING_CATEGORY);
  },
};
