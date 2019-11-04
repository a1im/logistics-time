import {
    normalizeNamesGroup,
    normalizeNamesGoods,
    normalizeDataGoods,
} from './normalize';
import { Table } from '@/libs';
import {
    Group,
    Goods,
} from '@/models';

const apiFetch = (url, options = {}) => fetch(`${process.env.BASE_URL}json${url}`, options);

const GoodsStore = {
    namespaced: true,

    state: {
        tableGoods: new Table('goods', { indexes: ['groupId'] }),
        tableGroup: new Table('groups'),
    },

    actions: {
        /**
         * Запрос названий для групп и товаров
         * @returns {Promise<{groups: Array, goods: Array}>}
         */
        async loadNames() {
            try {
                return await apiFetch('/names.json')
                    .then(r => r.json())
                    .then((data) => {
                        const dataEntries = Object.entries(data);
                        const groups = dataEntries
                            .map(([id, group]) => Object.assign(normalizeNamesGroup(group), {
                                id,
                            }));
                        const goods = dataEntries
                            .flatMap(([groupId, group]) => (
                                Object.entries(group.B)
                                    .map(([id, it]) => Object.assign(normalizeNamesGoods(it), {
                                        id,
                                        groupId,
                                    }))
                            ));

                        return {
                            groups,
                            goods,
                        };
                    });
            } catch (e) {
                console.error('loadGroups: ', e.message);

                throw e;
            }
        },

        async loadData({ rootGetters }) {
            try {
                return await apiFetch('/data.json')
                    .then(r => r.json())
                    .then(({
                        Value: {
                            Goods: goods = [],
                        } = {},
                    }) => ({
                        goods: goods.map(it => Object.assign(normalizeDataGoods(it), {
                            priceRub: it.C * rootGetters.rateUsd,
                        })),
                    }));
            } catch (e) {
                console.error('loadGoods: ', e.message);

                throw e;
            }
        },

        async loadInitialData({ dispatch, commit }) {
            const [{
                groups,
                goods,
            }, {
                goods: dataGoods,
            }] = await Promise.all([
                dispatch('loadNames'),
                dispatch('loadData'),
            ]);

            commit('setGroups', groups);
            commit('setGoods', goods);
            commit('updateGoods', dataGoods);
        },

        async updateData({ dispatch, commit }) {
            const {
                goods: dataGoods,
            } = await dispatch('loadData');

            commit('updateGoods', dataGoods);
        },
    },

    mutations: {
        setGroups(state, groups) {
            groups.forEach(it => state.tableGroup.add(new Group(it)));
        },

        setGoods(state, goods) {
            goods.forEach(it => state.tableGoods.add(new Goods(it)));
        },

        updateGoods(state, goods) {
            goods.forEach(it => state.tableGoods.get(it.id).merge(it));
        },
    },

    getters: {
        groupList: state => state.tableGroup.values,
        goodsList: state => state.tableGoods.values,
        goodsListByGroupId: state => id => state.tableGoods.filterBy('groupId', id),
        groupById: state => id => state.tableGroup.get(id),
        goodsById: state => id => state.tableGoods.get(id),
    },
};

export default GoodsStore;
