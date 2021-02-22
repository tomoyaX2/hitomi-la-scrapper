const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");
const { Type } = require("../../../../models");

class TypesService {
  parseTypeData = async (type) => {
    const result = { id: uuid.v4(), name: type };
    return await this.verifyExistedType(result);
  };

  verifyExistedType = async (type) => {
    const result = await scrapperDbService.pushProjectData(Type, type);
    return result.id;
  };
}

const typesService = new TypesService();

module.exports = { typesService };
