const { scrapperDbService } = require("../db/scrapperDb.js");
const uuid = require("uuid");

class AuthorService {
  parseAuthorData = (author) => {
    const result = { id: uuid.v4(), name: author };
    return this.verifyExistedAuthor(result);
  };

  verifyExistedAuthor = (author) => {
    const existed = scrapperDbService.authors.find(
      (el) => el.name === author.name
    );
    if (!existed) {
      scrapperDbService.pushAuthor(author);
      return author.id;
    }
    return existed.id;
  };
}

const authorService = new AuthorService();

module.exports = { authorService };
