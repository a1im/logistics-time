import Model from './Model';

export default class Group extends Model {
    constructor({
        name,
        ...data
    }) {
        super(data);

        this.name = name;
    }
}
