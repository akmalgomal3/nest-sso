/** Types generated for queries found in "src/sql/update-user-email.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'UpdateUserEmail' parameters type */
export interface IUpdateUserEmailParams {
  email?: string | null | void;
  id?: string | null | void;
}

/** 'UpdateUserEmail' return type */
export interface IUpdateUserEmailResult {
  email: string;
  id: string;
  name: string;
  role: string;
}

/** 'UpdateUserEmail' query type */
export interface IUpdateUserEmailQuery {
  params: IUpdateUserEmailParams;
  result: IUpdateUserEmailResult;
}

const updateUserEmailIR: any = {"usedParamSet":{"email":true,"id":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":28,"b":33}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":48}]}],"statement":"UPDATE usersSSO\nSET email = :email\nWHERE id = :id\n    RETURNING id, name, email, role"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE usersSSO
 * SET email = :email
 * WHERE id = :id
 *     RETURNING id, name, email, role
 * ```
 */
export const updateUserEmail = new PreparedQuery<IUpdateUserEmailParams,IUpdateUserEmailResult>(updateUserEmailIR);


