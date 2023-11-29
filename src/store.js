import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdmin: false,
    isSuperAdmin: false,
    isUser: false,
    isAuditor: false,
  },
  mutations: {
    setRoleStatus(state, { role, status }) {
      switch (role) {
        case 'isAdmin':
          state.isAdmin = status;
          break;
        case 'isSuperAdmin':
          state.isSuperAdmin = status;
          break;
        case 'isUser':
          state.isUser = status;
          break;
        case 'isAuditor':
          state.isAuditor = status;
          break;
        // Agrega más casos según sea necesario
      }
    },
  },
  actions: {
    initializeDefaultState(context) {
      context.commit('setRoleStatus', { role: 'isAdmin', status: true });
      // Agrega más commits según sea necesario
    },
  },
});
