/** Types generated for queries found in "src/sql/save-login-log.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'SaveLoginLogUser' parameters type */
export interface ISaveLoginLogUserParams {
  ipAddress?: string | null | void;
  latitude?: number | null | void;
  longitude?: number | null | void;
  userId?: string | null | void;
}

/** 'SaveLoginLogUser' return type */
export interface ISaveLoginLogUserResult {
  id: number;
  ip_address: string | null;
  latitude: number | null;
  login_time: Date | null;
  longitude: number | null;
  user_id: string | null;
}

/** 'SaveLoginLogUser' query type */
export interface ISaveLoginLogUserQuery {
  params: ISaveLoginLogUserParams;
  result: ISaveLoginLogUserResult;
}

const saveLoginLogUserIR: any = {"usedParamSet":{"userId":true,"ipAddress":true,"latitude":true,"longitude":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":77,"b":83}]},{"name":"ipAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":86,"b":95}]},{"name":"latitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":106}]},{"name":"longitude","required":false,"transform":{"type":"scalar"},"locs":[{"a":109,"b":118}]}],"statement":"INSERT INTO login_logsSSO (user_id, ip_address, latitude, longitude)\nVALUES (:userId, :ipAddress, :latitude, :longitude)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO login_logsSSO (user_id, ip_address, latitude, longitude)
 * VALUES (:userId, :ipAddress, :latitude, :longitude)
 * RETURNING *
 * ```
 */
export const saveLoginLogUser = new PreparedQuery<ISaveLoginLogUserParams,ISaveLoginLogUserResult>(saveLoginLogUserIR);


