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
| 管理后台前端 | Vue 3 + Vite |
| 用户端前端 | Vue 3 + Vite + Vant UI |

## 项目结构

```
canteen-ordering-system/
├── backend/                  # Spring Boot 后端服务（端口 8000）
├── frontend-admin/           # 管理后台（Vue 3）
├── frontend-user/            # 用户端（Vue 3）
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
# 管理后台
cd frontend-admin
npm install
npm run dev

# 用户端
cd frontend-user
npm install
npm run dev
```

## 用户角色

| 角色 | 说明 | 登录方式 |
|------|------|----------|
| 系统管理员 (ROOT) | 最高权限，数据库脚本初始化 | 用户名 + 密码 |
| IT 管理员 | ROOT 在后台手动添加 | 用户名/工号 + 密码 |
| 食堂员工 | 管理员在后台"员工管理"创建 | 手机号/工号 + 初始密码 |
| 普通用户/患者陪护 | 自主注册 | 手机号 + 验证码 |
