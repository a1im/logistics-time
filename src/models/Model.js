export default class Model {
    constructor({ id }) {
        this.id = id;
    }

    merge(data) {
        Object.entries(data).forEach(([key, value]) => {
            if (key in this) {
                this[key] = value;
            }
        });
    }
}
