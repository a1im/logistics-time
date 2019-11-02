import Model from './Model';

export default class GoodsCart extends Model {
    constructor({
        goods,
        ...data
    }) {
        super(data);

        this.goods = goods;
        this.count = 1;
    }

    get price() {
        return this.goods.price;
    }

    get fullPrice() {
        return this.goods.price * this.count;
    }

    setCount(value) {
        this.count = value;
    }
}
