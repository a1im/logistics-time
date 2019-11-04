import Vue from 'vue';
import filterNumber from './number';


const filterMoney = value => `${filterNumber(value)} Р`;

Vue.filter('money', filterMoney);

export default filterMoney;
