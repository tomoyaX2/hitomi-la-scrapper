export type Tag = {
  createdAt: string;
  id: string;
  name: string;
  type: "female" | "male";
  updatedAt: string;
};

export type Author = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type Type = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type Series = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type Language = {
  abbr: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type Image = {
  createdAt: string;
  id: string;
  name: string | null;
  referer: string;
  remoteUrl: string;
  updatedAt: string;
  url: string;
};

export type Album = {
  Images: Image[];
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type User = {};

export type Manga = {
  Album: Album;
  Tags: Tag[];
  album_id: string;
  author: Author;
  author_id: string;
  createdAt: string;
  id: string;
  language: Language;
  language_id: string;
  name: string;
  scrappedFrom: string;
  series: Series;
  series_id: string;
  type: Type;
  type_id: string;
  updatedAt: string;
  user: User;
  user_id: string;
};

export type Recomendations = {
  manga: Manga[];
};
