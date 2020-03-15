const FIPE = require('./fipe')

const fipe = new FIPE()
const vehicleTypeCode = 1

async function monthData(_month) {

  const tables = await fipe.referenceTables()
  const tableVersion = tables[0]

  const brands = await fipe.brands(tableVersion, vehicleTypeCode)
  console.log(`Found ${brands.length} brands`)
  
  const modelPromises = brands.map(brand => fipe.models(tableVersion, vehicleTypeCode, brand))
  let models = await Promise.all(modelPromises)
  models = [].concat(...models)
  console.log(`Found ${models.length} models`)

  let years = []
  let chunk = 1000
  for (let i = 0; i < models.length; i += chunk){
    const yearPromises = models.slice(i, i + chunk)
      .map(model => fipe.modelYears(tableVersion, vehicleTypeCode, model))
    let yrs = await Promise.all(yearPromises)
    years = years.concat(...yrs)
    console.log(`Found ${years.length} years so far...`)
  }
  console.log(`Found ${years.length} years`)

  let vehicles = []
  for (let i = 0; i < years.length; i += chunk){
    const vehiclePromises = years.slice(i, i + chunk)
      .map(year => fipe.vehicle(tableVersion, vehicleTypeCode, year))
    
    let vcls = await Promise.all(vehiclePromises)
    vehicles = vehicles.concat(...vcls)
    console.log(`Found ${vehicles.length} vehicles so far...`)
  }
  console.log(`Found ${vehicles.length} vehicles`)
  
  return vehicles
}

async function modelData(fipeCode, year, fuelCode) {
  const tables = await fipe.referenceTables()

  let ps = []
  for (let table of tables) {
    ps.push(fipe.modelDataFromFipe(table, vehicleTypeCode, fipeCode, year, fuelCode))
  }

  const result = await Promise.all(ps)
  return result.filter(val => val)
}

module.exports = {
    monthData,
    modelData
}