import http from "@/api";
import { ResPage } from "@/api/interface/index";

export interface OperationLog {
  id: number;
  operatorId: number;
  operatorName: string;
  module: string;
  action: string;
  method: string;
  requestParams: string;
  result: string;
  errorMsg: string;
  ip: string;
  costTime: number;
  createTime: string;
}

export interface LogQueryParams {
  page?: number;
  pageSize?: number;
  module?: string;
  action?: string;
  operatorName?: string;
  result?: string;
  startTime?: string;
  endTime?: string;
}

/** 分页查询操作日志 */
export const getOperationLogList = (params: LogQueryParams) => {
  return http.get<ResPage<OperationLog>>(`/v1/system/logs/list`, params);
};
