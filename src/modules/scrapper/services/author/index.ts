import { Author } from "../../../../models";
import uuid from "uuid";

class AuthorService {
  constructor(public scrapperDbService) {}
  parseAuthorData = async (author) => {
    const result = { id: uuid.v4(), name: author };
    return await this.pushAuthor(result);
  };

  pushAuthor = async (author) => {
    const result = await this.scrapperDbService.pushProjectData(Author, author);
    return result.id;
  };
}

export { AuthorService };
