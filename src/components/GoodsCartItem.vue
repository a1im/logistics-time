<template lang="pug">
    .goods-item-cart(
        :class="classObj"
    )
        .goods-item-cart-name {{ goods.name }}
        .goods-item-cart-input-block
            input.goods-item-cart-input(:value="count" @input="changeCount")
            .goods-item-cart-input-limit(:class="{ error: isExceeded }") {{ textInput }}
        .goods-item-cart-price {{ goods.price }} ₽ / шт
        .goods-item-cart-delete(@click="deleteCart(goodsCart.id)") X
</template>

<script>
import { mapMutations } from 'vuex';
import { GoodsCart } from '@/models';


export default {
    name: 'goods-cart-item',

    props: {
        goodsCart: {
            type: GoodsCart,
            required: true,
        },
    },

    computed: {
        count() {
            return this.goodsCart.count;
        },

        goods() {
            return this.goodsCart.goods;
        },

        isExceeded() {
            return this.count > this.goods.amount;
        },

        textInput() {
            return this.isExceeded
                ? `Не больше ${this.goods.amount}`
                : `Осталось ${this.goods.amount}`;
        },

        classObj() {
            return {
                up: this.goods.directionUp,
                down: this.goods.directionDown,
                disabled: !this.goods.price,
            };
        },
    },

    methods: {
        ...mapMutations('cart', [
            'deleteCart',
        ]),

        addGoodsToCart() {
            this.addCart(this.goods);
        },

        changeCount(event) {
            const { value } = event.target;
            const count = Number(value);

            if (!Number.isNaN(count) && count >= 0) {
                this.goodsCart.count = count;
            }
            // eslint-disable-next-line no-param-reassign
            event.target.value = this.goodsCart.count || 0;
        },
    },
};
</script>

<style lang="stylus" scoped>
    @keyframes color-up
        90%
            transform scale(1.05)
            color #8b0000

    @keyframes color-down
        90%
            transform scale(.95)
            color #004d00

    .goods-item-cart
        display flex
        align-items center
        color #b1b2b4
        padding 10px
        border-bottom: 1px solid hsla(0,0%,100%,.1)
        border-radius 5px
        flex-wrap wrap

        &.up
            .goods-item-cart-price
                animation: color-up ease .5s infinite

        &.down
            .goods-item-cart-price
                animation: color-down ease .5s infinite

    .goods-item-cart-name
        flex-grow 1
        width 50%

    .goods-item-cart-price
        margin-left 10px
        white-space nowrap
        width 140px
        flex-shrink 0
        text-align right
        font-weight 900

    .goods-item-cart-delete
        padding 10px
        margin-left 10px
        flex none
        cursor pointer
        font-size 20px
        font-weight 900
        transform scale(1, .9)

        &:hover
            color white

    .goods-item-cart-input-block
        margin-left 10px
        display flex
        flex-direction column
        align-items flex-end

    .goods-item-cart-input
        width 50px

    .goods-item-cart-input-limit
        &.error
            color #8b0000

</style>
