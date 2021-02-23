const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");
const { Language } = require("../../../../../models");

class LanguageService {
  parseLanguageData = async (language) => {
    const result = { id: uuid.v4(), ...language };
    return await this.pushLanguage(result);
  };

  pushLanguage = async (language) => {
    const result = await scrapperDbService.pushProjectData(Language, language);
    return result.id;
  };
}

const languageService = new LanguageService();

module.exports = { languageService };
