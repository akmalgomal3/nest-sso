/** Types generated for queries found in "src/sql/get-user-by-username.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUserByName' parameters type */
export interface IGetUserByNameParams {
  name?: string | null | void;
}

/** 'GetUserByName' return type */
export interface IGetUserByNameResult {
  email: string;
  id: string;
  name: string;
  role: string;
}

/** 'GetUserByName' query type */
export interface IGetUserByNameQuery {
  params: IGetUserByNameParams;
  result: IGetUserByNameResult;
}

const getUserByNameIR: any = {"usedParamSet":{"name":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":72}]}],"statement":"SELECT id, name, email, role\nFROM usersSSO\nWHERE (name ILIKE '%' || :name || '%')"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, name, email, role
 * FROM usersSSO
 * WHERE (name ILIKE '%' || :name || '%')
 * ```
 */
export const getUserByName = new PreparedQuery<IGetUserByNameParams,IGetUserByNameResult>(getUserByNameIR);


