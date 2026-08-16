# 食堂订餐系统 — 测试与部署指南

> 供面试演示使用。系统分三端：**系统管理后台**（PC）、**食堂端**（App 内）、**用户端**（App 内）。
> 技术栈：Spring Boot 3.2 + MyBatis-Plus + Sa-Token（后端 8000）、Vue 3（管理端 Element Plus / 用户端 uni-app）、MySQL 8 + Redis 7（docker-compose）。

## 一、默认账号与初始准备

- 首次启动后端会自动创建**系统管理员**：`admin / 123456`（角色 ADMIN_SYSTEM，登录 PC 后台）。
- **普通用户**：自助注册 —— App 普通用户登录页「注册」Tab，填 昵称 + 手机号 + 验证码 + 密码，注册即登录（默认角色 `USER_PATIENT`）。
- **食堂管理员**：由系统管理员在 PC「人员管理 → 开通食堂账号」创建，需填写 用户名 + 手机号 + **验证码确认**；默认密码 `123456`，App 食堂登录页用 用户名 + 密码 登录（首次登录强制改密）。
- **注销食堂账号**：PC「人员管理 → 注销」，需 **验证码确认**（软禁用 `status=0`，非删除）。
- 验证码是 **mock**：用户端点「获取验证码」后 Toast 显示并自动填入；PC 管理端仅 Toast 提示，需手动输入（后端仍存 Redis 校验）。

## 二、本地启动（开发/演示）

```bash
# 1. 基础设施（MySQL + Redis）
docker-compose up -d

# 2. 后端
cd backend
mvn spring-boot:run          # http://localhost:8000

# 3. 管理后台（PC）
cd frontend-admin
npm install && npm run dev   # http://localhost:8848

# 4. 用户端/食堂端 H5
cd frontend-user
npm install && npm run dev:h5 # http://localhost:5173
```

## 三、端到端测试清单

| # | 场景 | 操作 | 预期 |
|---|------|------|------|
| 1 | 管理员登录 | PC 后台 `admin/123456` | 进入首页 |
| 2 | 系统配置 | 系统管理 → 系统配置 | 改「取餐超时时间」「餐次时段」保存成功 |
| 3 | 人员管理 | 系统管理 → 人员管理 | 开通食堂账号、注销（均需验证码确认） |
| 4 | 菜品管理 | App 食堂端 → 菜品管理 | 新增早/中/晚餐菜品、上传图片、上下架 |
| 5 | 用户注册/登录 | App 用户端「注册」Tab 注册 → 手机号 + 密码登录 | 注册即登录进入首页；再次登录用手机号 + 密码成功 |
| 6 | 订餐支付 | 用户端选菜 → 提交订单 → 确认面板 | 余额充足绿色「确认支付」；不足灰色「余额不足，去充值」 |
| 7 | 钱包充值 | 用户端「我的」→ 钱包 → 充值 | 选金额 → 微信/支付宝 → 假 loading 1.5s → 余额增加 |
| 8 | 申请退款 | 钱包 → 申请退款 | 输入金额 → 选微信/支付宝 → 余额减少 + 消息「退款成功」 |
| 9 | 食堂备餐 | App 食堂端工作台 | 开始备餐 → 备餐完成，金额显示正常（非 100 倍） |
| 10 | 核销 | 食堂端工作台：扫码核销（扫订单二维码=订单号）/ 输码核销（输 4 位取餐码） | READY 订单核销成功，状态变 COMPLETED |
| 11 | 取消订单 | 用户端 PENDING 订单取消 | 余额退回 + 商家冲正 + 库存恢复 |
| 12 | 超时作废 | 系统配置把超时时间调小 → 等 | READY 订单变 EXPIRED（不退款）；超时前 20 分钟有提醒 |
| 13 | 商家钱包 | PC 后台 → 商家钱包 | 余额、提取到银行卡、流水（含订单收入 INCOME） |
| 14 | 消息通知 | 用户端「消息通知」 | 退款成功/订单状态等消息可见、未读角标 |
| 15 | 操作日志 | PC 后台 → 操作日志 | 操作人显示真实用户名（非「未登录」） |
| 16 | 取餐二维码 | 用户端订单详情（待取餐 READY） | 显示取餐二维码 + 4 位取餐码 |

## 四、云服务器部署

### 1. 环境准备
```bash
# 安装 Docker + Compose、JDK 17、Maven、Node 18+、Nginx（以 Ubuntu 为例）
sudo apt update
sudo apt install -y openjdk-17-jdk maven nginx
# Node 建议用 nvm 装 18+
```

### 2. 启动基础设施
```bash
docker-compose up -d   # 首次会执行 docker/mysql/init.sql 建库建表
```

### 3. 部署后端
```bash
cd backend
mvn clean package -DskipTests
nohup java -jar target/*.jar > app.log 2>&1 &   # 监听 8000
```
> 上传目录默认绝对路径（`application.yml` 中 `canteen.upload-path`），可用环境变量 `CANTEEN_UPLOAD_PATH` 覆盖。

### 4. 打包前端
```bash
# 管理后台
cd frontend-admin && npm install && npm run build:pro   # 产出 dist/
# 用户端 H5 / 微信小程序
cd frontend-user && npm install && npm run build:h5          # 产出 dist/build/h5/
npm run build:mp-weixin                                      # 产出 dist/build/mp-weixin/
```

### 5. 配置 Nginx（示例：两个子域名）
- `admin.example.com` → 管理后台 `frontend-admin/dist`
- `app.example.com`  → 用户端 `frontend-user/dist/build/h5`
- `/api`、`/ws`、`/uploads` → 反代到 `127.0.0.1:8000`

```nginx
# 管理后台
server {
    listen 80;
    server_name admin.example.com;
    root /www/frontend-admin/dist;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }

    location /api/ { proxy_pass http://127.0.0.1:8000; proxy_set_header Host $host; }
    location /uploads/ { proxy_pass http://127.0.0.1:8000; }
}

# 用户端 / 食堂端 H5
server {
    listen 80;
    server_name app.example.com;
    root /www/frontend-user/dist/build/h5;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }

    location /api/ { proxy_pass http://127.0.0.1:8000; proxy_set_header Host $host; }
    location /uploads/ { proxy_pass http://127.0.0.1:8000; }

    # WebSocket
    location /ws {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

> 无域名时可用「两个端口」代替子域名：如 `admin` 监听 8081、`app` 监听 8082，各配一条 server 块。

### 6.（可选）HTTPS
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d admin.example.com -d app.example.com
```

## 五、已知边界与安全提示（演示够用，勿用于真实生产）

- 密码为 **MD5**、JWT 密钥/数据库密码(root/root)/Redis 密码(123456) 均为明文 —— 仅演示。
- 金额统一按「分」存储，前端展示 `/100`。
- 商家入账后若先提现、随后订单取消，商家余额可能为负（`reverseIncome` 未做下限校验）。
- 并发扣库存/扣余额为「读-改-写」非原子模式，本规模下可接受。
- 微信小程序（非 H5）分支仍硬编码后端地址 `192.168.126.220:8000`，H5 部署不受影响；打包小程序前需改成服务器地址。
- 超时作废（EXPIRED）不自动退款，金额交易待完善。
- 未实现占位：用户端「活动中心」、食堂端「核销明细 / 售卖明细」、PC 后台「统计看板 → 数据概览」（遗留模板假数据）。
