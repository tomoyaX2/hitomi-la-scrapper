const fieldsToReturn = [
  "avatarUrl",
  "createdAt",
  "email",
  "id",
  "isActive",
  "isTwoFactorActive",
  "name",
  "phone",
  "role",
  "updatedAt",
];

class UserService {
  initSelectUserData = async () => {};
  formatUserDataToResponse = (user) => {
    const result = {};

    for (let field of fieldsToReturn) {
      result[field] = user[field];
    }

    return result;
  };
}

export { UserService };
