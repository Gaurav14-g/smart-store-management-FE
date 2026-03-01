export interface Role {
  id?: number;
  name: string;
  permissions?: number[];
  permissions_detail?: Array<{
    id: number;
    name: string;
    codename: string;
  }>;
}

export interface RoleCreate {
  name: string;
  permissions: number[];
}

export interface RoleUpdate {
  name?: string;
  permissions?: number[];
}

export const roleSchema = {
  api: "permission",
  createField: [
    { name: "name", label: "Role Name", type: "text", required: true, placeholder: "Enter role name" },
    { name: "permissions", label: "Permissions", type: "checkbox-group", required: true, options: [] },
  ],
  editField: [
    { name: "name", label: "Role Name", type: "text", required: true, placeholder: "Enter role name" },
    { name: "permissions", label: "Permissions", type: "checkbox-group", options: [] },
  ],
  showField: [
    { key: "id", label: "ID" },
    { key: "name", label: "Role Name" },
    { key: "permissions_detail", label: "Permissions" },
  ],
};
