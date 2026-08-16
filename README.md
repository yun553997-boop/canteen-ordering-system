# 食堂订餐系统 (Canteen Ordering System)

机构业务系统（B2B2C），为医院/机构提供食堂订餐管理服务。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | Spring Boot 3.2 + Java 17 |
| ORM | MyBatis-Plus 3.5 |
| 鉴权 | Sa-Token (RBAC + JWT) |
| 数据库 | MySQL 8.0 |
| 缓存 | Redis 7.0 |
| 管理后台前端 | Vue 3 + Vite + Element Plus + ECharts + Pinia |
| 用户端前端 | uni-app (Vue 3) + NutUI，多端 H5 / 微信小程序 |

## 项目结构

```
canteen-ordering-system/
├── backend/                  # Spring Boot 后端服务（端口 8000）
├── frontend-admin/           # 系统管理后台（PC，Vue 3）
├── frontend-user/            # 用户端 + 食堂端（uni-app，H5 / 微信小程序）
├── docker/                   # Docker 数据持久化目录
└── docker-compose.yml        # MySQL + Redis 容器编排
```

## 快速启动

### 1. 启动基础设施

```bash
docker-compose up -d
```

### 2. 启动后端

```bash
cd backend
mvn spring-boot:run
```

后端运行在 http://localhost:8000

### 3. 启动前端

```bash
# 系统管理后台（PC）
cd frontend-admin
npm install
npm run dev

# 用户端 / 食堂端（H5）
cd frontend-user
npm install
npm run dev:h5

# 用户端 / 食堂端（微信小程序）
npm run dev:mp-weixin   # 再用微信开发者工具导入 dist/dev/mp-weixin
```

## 用户角色

| 角色 | 说明 | 创建方式 | 登录方式 |
|------|------|----------|----------|
| 系统管理员 (ADMIN_SYSTEM) | 最高权限，管理后台 | 数据库初始化 `admin / 123456` | 用户名 + 密码 |
| 食堂管理员 (ADMIN_CANTEEN) | 食堂工作台 / 菜品 / 核销 | 系统管理员「人员管理」开通（需验证码） | 用户名 + 密码（默认 123456） |
| 普通用户 (USER_PATIENT / USER_STAFF) | 点餐下单 | 自助注册（手机号 + 验证码 + 密码） | 手机号 + 密码 |

> 金额统一按「分」存储，前端展示 `/100`；验证码为 mock（Toast 显示并自动填入）。

## 核心功能

- **用户端**：点餐下单（早/午/晚餐次 + 购物车）、钱包余额支付 / 充值 / 退款、订单生命周期（备餐前无责取消、超时作废）、待取餐二维码 + 4 位取餐码、消息通知。
- **食堂端**：工作台（今日统计 + 订单下拉查看菜品明细）、备餐流转（开始备餐 → 备餐完成）、扫码核销 / 输码核销、菜品管理（分类 / 上下架 / 每日限量 / 图片上传）。
- **系统管理后台**：数据看板（订单统计 / 趋势 / TOP 菜品 + 报表导出）、人员管理（开通 / 注销食堂账号，需验证码）、系统配置（取餐超时时间、餐次时段）、商家钱包与流水、操作日志。
