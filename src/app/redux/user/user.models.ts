export type User = {
  id?: string;
  name: string;
  email?: string;
  age: number;
  active?: boolean;
  emailSent?: boolean;
};

export type UserForm = User & {
  selected: boolean;
};

export type UserData = Omit<User, "age"> & { age: string };

export type UserError = {
  message: string;
};

export interface UserState {
  userList: UserForm[];
  loading: boolean;
  error: string | null;
}
