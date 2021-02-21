const { dbService } = require("../db");
const uuid = require("uuid");

class LanguageService {
  parseLanguageData = (language) => {
    const result = { id: uuid.v4(), ...language };
    return this.verifyExistedLanguage(result);
  };

  verifyExistedLanguage = (language) => {
    const existed = dbService.languages.find((el) => el.abbr === language.abbr);
    if (!existed) {
      dbService.pushLanguage(language);
      return language.id;
    }
    return existed.id;
  };
}

const languageService = new LanguageService();

module.exports = { languageService };
