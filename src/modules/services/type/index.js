const { dbService } = require("../db");
const uuid = require("uuid");

class TypesService {
  parseTypeData = (type) => {
    const result = { id: uuid.v4(), name: type };
    return this.verifyExistedType(result);
  };

  verifyExistedType = (type) => {
    const existed = dbService.types.find((el) => el.name === type.name);
    if (!existed) {
      dbService.pushType(type);
      return type.id;
    }
    return existed.id;
  };
}

const typesService = new TypesService();

module.exports = { typesService };
