<template lang="pug">
    .goods-item(
        :class="classObj"
        @click="addGoodsToCart"
    )
        .goods-item-name {{ goods.name }} ({{ goods.amount }})
        .goods-item-price(v-if="goods.price") {{ goods.price | money }}
</template>

<script>
import { mapMutations } from 'vuex';
import { Goods } from '@/models';


export default {
    name: 'goods-item',

    props: {
        goods: {
            type: Goods,
            required: true,
        },
    },

    computed: {
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
            'addCart',
        ]),

        addGoodsToCart() {
            if (this.goods.amount > 0) {
                this.addCart(this.goods);
            }
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

    .goods-item
        display flex
        align-items center
        color #b1b2b4
        padding 10px
        border-bottom: 1px solid hsla(0,0%,100%,.1)
        cursor pointer
        border-radius 5px

        &:hover:not(.disabled)
            background-color alpha(#000, 1)

        &.up
            .goods-item-price
                animation: color-up ease .5s infinite

        &.down
            .goods-item-price
                animation: color-down ease .5s infinite

        &.disabled
            opacity .5
            cursor not-allowed

    .goods-item-name
        flex-grow 1

    .goods-item-price
        margin-left 10px
        white-space nowrap
        font-weight 900

</style>
