<template lang="pug">
    .cart
        .cart-wrapper
            .cart-name Корзина
            GoodsCartItem(
                v-for="goodsCart in cartList"
                :key="goodsCart.id"
                :goodsCart="goodsCart"
            )
            .cart-full-price Общая стоимость: {{ fullPrice | money }}
</template>

<script>
import { mapGetters } from 'vuex';
import GoodsCartItem from '@/components/GoodsCartItem.vue';

export default {
    name: 'cart',

    components: {
        GoodsCartItem,
    },

    computed: {
        ...mapGetters('cart', [
            'cartList',
        ]),

        fullPrice() {
            return this.cartList.reduce((accum, cur) => accum + cur.fullPrice, 0);
        },
    },
};
</script>

<style lang="stylus" scoped>
    .cart-name
        font-size 20px
        text-transform uppercase
        margin 10px 0

    .cart-full-price
        margin 10px
        font-size 20px
        white-space nowrap

</style>
