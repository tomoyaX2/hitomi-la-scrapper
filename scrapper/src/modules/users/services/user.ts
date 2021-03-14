import { UserFields } from "../../../../models/user";

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
  "isPhoneSubmitted",
];

const expectedCredentialFieldsToUpdate = ["login", "password"];
const expectedUserFieldsToUpdate = [
  "name",
  "email",
  "phone",
  "isTwoFactorActive",
];

class UserService {
  constructor(
    public secureService,
    public verificationService,
    public fileSystemService
  ) {}
  formatUserDataToResponse = (credential) => {
    const result = {} as UserFields & { login: string; credentialId: string };
    for (let field of fieldsToReturn) {
      result[field] = credential.User[field];
    }
    result.login = credential.login;
    result.credentialId = credential.id;
    return result;
  };

  formatUserAndCredentialsDataToUpdate = async (data) => {
    const credentialFields = {};
    const userFields = {} as UserFields;
    const hasPassword = !!data.password;
    const targetCredentialFields = hasPassword
      ? expectedCredentialFieldsToUpdate
      : expectedCredentialFieldsToUpdate.filter((el) => el !== "password");
    for (let credentialField of targetCredentialFields) {
      if (credentialField === "password") {
        credentialFields[credentialField] = this.secureService.createHash(
          data[credentialField]
        );
      } else {
        credentialFields[credentialField] = data[credentialField];
      }
    }
    for (let userField of expectedUserFieldsToUpdate) {
      userFields[userField] = data[userField];
    }
    const isChangedAvatar = data.avatarUrl.startsWith("data:image");
    if (!!data.avatarUrl && isChangedAvatar) {
      const avatarPath = await this.fileSystemService.writeAvatar(
        data.id,
        data.avatarUrl
      );
      userFields.avatarUrl = avatarPath;
    }
    return { credentialFields, userFields };
  };
}

export { UserService };
