export interface Client {
  id?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_client?: boolean;
  groups?: number[];
  groups_detail?: Array<{ id: number; name: string }>;
  hostname?: string | null;
}

export interface ClientCreate {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  groups?: number[];
  is_active?: boolean;
}

export interface ClientUpdate {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  groups?: number[];
}

export const clientSchema = {
  api: "clients",
  createField: [
    { name: "username", label: "Username", type: "text", required: true, placeholder: "Enter username" },
    { name: "password", label: "Password", type: "password", required: true, placeholder: "Enter password" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter email" },
    { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
    { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
    {
      name: "groups",
      label: "Role",
      type: "select",
      required: true,
      options: [],
    },
    { name: "is_active", label: "Active", type: "switch" },
  ],
  editField: [
    { name: "username", label: "Username", type: "text", required: true, placeholder: "Enter username" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter email" },
    { name: "first_name", label: "First Name", type: "text", placeholder: "Enter first name" },
    { name: "last_name", label: "Last Name", type: "text", placeholder: "Enter last name" },
    {
      name: "groups",
      label: "Role",
      type: "select",
      options: [],
    },
    { name: "is_active", label: "Active", type: "switch" },
  ],
  showField: [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "groups_detail", label: "Roles" },
    { key: "is_active", label: "Active", type: "status" },
    { key: "hostname", label: "Hostname" },
  ],
};
