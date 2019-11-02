import Vue from 'vue';

class Table {
    /**
     * @param {string} name Название таблицы
     * @param {string} propId Уникалное свойство в модели объекта
     * @param {array} indexes Список свойств по которым создать отдельные сгруппированные списки
     */
    constructor(name, {
        propId = 'id',
        indexes = [],
    } = {}) {
        this.name = name;
        this.propId = propId;
        this.map = {};
        // Заполним карту индексов для быстрого фильтра
        this.indexsesMap = indexes
            .reduce(
                (accumulator, indexName) => Object.assign(accumulator, { [indexName]: {} }),
                {},
            );
    }

    get values() {
        return Object.values(this.map);
    }

    /**
     * Получить по id
     * @param {string | number} id
     * @returns {*}
     */
    get(id) {
        return this.map[id];
    }

    /**
     * Получить список по определенному полю
     * @param {string} prop Название поля по которому получить список
     * @param {*} value Значение по которому фильтровать
     * @returns {Array}
     */
    filterBy(prop, value) {
        const indexMap = this.indexsesMap[prop];

        return indexMap
            ? indexMap[value] || []
            : this.values.filter(it => it[prop] === value);
    }

    /**
     * Добавить
     * @param {object} data
     */
    add(data) {
        const id = data[this.propId];

        Vue.set(this.map, id, data);

        // Добавим в связные списки
        Object.entries(this.indexsesMap).forEach(([indexName, indexMap]) => {
            const indexId = data[indexName];

            if (!indexMap[indexId]) {
                Vue.set(indexMap, indexId, []);
            }
            indexMap[indexId].push(data);
        });
    }

    /**
     * Удалить по id
     * @param id
     */
    delete(id) {
        const item = this.get(id);

        if (item) {
            Vue.delete(this.map, id);

            // Удалим в связных списках
            Object.entries(this.indexsesMap).forEach(([indexName, indexMap]) => {
                const indexId = item[indexName];
                const indexList = indexMap[indexId] || [];
                const index = indexList.indexOf(item);

                if (index !== -1) {
                    indexList.splice(index, 1);
                }
            });
        }
    }
}

export default Table;
