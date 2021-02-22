const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");
const { Author } = require("../../../../models");

class AuthorService {
  parseAuthorData = async (author) => {
    const result = { id: uuid.v4(), name: author };
    return await this.verifyExistedAuthor(result);
  };

  verifyExistedAuthor = async (author) => {
    const result = await scrapperDbService.pushProjectData(Author, author);
    return result.id;
  };
}

const authorService = new AuthorService();

module.exports = { authorService };
