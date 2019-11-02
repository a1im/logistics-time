<template lang="pug">
    .collapse(v-on="$listeners")
        .collapse-trigger(@click="toggle")
            slot(name="trigger" :opened="isOpened")

        transition(
            @beforeLeave="animateFrom"
            @beforeEnter="animateFrom"
            @leave="animateTo"
            @enter="animateTo"
            @afterLeave="clearStyles"
            @afterEnter="clearStyles"
        )
            .collapse-content(v-if="isOpened")
                slot

</template>

<script>
export default {
    props: {
        opened: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            isOpened: this.opened,
            saveElement: null,
        };
    },

    watch: {
        opened(value) {
            this.isOpened = value;
        },
    },

    methods: {
        animateFrom(element) {
            const { scrollHeight } = element;
            const height = this.saveElement
                ? window.getComputedStyle(this.saveElement).height
                : 0;

            // eslint-disable-next-line no-param-reassign
            element.style.height = this.isOpened ? height : `${scrollHeight}px`;
            this.saveElement = element;
        },

        animateTo(element) {
            const { scrollHeight } = element;

            // eslint-disable-next-line no-param-reassign
            element.style.height = this.isOpened ? `${scrollHeight}px` : 0;
        },

        clearStyles(element) {
            // remove added styles
            this.saveElement = null;
            element.style.removeProperty('height');
        },

        toggle() {
            this.isOpened = !this.isOpened;
            this.$emit('update:opened', this.isOpened);
            this.$emit('toggle', this.isOpened);
            this.$emit(this.isOpened ? 'open' : 'close');
        },
    },
};
</script>

<style lang="stylus" scoped>
.collapse-content
    overflow hidden
    height auto
    transition height .3s ease-out
</style>
