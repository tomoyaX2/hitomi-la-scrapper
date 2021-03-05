import { Language } from "../../../../models";
import uuid from "uuid";

class LanguageService {
  constructor(public scrapperDbService) {}
  parseLanguageData = async (language) => {
    const result = { id: uuid.v4(), ...language };
    return await this.pushLanguage(result);
  };

  pushLanguage = async (language) => {
    const result = await this.scrapperDbService.pushProjectData(
      Language,
      language
    );
    return result.id;
  };
}

export { LanguageService };
