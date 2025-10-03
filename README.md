# OurUI Electron 脚手架工具

一个用于快速创建 Electron + React + TypeScript 应用的脚手架工具。

## 特性

- 🚀 **快速创建** - 一键生成完整的 Electron 项目结构
- 🎨 **现代技术栈** - Electron + React + TypeScript + Ant Design
- 📦 **开箱即用** - 预配置的 Webpack、ESLint、数据库等
- 🔧 **可定制** - 支持项目名称、作者信息等自定义配置
- 💾 **数据库支持** - 内置 SQLite + Drizzle ORM
- 🎯 **类型安全** - 完整的 TypeScript 支持

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **React 18** - 现代化的用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design** - 企业级 UI 组件库
- **Drizzle ORM** - 类型安全的数据库 ORM
- **Better SQLite3** - 高性能 SQLite 数据库
- **Webpack** - 模块打包工具
- **ESLint** - 代码质量检查

## 安装

### 全局安装（推荐）

```bash
npm install -g ourui-electron-scaffold
```

### 使用 npx（无需安装）

```bash
npx ourui-electron-scaffold
```

## 使用方法

### 交互式创建项目

```bash
create-ourui-app
```

或使用 npx：

```bash
npx ourui-electron-scaffold
```

### 指定项目名称

```bash
create-ourui-app my-awesome-app
```

或使用 npx：

```bash
npx ourui-electron-scaffold my-awesome-app
```

### 完整示例

```bash
# 方式1：全局安装后使用
npm install -g ourui-electron-scaffold
create-ourui-app my-electron-app

# 方式2：直接使用 npx（推荐）
npx ourui-electron-scaffold my-electron-app

# 进入项目目录
cd my-electron-app

# 安装依赖
npm install

# 启动开发服务器
npm start

# 打包应用
npm run package

# 构建安装包
npm run make
```

## 发布到 npm

如果你想将脚手架发布到 npm，可以按以下步骤操作：

### 1. 准备发布

```bash
cd scaffold

# 确保已构建
npm run build

# 检查包内容
npm pack --dry-run
```

### 2. 发布到 npm

```bash
# 登录 npm（如果还没登录）
npm login

# 发布包
npm publish
```

### 3. 使用已发布的包

发布成功后，其他人就可以通过以下方式使用：

```bash
# 全局安装
npm install -g ourui-electron-scaffold

# 或直接使用
npx ourui-electron-scaffold my-project
```

## 项目结构

生成的项目包含以下结构：

```
my-electron-app/
├── src/
│   ├── assets/          # 静态资源（图标等）
│   ├── components/      # React 组件
│   │   ├── UserForm.tsx
│   │   └── UserList.tsx
│   ├── pages/          # 页面组件
│   │   ├── About.tsx
│   │   ├── Home.tsx
│   │   └── UserManagement.tsx
│   ├── services/       # 业务逻辑服务
│   │   ├── database.ts
│   │   ├── databaseService.ts
│   │   └── userService.ts
│   ├── AppRouter.tsx   # 路由配置
│   ├── index.html      # 主 HTML 文件
│   ├── index.ts        # Electron 主进程
│   ├── renderer.ts     # 渲染进程入口
│   ├── preload.ts      # 预加载脚本
│   └── index.css       # 全局样式
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
├── forge.config.ts     # Electron Forge 配置
├── webpack.*.ts        # Webpack 配置文件
├── .eslintrc.json      # ESLint 配置
├── .gitignore          # Git 忽略文件
└── README.md           # 项目说明
```

## 配置选项

脚手架工具会提示您输入以下配置：

- **项目名称** - 项目的名称（用于 package.json 和目录名）
- **项目描述** - 项目的简短描述
- **作者姓名** - 作者的姓名
- **作者邮箱** - 作者的邮箱地址
- **制造商** - Windows 安装包的制造商信息

## 开发命令

生成的项目包含以下 npm 脚本：

```bash
npm start       # 启动开发服务器
npm run lint    # 运行 ESLint 检查
npm run package # 打包应用（不创建安装包）
npm run make    # 创建平台特定的安装包
npm run publish # 发布应用（需要配置发布设置）
```

## 内置功能

### 用户管理示例

项目包含一个完整的用户管理示例，展示了：

- React 组件开发
- 数据库操作（增删改查）
- 主进程与渲染进程通信
- TypeScript 类型定义
- Ant Design 组件使用

### 数据库支持

- 使用 Better SQLite3 作为数据库引擎
- Drizzle ORM 提供类型安全的数据库操作
- 预定义的用户表结构和服务

### 打包配置

- 支持 Windows、macOS、Linux 平台
- 预配置的 Electron Forge 打包设置
- Windows MSI 安装包支持
- 应用图标和元数据配置

## 自定义和扩展

### 添加新页面

1. 在 `src/pages/` 目录下创建新的 React 组件
2. 在 `src/AppRouter.tsx` 中添加路由配置

### 添加新的数据库表

1. 在 `src/services/database.ts` 中定义表结构
2. 创建对应的服务文件处理业务逻辑
3. 在主进程中注册 IPC 处理程序

### 修改 UI 主题

项目使用 Ant Design，可以通过以下方式自定义主题：

1. 修改 `src/index.css` 中的 CSS 变量
2. 使用 Ant Design 的主题定制功能

## 故障排除

### 常见问题

1. **安装依赖失败**
   - 确保 Node.js 版本 >= 16
   - 尝试清除 npm 缓存：`npm cache clean --force`

2. **启动失败**
   - 检查端口是否被占用
   - 确保所有依赖都已正确安装

3. **打包失败**
   - 确保有足够的磁盘空间
   - 检查 forge.config.ts 中的配置

### 获取帮助

如果遇到问题，可以：

1. 查看生成项目的 README.md 文件
2. 检查 Electron Forge 官方文档
3. 提交 Issue 到项目仓库

## 许可证

MIT License

## 作者

wz2cool (wz2cool@live.cn)

## 项目结构

生成的项目包含以下结构：

```
my-electron-app/
├── src/
│   ├── assets/          # 静态资源（图标等）
│   ├── components/      # React 组件
│   │   ├── UserForm.tsx
│   │   └── UserList.tsx
│   ├── pages/          # 页面组件
│   │   ├── About.tsx
│   │   ├── Home.tsx
│   │   └── UserManagement.tsx
│   ├── services/       # 业务逻辑服务
│   │   ├── database.ts
│   │   ├── databaseService.ts
│   │   └── userService.ts
│   ├── AppRouter.tsx   # 路由配置
│   ├── index.html      # 主 HTML 文件
│   ├── index.ts        # Electron 主进程
│   ├── renderer.ts     # 渲染进程入口
│   ├── preload.ts      # 预加载脚本
│   └── index.css       # 全局样式
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
├── forge.config.ts     # Electron Forge 配置
├── webpack.*.ts        # Webpack 配置文件
├── .eslintrc.json      # ESLint 配置
├── .gitignore          # Git 忽略文件
└── README.md           # 项目说明
```

## 配置选项

脚手架工具会提示您输入以下配置：

- **项目名称** - 项目的名称（用于 package.json 和目录名）
- **项目描述** - 项目的简短描述
- **作者姓名** - 作者的姓名
- **作者邮箱** - 作者的邮箱地址
- **制造商** - Windows 安装包的制造商信息

## 开发命令

生成的项目包含以下 npm 脚本：

```bash
npm start       # 启动开发服务器
npm run lint    # 运行 ESLint 检查
npm run package # 打包应用（不创建安装包）
npm run make    # 创建平台特定的安装包
npm run publish # 发布应用（需要配置发布设置）
```

## 内置功能

### 用户管理示例

项目包含一个完整的用户管理示例，展示了：

- React 组件开发
- 数据库操作（增删改查）
- 主进程与渲染进程通信
- TypeScript 类型定义
- Ant Design 组件使用

### 数据库支持

- 使用 Better SQLite3 作为数据库引擎
- Drizzle ORM 提供类型安全的数据库操作
- 预定义的用户表结构和服务

### 打包配置

- 支持 Windows、macOS、Linux 平台
- 预配置的 Electron Forge 打包设置
- Windows MSI 安装包支持
- 应用图标和元数据配置

## 自定义和扩展

### 添加新页面

1. 在 `src/pages/` 目录下创建新的 React 组件
2. 在 `src/AppRouter.tsx` 中添加路由配置

### 添加新的数据库表

1. 在 `src/services/database.ts` 中定义表结构
2. 创建对应的服务文件处理业务逻辑
3. 在主进程中注册 IPC 处理程序

### 修改 UI 主题

项目使用 Ant Design，可以通过以下方式自定义主题：

1. 修改 `src/index.css` 中的 CSS 变量
2. 使用 Ant Design 的主题定制功能

## 故障排除

### 常见问题

1. **安装依赖失败**
   - 确保 Node.js 版本 >= 16
   - 尝试清除 npm 缓存：`npm cache clean --force`

2. **启动失败**
   - 检查端口是否被占用
   - 确保所有依赖都已正确安装

3. **打包失败**
   - 确保有足够的磁盘空间
   - 检查 forge.config.ts 中的配置

### 获取帮助

如果遇到问题，可以：

1. 查看生成项目的 README.md 文件
2. 检查 Electron Forge 官方文档
3. 提交 Issue 到项目仓库

## 许可证

MIT License

## 作者

wz2cool (wz2cool@live.cn)