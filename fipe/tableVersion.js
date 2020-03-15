module.exports = class TableVersion {
  constructor(args) {
    this.refTableId = args.Codigo
    this.month = args.Mes
  }

  get month() {
    return this._month
  }

  set month(value) {
    this._month = value
    const [month, year] = value.split('/')
    this._yearNum = parseInt(year, 10)
    switch (month) {
      case 'janeiro':
        this._monthNum = 1
        break
      case 'fevereiro':
        this._monthNum = 2
        break
      case 'março':
        this._monthNum = 3
        break
      case 'abril':
        this._monthNum = 4
        break
      case 'maio':
        this._monthNum = 5
        break
      case 'junho':
        this._monthNum = 6
        break
      case 'julho':
        this._monthNum = 7
        break
      case 'agosto':
        this._monthNum = 8
        break
      case 'setembro':
        this._monthNum = 9
        break
      case 'outubro':
        this._monthNum = 10
        break
      case 'novembro':
        this._monthNum = 11
        break
      case 'dezembro':
        this._monthNum = 12
        break
    }
  }
}