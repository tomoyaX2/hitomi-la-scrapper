const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");

class TypesService {
  parseTypeData = (type) => {
    const result = { id: uuid.v4(), name: type };
    return this.verifyExistedType(result);
  };

  verifyExistedType = (type) => {
    const existed = scrapperDbService.types.find((el) => el.name === type.name);
    if (!existed) {
      scrapperDbService.pushType(type);
      return type.id;
    }
    return existed.id;
  };
}

const typesService = new TypesService();

module.exports = { typesService };
