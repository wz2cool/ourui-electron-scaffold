# {{projectName}}

{{description}}

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **React** - 用户界面库
- **TypeScript** - 类型安全的JavaScript
- **Ant Design** - React UI组件库
- **Drizzle ORM** - 类型安全的数据库ORM
- **Better SQLite3** - 高性能SQLite数据库
- **Webpack** - 模块打包工具

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 代码检查
npm run lint

# 打包应用
npm run package

# 构建安装包
npm run make
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # React组件
├── pages/          # 页面组件
├── services/       # 业务逻辑服务
├── index.html      # 主HTML文件
├── index.ts        # Electron主进程
├── renderer.ts     # 渲染进程入口
├── preload.ts      # 预加载脚本
└── index.css       # 全局样式
```

## 功能特性

- ✅ 现代化的Electron + React + TypeScript架构
- ✅ 集成Ant Design UI组件库
- ✅ 内置SQLite数据库支持
- ✅ 类型安全的数据库操作
- ✅ 热重载开发环境
- ✅ ESLint代码规范检查
- ✅ 跨平台打包支持

## 作者

{{author}} ({{email}})

## 许可证

MIT