'use strict';

const request = require('request-promise');
const querystring = require('querystring');

const TableVersion = require('./fipe/tableVersion.js');
const Brand = require('./fipe/brand.js');
const Model = require('./fipe/model.js');
const Year = require('./fipe/year.js');
const Vehicle = require('./fipe/vehicle.js');



const base_url = 'https://veiculos.fipe.org.br'

let default_headers = {
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'en-US,en;q=0.5',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Referer': 'https://veiculos.fipe.org.br/'
};

module.exports = class FIPE {

  async referenceTables() {
    let opts = {
      method: 'POST',
      body: '',
      headers: default_headers,
      uri: `${base_url}/api/veiculos/ConsultarTabelaDeReferencia`,
      json: true,
      transform: (tables) => {
        return tables.map(table => new TableVersion(table));
      }
    };

    return await request(opts);
  };

  async brands(table, vehicleTypeCode) {
    let data = {
      codigoTabelaReferencia: table.refTableId,
      codigoTipoVeiculo: vehicleTypeCode
    };

    let opts = {
      method: 'POST',
      body: querystring.stringify(data),
      headers: default_headers,
      uri: `${base_url}/api/veiculos/ConsultarMarcas`,
      json: true,
      transform: (brands) => {
        return brands.map(brand => new Brand(brand));
      }
    };

    return await request(opts);
  };

  async models(table, vehicleTypeCode, brand) {
    let data = {
      codigoTabelaReferencia: table.refTableId,
      codigoTipoVeiculo: vehicleTypeCode,
      codigoModelo: null,
      codigoMarca: brand.code,
      ano: null,
      codigoTipoCombustivel: null,
      anoModelo: null,
      modeloCodigoExterno: null 
    };

    let opts = {
      method: 'POST',
      body: querystring.stringify(data),
      headers: default_headers,
      uri: `${base_url}/api/veiculos/ConsultarModelos`,
      json: true,
      transform: ({ Modelos, _Anos }) => {
        return Modelos.map(modelo => new Model(modelo, brand));
      }
    };

    return await request(opts);
  };

  async modelYears(table, vehicleTypeCode, model) {
    let data = {
      codigoTabelaReferencia: table.refTableId,
      codigoTipoVeiculo: vehicleTypeCode,
      codigoModelo: model.code,
      codigoMarca: model.brand.code,
      ano: null,
      codigoTipoCombustivel: null,
      anoModelo: null,
      modeloCodigoExterno: null 
    };

    let opts = {
      method: 'POST',
      body: querystring.stringify(data),
      headers: default_headers,
      uri: `${base_url}/api/veiculos/ConsultarAnoModelo`,
      json: true,
      transform: (years) => {
        return years.map(year => new Year(year, model));
      }
    };

    return await request(opts);
  };

  async vehicle(table, vehicleTypeCode, year) {
    let data = {
      codigoTabelaReferencia: table.refTableId,
      codigoMarca: year.brand.code,
      codigoModelo: year.model.code,
      codigoTipoVeiculo: vehicleTypeCode,
      anoModelo: year.year,
      codigoTipoCombustivel: year.fuelCode,
      tipoVeiculo: 'carro',
      modeloCodigoExterno: null,
      tipoConsulta: 'tradicional'
    };

    let opts = {
      method: 'POST',
      body: querystring.stringify(data),
      headers: default_headers,
      uri: `${base_url}/api/veiculos/ConsultarValorComTodosParametros`,
      json: true,
      transform: (vehicle) => {
        return new Vehicle(vehicle);
      }
    };

    return await request(opts);
  };
};