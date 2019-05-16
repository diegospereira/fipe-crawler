module.exports = class Brand {
  constructor(args) {
    this.name = args.Label;
    this.code = args.Value;
  }

  set code(val) {
    this._code = parseInt(val);
  }

  get code() {
    return this._code;
  }
}