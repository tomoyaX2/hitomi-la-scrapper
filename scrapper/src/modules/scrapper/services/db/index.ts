import {
  Album,
  AlbumImage,
  Image,
  Project,
  ProjectTag,
  Tag,
} from "../../../../models";

class DbService {
  createProjectTagRelation = async (ProjectId, tagIds) => {
    const data = await Project.findOne({
      where: { id: ProjectId },
      include: Tag,
    });
    const existedTags = !!data ? data.Tags.map((el) => el.id) : [];

    for (let TagId of tagIds) {
      const isAlreadyAssign = existedTags.some((el) => el === TagId);
      if (!isAlreadyAssign) {
        await ProjectTag.create({ ProjectId, TagId } as any);
      }
    }
  };

  createAlbumImageRelation = async (AlbumId, imageIds) => {
    const data = await Album.findOne({
      where: { id: AlbumId },
      include: Image,
    });
    const existedTags = !!data ? data.Images.map((el) => el.id) : [];

    for (let ImageId of imageIds) {
      const isAlreadyAssign = existedTags.some((el) => el === ImageId);
      if (!isAlreadyAssign) {
        await AlbumImage.create({ AlbumId, ImageId } as any);
      }
    }
  };
}

export { DbService };
