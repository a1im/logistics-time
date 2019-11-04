<template lang="pug">
    .goods
        .loading(v-if="loading" key="loader") Loading...
        .goods-wrapper(v-else key="wrapper")
            .goods-name Товары
            GoodsGroup.goods-group(
                v-for="group in groupList"
                :key="group.id"
                :group="group"
            )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GoodsGroup from '@/components/GoodsGroup.vue';


export default {
    name: 'goods',

    components: {
        GoodsGroup,
    },

    data: () => ({
        loading: false,
        interval: null,
    }),

    computed: {
        ...mapGetters('goods', [
            'groupList',
        ]),
    },

    methods: {
        ...mapActions({
            updateRateDollar: 'updateRateDollar',
            loadInitialData: 'goods/loadInitialData',
            updateData: 'goods/updateData',
        }),

        async intervalUpdateData() {
            await this.updateRateDollar();
            await this.updateData();
        },
    },

    async created() {
        try {
            this.loading = true;
            await this.loadInitialData();

            this.interval = setInterval(this.intervalUpdateData, 15000);
        } finally {
            this.loading = false;
        }
    },

    beforeDestroy() {
        clearInterval(this.interval);
    },
};
</script>

<style lang="stylus" scoped>
    .goods-group
        &:not(:last-child)
            margin-bottom 10px

    .goods-name
        font-size 20px
        text-transform uppercase
        margin 10px 0

</style>
