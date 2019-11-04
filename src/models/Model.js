export default class Model {
    constructor({ id }) {
        this.id = id;
    }

    /**
     * Обновление даных в модели
     * @param data
     */
    merge(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (key in this) {
                this[key] = value;
            }
        });
    }
}
