export type User = {
  id: number;
  userstatus: string;
  password: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  date_of_birth?: Date;
  date_of_hire?: Date;
  employment_type?: string;
  supervisor_id?: number;
  qualification?: string;
  work_location?: string;
  salary?: number;
  notes?: string;
  phone?: string;
  gender?: string;
  nationality?: string;
};
