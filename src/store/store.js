import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: Vue.ls.get('user'),
        authorization: Vue.ls.get('authorization'),
    },
    getters: {
        user: state =>{
            return state.user
        }
    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization', payload.authorization);
            state.authorization = payload.authorization;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization');
            Vue.ls.remove('user');
            state.authorization = '';
            state.user = undefined;
        },
        [types.SET_USER_INFO]: (state, payload) => {
            Vue.ls.set('user', payload);
            state.user = payload;
        },
    },
    actions: {
      loginOut(context) {
        context.commit(types.LOGOUT);
      }
    }
})