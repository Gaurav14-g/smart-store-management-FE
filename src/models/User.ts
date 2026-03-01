export interface User {
  id?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_client?: boolean;
  groups?: number[];
  groups_detail?: Array<{ id: number; name: string }>;
  hostname?: string | null;
  date_joined?: string;
  last_login?: string;
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  groups?: number[];
  is_active?: boolean;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  groups?: number[];
}

export const userSchema = {
  api: "users",
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
      options: [
        { value: "3", label: "Frontend Developer" },
        { value: "4", label: "Backend Developer" },
        { value: "5", label: "QA Engineer" },
        { value: "6", label: "Team Lead" },
      ],
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
      options: [
        { value: "3", label: "Frontend Developer" },
        { value: "4", label: "Backend Developer" },
        { value: "5", label: "QA Engineer" },
        { value: "6", label: "Team Lead" },
      ],
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
