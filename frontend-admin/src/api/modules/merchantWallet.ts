import http from "@/api";

/** 商家钱包余额（单位：分） */
export const getMerchantBalance = () => {
  return http.get<{ balance: number }>("/v1/admin/merchant-wallet/balance");
};

/** 提取到银行卡（amount 单位：分） */
export const withdrawMerchant = (amount: number) => {
  return http.post("/v1/admin/merchant-wallet/withdraw", { amount }, { loading: false });
};

/** 商家钱包流水 */
export interface MerchantWalletLog {
  id: number;
  flowNo: string;
  userId: number;
  changeAmount: number;
  changeType: string;
  balanceAfter: number;
  orderNo: string | null;
  remark: string | null;
  createTime: string;
}

/** 分页查询商家钱包流水 */
export const getMerchantLogs = (params: { page: number; pageSize: number }) => {
  return http.get<{ records: MerchantWalletLog[]; total: number }>("/v1/admin/merchant-wallet/logs", params);
};
