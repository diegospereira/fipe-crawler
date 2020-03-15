module.exports = class Year {
  constructor(args, model) {
    this.label = args.Label
    this.code = args.Value
    this.model = model
  }

  set code(val) {
    this._code = val
    let [ year, fuelCode ] = val.split('-')
    this.year = year
    this.fuelCode = fuelCode
  }

  set year(val) {
    this._year = parseInt(val)
  }

  get year() {
    return this._year
  }

  set fuelCode(val) {
    this._fuelCode = parseInt(val)
  }

  get fuelCode() {
    return this._fuelCode
  }

  get brand() {
    return this.model.brand
  }
}