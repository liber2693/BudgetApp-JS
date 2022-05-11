class Revenue extends Data {
    static contRevenue = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Revenue.contRevenue;
    }

    get id() {
        return this._id;
    }
}