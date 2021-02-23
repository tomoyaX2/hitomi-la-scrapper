const {
  ProjectTags,
  Projects,
  Tag,
  Album,
  Images,
  AlbumImages,
} = require("../../../../../models");

class DbService {
  createProjectTagRelation = async (ProjectId, tagIds) => {
    const data = await Projects.findOne({
      where: { id: ProjectId },
      include: Tag,
    });
    const existedTags = !!data ? data.Tags.map((el) => el.id) : [];

    for (let TagId of tagIds) {
      const isAlreadyAssign = existedTags.some((el) => el === TagId);
      if (!isAlreadyAssign) {
        await ProjectTags.create({ ProjectId, TagId });
      }
    }
  };

  createAlbumImageRelation = async (AlbumId, imageIds) => {
    const data = await Album.findOne({
      where: { id: AlbumId },
      include: Images,
    });
    const existedTags = !!data ? data.Images.map((el) => el.id) : [];

    for (let ImageId of imageIds) {
      const isAlreadyAssign = existedTags.some((el) => el === ImageId);
      if (!isAlreadyAssign) {
        await AlbumImages.create({ AlbumId, ImageId });
      }
    }
  };
}

const dbService = new DbService();

module.exports = { dbService };
