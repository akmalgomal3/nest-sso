/** Types generated for queries found in "src/sql/get-user-by-id.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  id?: string | null | void;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  email: string;
  id: string;
  name: string;
  role: string;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":56}]}],"statement":"SELECT id, name, email, role\nFROM usersSSO\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name, email, role
 * FROM usersSSO
 * WHERE id = :id
 * ```
 */
export const getUserById = new PreparedQuery<IGetUserByIdParams,IGetUserByIdResult>(getUserByIdIR);


