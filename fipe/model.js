module.exports = class Model {
  constructor(args, brand) {
    this.name = args.Label;
    this.code = args.Value;
    this.brand = brand;
  }

  set code(val) {
    this._code = parseInt(val);
  }

  get code() {
    return this._code;
  }
}