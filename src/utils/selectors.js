const selectors = (el) => {
  return {
    mainPage: {
      ...el,
      selector: "h1.lillie a",
    },
    singleTitle: {
      ...el,
      referer: el.link,
      selector: "div.thumbnail-container a",
    },
    galleryPages: {
      ...el,
      isImage: true,
      referer: el.link,
      selector: "picture img",
    },
  };
};

module.exports = { selectors };
