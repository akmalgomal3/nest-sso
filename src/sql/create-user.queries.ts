/** Types generated for queries found in "src/sql/create-user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  email?: string | null | void;
  name?: string | null | void;
  password?: string | null | void;
  role?: string | null | void;
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  email: string;
  id: string;
  name: string;
  role: string;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"name":true,"email":true,"password":true,"role":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":59,"b":63}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":66,"b":71}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":82}]},{"name":"role","required":false,"transform":{"type":"scalar"},"locs":[{"a":85,"b":89}]}],"statement":"INSERT INTO usersSSO (name, email, password, role)\nVALUES (:name, :email, :password, :role)\n    RETURNING id, name, email, role"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO usersSSO (name, email, password, role)
 * VALUES (:name, :email, :password, :role)
 *     RETURNING id, name, email, role
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


