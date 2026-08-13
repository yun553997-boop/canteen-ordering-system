import http from "@/api";

export interface OverviewData {
  cards: {
    totalOrders: number;
    pendingPickup: number;
    completed: number;
    cancelled: number;
  };
  trend: { label: string; count: number }[];
  statusRatio: { name: string; value: number }[];
  topDishes: { dishName: string; quantity: number }[];
}

/** 获取数据看板概览 */
export const getStatisticsOverview = (params: Record<string, any> = {}) => {
  return http.get<OverviewData>(`/v1/admin/statistics/overview`, params);
};

/** 导出订单报表（后端 export 为 GET，返回 xlsx 二进制流） */
export const exportOrderExcel = (params: { startTime?: string; endTime?: string } = {}) => {
  return http.get(`/v1/admin/statistics/export`, params, { responseType: "blob" }) as unknown as Promise<Blob>;
};
