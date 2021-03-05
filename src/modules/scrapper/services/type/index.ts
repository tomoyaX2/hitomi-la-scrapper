import { Type } from "../../../../models";
import uuid from "uuid";

class TypesService {
  constructor(public scrapperDbService) {}
  parseTypeData = async (type) => {
    const result = { id: uuid.v4(), name: type };
    return await this.pushType(result);
  };

  pushType = async (type) => {
    const result = await this.scrapperDbService.pushProjectData(Type, type);
    return result.id;
  };
}

export { TypesService };
