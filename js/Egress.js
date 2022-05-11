class Egress extends Data {
    static contEgress = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Egress.contEgress;
    }

    get id() {
        return this._id;
    }
}