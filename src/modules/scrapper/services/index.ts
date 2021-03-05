import { AlbumService } from "./album";
import { AuthorService } from "./author";
import { DbService } from "./db";
import { ScrapperDbService } from "./db/scrapperDb";
import { DownloadService } from "./download";
import { ImagesService } from "./images";
import { LanguageService } from "./language";
import { LogService } from "./log";
import { ProjectService } from "./project";
import { BuildProjectDepsService } from "./project/buildProjectDeps";
import { ScrapperService } from "./scrapper";
import { SelectElementService } from "./selectElement";
import { SeriesService } from "./series";
import { TagsService } from "./tags";
import { TypesService } from "./type";

const dbService = new DbService();
const scrapperDbService = new ScrapperDbService();
const albumService = new AlbumService(scrapperDbService);
const authorService = new AuthorService(scrapperDbService);
const logService = new LogService();
const imagesService = new ImagesService(scrapperDbService);
const downloadService = new DownloadService(
  scrapperDbService,
  dbService,
  imagesService,
  logService
);
const seriesService = new SeriesService(scrapperDbService);
const languageService = new LanguageService(scrapperDbService);
const typesService = new TypesService(scrapperDbService);
const buildProjectDepsService = new BuildProjectDepsService(
  seriesService,
  authorService,
  languageService,
  typesService
);
const projectService = new ProjectService(albumService, scrapperDbService);
const tagsService = new TagsService(dbService);
const selectElementService = new SelectElementService(
  tagsService,
  buildProjectDepsService,
  projectService,
  logService
);
const scrapperService = new ScrapperService(
  scrapperDbService,
  logService,
  downloadService,
  selectElementService
);

export {
  albumService,
  authorService,
  dbService,
  scrapperDbService,
  downloadService,
  imagesService,
  languageService,
  logService,
  buildProjectDepsService,
  projectService,
  scrapperService,
  selectElementService,
  seriesService,
  tagsService,
  typesService,
};
