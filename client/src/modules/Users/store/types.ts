import { Roles } from "../../../enums/roles";

export type UserData = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: string;
  isActive: boolean;
  isTwoFactorActive: boolean;
  name: string;
  phone: string;
  role: { name: Roles; id: string };
  updatedAt: string;
};
