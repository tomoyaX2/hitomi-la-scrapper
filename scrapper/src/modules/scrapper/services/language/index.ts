import { Language } from "../../../../models";
import uuid from "uuid";

class LanguageService {
  constructor(public scrapperDbService) {}
  parseLanguageData = async (language) => {
    return await this.pushLanguage(language);
  };

  pushLanguage = async (language) => {
    const result = await this.scrapperDbService.pushMangaData(
      Language,
      language
    );
    return result.id;
  };
}

export { LanguageService };
