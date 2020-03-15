const months = [
  'janeiro', 'fevereiro', 'março',
  'abril',   'maio',      'junho',
  'julho',   'agosto',    'setembro',
  'outubro', 'novembro',  'dezembro'
]

const parseDateString = (str) => {
  let [dow, dt] = str.split(',')
  dt = dt.replace(/\bde\b/g, '').replace(/\s{2,}/g, ' ').trim()
  let [day, month, year, hhmm] = dt.split(' ')
  let [hh, mm] = hhmm.split(':')

  month = months.indexOf(month.toLowerCase())

  return new Date(year, month, day, hh, mm)
}

module.exports = class Vehicle {
  constructor(args) {
    this.value = args.Valor
    this.brand = args.Marca
    this.model = args.Modelo
    this.modelYear = args.AnoModelo
    this.fuel = args.Combustivel
    this.fipeCode = args.CodigoFipe
    this.refMonth = args.MesReferencia
    this.auth = args.Autenticacao
    this.vehicleType = args.TipoVeiculo
    this.fuelCode = args.SiglaCombustivel
    this.queryDate = args.DataConsulta
  }

  set value(val) {
    this._value = parseInt(val.replace(/\D+/g, '')) / 100
  }

  get value() {
    return this._value
  }

  set modelYear(value) {
    this._modelYear = parseInt(value)
  }

  get modelYear() {
    return this._modelYear
  }

  set refMonth(value) {
    this._refMonth = value.trim()
  }

  get refMonth() {
    return this._refMonth
  }

  set queryDate(value) {
    this._queryDate = parseDateString(value)
  }

  get queryDate() {
    return this._queryDate.toISOString()
  }
}
