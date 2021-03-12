import { Type } from "../../../../models";
import uuid from "uuid";

class TypesService {
  constructor(public scrapperDbService) {}
  parseTypeData = async (name) => {
    return await this.pushType({ name });
  };

  pushType = async (type) => {
    const result = await this.scrapperDbService.pushMangaData(Type, type);
    return result.id;
  };
}

export { TypesService };
