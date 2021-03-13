class LocalStorageService {
  setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  removeToken = () => {
    localStorage.removeItem("token");
  };

  clearStorage = () => {
    localStorage.clear();
  };
}

const localStorageService = new LocalStorageService();

export { localStorageService };
