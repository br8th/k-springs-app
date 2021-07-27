import JwtService from "@/common/jwt.service";
import * as types from '../mutation-types';

export const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

export const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

export const actions = {
  login(context, credentials) {
    //
  },
  logout(context) {
    context.commit(types.PURGE_AUTH);
  },
  register(context, credentials) {
    //
  },
  checkAuth(context) {
    if (JwtService.getToken()) {
      window.axios.defaults.headers.common["Authorization"]
       = `Bearer ${JwtService.getToken()}`;

      axios.get("api/auth/me")
        .then(({ data }) => {
          let user = data.user;
          user.token = data.token.access_token;
          context.commit(types.SET_AUTH, user);
        })
        .catch((response) => {
          // TODO: only clear auth if it's a 401 (unauthorized)
          context.commit(types.PURGE_AUTH);
        });

    } else {
      context.commit(types.PURGE_AUTH);
    }
  },
  setAuth(context, user) {
    context.commit(types.SET_AUTH, user);
  }
};

export const mutations = {
  [types.SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    JwtService.saveToken(user.token);
  },
  [types.PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    JwtService.destroyToken();
  }
};
