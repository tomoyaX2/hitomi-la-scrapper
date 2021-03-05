const selectors = (el = {} as any) => {
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
    tags: {
      ...el,
      selector: "ul.tags li a",
    },
    project: {
      title: "h1 a",
      author: {
        ...el,
        selector: "h2 ul.comma-list li a",
      },
      language: {
        ...el,
        selector: "div.gallery-info table tbody tr td a",
      },
      type: {
        ...el,
        selector: "div.gallery-info table tbody tr td a",
      },
      series: {
        ...el,
        selector: "td ul.comma-list li a",
      },
    },
  };
};

export { selectors };
