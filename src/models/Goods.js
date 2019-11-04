import Model from './Model';

const ANIMATION_TIME = 3000;

export default class Goods extends Model {
    constructor({
        groupId,
        name,
        ...data
    }) {
        super(data);

        this.groupId = groupId;
        this.name = name;
        this.priceUsd = null;
        this.priceRub = null;
        this.amount = 0;

        this.prevPriceRub = null;
    }

    get directionUp() {
        return this.prevPriceRub !== null && this.priceRub > this.prevPriceRub;
    }

    get directionDown() {
        return this.prevPriceRub !== null && this.priceRub < this.prevPriceRub;
    }

    get price() {
        return this.priceRub || 0;
    }

    /**
     * Переопределим обновление даных
     * @param data
     */
    merge(data) {
        const { priceRub } = data;

        // запомним предыдущее значение, для анимации повышения или понижения
        if (priceRub !== null) {
            this.prevPriceRub = this.priceRub;

            setTimeout(() => {
                this.prevPriceRub = null;
            }, ANIMATION_TIME);
        }

        super.merge(data);
    }
}
