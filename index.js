const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
const FIPE = require('./fipe.js');


async function main() {

  const fipe = new FIPE();
  const vehicleTypeCode = 1;

  const tables = await fipe.referenceTables();
  const tableVersion = tables[0]

  const brands = await fipe.brands(tableVersion, vehicleTypeCode);
  console.log(`Found ${brands.length} brands`);
  
  const modelPromises = brands.map(brand => fipe.models(tableVersion, vehicleTypeCode, brand));
  let models = await Promise.all(modelPromises);
  models = [].concat(...models);
  console.log(`Found ${models.length} models`);

  let years = [];
  let chunk = 100
  for (let i = 0; i < models.length; i += chunk){
    const yearPromises = models.slice(i, i + chunk)
      .map(model => fipe.modelYears(tableVersion, vehicleTypeCode, model));
    let yrs = await Promise.all(yearPromises);
    years = years.concat(...yrs);
    console.log(`Found ${years.length} years so far...`);
  }
  console.log(`Found ${years.length} years`);

  let vehicles = [];
  for (let i = 0; i < years.length; i += chunk){
    const vehiclePromises = years.slice(i, i + chunk)
      .map(year => fipe.vehicle(tableVersion, vehicleTypeCode, year));
    
    let vcls = await Promise.all(vehiclePromises);
    vehicles = vehicles.concat(...vcls);
    console.log(`Found ${vehicles.length} vehicles so far...`);
  }
  console.log(`Found ${vehicles.length} vehicles`);

  const csvWriter = createCsvWriter({  
    path: 'fipe-crawler.csv',
    header: [
      { id: 'value', title: 'Valor' },
      { id: 'brand', title: 'Marca' },
      { id: 'model', title: 'Modelo' },
      { id: 'modelYear', title: 'AnoModelo' },
      { id: 'fuel', title: 'Combustivel' },
      { id: 'fipeCode', title: 'CodigoFipe' },
      { id: 'refMonth', title: 'MesReferencia' },
      { id: 'auth', title: 'Autenticacao' },
      { id: 'vehicleType', title: 'TipoVeiculo' },
      { id: 'fuelCode', title: 'SiglaCombustivel' },
      { id: 'queryDate', title: 'DataConsulta' }
    ]
  });

  csvWriter  
    .writeRecords(vehicles)
    .then(() => console.log('The CSV file was written successfully'));
  
};

main();