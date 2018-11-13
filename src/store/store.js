import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        authorization: Vue.ls.get('authorization'),
    },
    getters: {
        authorization: state => {
            //写死的超管id,后期修改为从state user中获取
            return state.authorization
        }
    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization_bg', payload.authorization);
            state.authorization = payload.authorization;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization_bg');
            state.authorization = undefined;
        }
    }
})