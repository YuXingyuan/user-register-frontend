import type { User } from "../../redux/user/user.models";

export enum CellType {
  Label,
  Bool,
  Delete,
  DeleteSelect,
  Edit,
}

export type CellConfig = {
  key: keyof User;
  label: string;
  type: CellType;
};

export const config: readonly CellConfig[] = Object.freeze([
  {
    key: "id",
    label: "",
    type: CellType.DeleteSelect,
  },
  {
    key: "id",
    label: "Delete",
    type: CellType.Delete,
  },
  {
    key: "email",
    label: "Email",
    type: CellType.Label,
  },
  {
    key: "name",
    label: "Name",
    type: CellType.Label,
  },
  {
    key: "age",
    label: "Age",
    type: CellType.Label,
  },
  {
    key: "active",
    label: "Active",
    type: CellType.Bool,
  },
  {
    key: "emailSent",
    label: "Email Sent",
    type: CellType.Bool,
  },
  {
    key: "id",
    label: "Edit",
    type: CellType.Edit,
  },
]);
