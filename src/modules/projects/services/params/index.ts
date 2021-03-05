class ParamsService {
  params = { order: ["createdAt", "ASC"], limit: 1, offset: 0 }; //offset === page

  parseRequestQuery = (params) => {
    if (!params) {
      return;
    }
    this.handleLimit(params);
    this.handlePage(params);
    this.handleOrder(params);
  };

  handleOrder = (params) => {
    if (params.order) {
      const target = params.order.split(",");
      this.params.order = target;
    }
  };

  handleLimit = (params) => {
    if (params.limit) {
      this.params.limit = params.limit;
    }
  };

  handlePage = (params) => {
    if (params.offset) {
      this.params.offset = params.offset;
    }
  };
}
export { ParamsService };
