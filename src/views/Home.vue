<template lang="pug">
    .home
        Goods.home-goods
        Cart.home-cart
</template>

<script>
import Goods from '@/components/Goods.vue';
import Cart from '@/components/Cart.vue';

export default {
    name: 'home',

    components: {
        Goods,
        Cart,
    },
};
</script>

<style lang="stylus" scoped>
    .home
        margin 10px 0
        display flex
        flex-wrap wrap

    .home-goods
    .home-cart
        flex-grow 1
        flex-shrink 0
        flex-basis 500px
        margin 0 10px
        max-width: calc(100% - 20px)

</style>
