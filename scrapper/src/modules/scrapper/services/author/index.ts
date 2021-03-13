import { Author } from "../../../../../models";

class AuthorService {
  constructor(public scrapperDbService) {}
  parseAuthorData = async (author) => {
    const result = { name: author };
    return await this.pushAuthor(result);
  };

  pushAuthor = async (author) => {
    const result = await this.scrapperDbService.pushMangaData(Author, author);
    return result.id;
  };
}

export { AuthorService };
