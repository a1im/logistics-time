import Vue from 'vue';
import Vuex from 'vuex';
import { Random } from '@/utils';

// modules
import CartStore from './cart';
import GoodsStore from './goods';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cart: CartStore,
        goods: GoodsStore,
    },

    state: {
        rateUsd: 30,
    },

    actions: {
        updateRateDollar({ commit }) {
            const MIN_RATE = 20;
            const MAX_RATE = 80;

            commit('setRateUsd', Random(MIN_RATE, MAX_RATE));
        },
    },

    mutations: {
        setRateUsd(state, value) {
            state.rateUsd = value;
        },
    },

    getters: {
        rateUsd: state => state.rateUsd,
    },
});
