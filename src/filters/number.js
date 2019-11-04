import Vue from 'vue';

const formater = (() => {
    try {
        return new Intl.NumberFormat('ru', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    } catch (e) {
        // polyfill :)
        return {
            format: val => val,
        };
    }
})();
const filterNumber = (value) => {
    const val = Number(value || 0)
        .toString()
        .replace(/[^\d-,\\.]/g, '')
        .replace(/,/g, '.');

    return formater.format(val);
};

Vue.filter('number', filterNumber);

export default filterNumber;
