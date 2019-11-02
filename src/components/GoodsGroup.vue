<template lang="pug">
    .goods-group
        VCollapse
            template(#trigger)
                .goods-group-name {{ group.name }}
            .goods-group-list
                GoodsItem.goods-group-item(
                    v-for="goods in goodsListByGroup"
                    :key="goods.id"
                    :goods="goods"
                )
</template>

<script>
import { mapGetters } from 'vuex';
import { Group } from '@/models';
import GoodsItem from '@/components/GoodsItem.vue';
import VCollapse from '@/components/VCollapse.vue';


export default {
    name: 'goods-group',

    components: {
        GoodsItem,
        VCollapse,
    },

    props: {
        group: {
            type: Group,
            required: true,
        },
    },

    computed: {
        ...mapGetters('goods', [
            'goodsListByGroupId',
        ]),

        goodsListByGroup() {
            return this.goodsListByGroupId(this.group.id);
        },
    },
};
</script>

<style lang="stylus" scoped>
    .goods-group
        padding 10px
        background-color #282e33
        border-radius 5px
        display flex
        flex-direction column

    .goods-group-name
        font-weight 600
        cursor pointer
        margin 0 10px 10px

    .goods-group-list
        display flex
        flex-direction column

</style>
