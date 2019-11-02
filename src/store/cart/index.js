import {
    Table,
    GoodsCart,
} from '@/models';

const CartStore = {
    namespaced: true,

    state: {
        tableCart: new Table('cart'),
    },

    actions: {

    },

    mutations: {
        addCart(state, goods) {
            const item = state.tableCart.get(goods.id);

            if (item) {
                item.setCount(item.count + 1);
            } else {
                state.tableCart.add(new GoodsCart({
                    id: goods.id,
                    goods,
                }));
            }
        },

        deleteCart(state, id) {
            state.tableCart.delete(id);
        },
    },

    getters: {
        cartList: state => state.tableCart.values,
    },
};

export default CartStore;
