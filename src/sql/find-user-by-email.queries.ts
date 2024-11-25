/** Types generated for queries found in "src/sql/find-user-by-email.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByEmail' parameters type */
export interface IFindUserByEmailParams {
  email?: string | null | void;
}

/** 'FindUserByEmail' return type */
export interface IFindUserByEmailResult {
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
}

/** 'FindUserByEmail' query type */
export interface IFindUserByEmailQuery {
  params: IFindUserByEmailParams;
  result: IFindUserByEmailResult;
}

const findUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":72}]}],"statement":"SELECT id, name, email, password, role\nFROM usersSSO\nWHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name, email, password, role
 * FROM usersSSO
 * WHERE email = :email
 * ```
 */
export const findUserByEmail = new PreparedQuery<IFindUserByEmailParams,IFindUserByEmailResult>(findUserByEmailIR);


