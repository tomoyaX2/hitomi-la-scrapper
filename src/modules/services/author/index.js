const { dbService } = require("../db");
const uuid = require("uuid");

class AuthorService {
  parseAuthorData = (author) => {
    const result = { id: uuid.v4(), name: author };
    return this.verifyExistedAuthor(result);
  };

  verifyExistedAuthor = (author) => {
    const existed = dbService.authors.find((el) => el.name === author.name);
    if (!existed) {
      dbService.pushAuthor(author);
      return author.id;
    }
    return existed.id;
  };
}

const authorService = new AuthorService();

module.exports = { authorService };
