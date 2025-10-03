#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
program
    .name('create-ourui-app')
    .description('Create a new Electron + React + TypeScript application')
    .version('1.0.0');
program
    .argument('[project-name]', 'project name')
    .action(async (projectName) => {
    console.log(chalk_1.default.blue('🚀 Welcome to OurUI Electron App Scaffold!'));
    const config = await getProjectConfig(projectName);
    await createProject(config);
});
async function getProjectConfig(projectName) {
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: projectName || 'my-electron-app',
            validate: (input) => {
                if (!input.trim())
                    return 'Project name is required';
                if (!/^[a-z0-9-_]+$/.test(input))
                    return 'Project name should only contain lowercase letters, numbers, hyphens, and underscores';
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Project description:',
            default: 'My Electron application description'
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author name:',
            default: 'Your Name'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Author email:',
            default: 'your.email@example.com'
        },
        {
            type: 'input',
            name: 'manufacturer',
            message: 'Manufacturer (for Windows installer):',
            default: 'Your Company'
        }
    ];
    return await inquirer_1.default.prompt(questions);
}
async function createProject(config) {
    const targetDir = path_1.default.join(process.cwd(), config.projectName);
    // 检查目录是否已存在
    if (await fs_extra_1.default.pathExists(targetDir)) {
        console.log(chalk_1.default.red(`❌ Directory ${config.projectName} already exists!`));
        return;
    }
    console.log(chalk_1.default.yellow('📁 Creating project directory...'));
    await fs_extra_1.default.ensureDir(targetDir);
    console.log(chalk_1.default.yellow('📋 Copying template files...'));
    // 获取模板目录路径 - 支持全局安装和本地使用
    const templateDir = getTemplatePath();
    await fs_extra_1.default.copy(templateDir, targetDir);
    console.log(chalk_1.default.yellow('⚙️  Configuring project files...'));
    await configureProject(targetDir, config);
    console.log(chalk_1.default.green('✅ Project created successfully!'));
    console.log(chalk_1.default.blue(`\n📖 Next steps:`));
    console.log(chalk_1.default.white(`  cd ${config.projectName}`));
    console.log(chalk_1.default.white(`  npm install`));
    console.log(chalk_1.default.white(`  npm start`));
}
function getTemplatePath() {
    // 尝试不同的路径来找到模板目录
    const possiblePaths = [
        // 开发环境路径
        path_1.default.join(__dirname, '../templates'),
        // 全局安装路径
        path_1.default.join(__dirname, '../../templates'),
        // npm包安装路径
        path_1.default.join(__dirname, '../node_modules/ourui-electron-scaffold/templates'),
        // 当前目录
        path_1.default.join(process.cwd(), 'templates')
    ];
    for (const templatePath of possiblePaths) {
        if (fs_extra_1.default.existsSync(templatePath)) {
            return templatePath;
        }
    }
    throw new Error('Template directory not found. Please ensure the package is properly installed.');
}
async function configureProject(projectDir, config) {
    // 更新 package.json
    const packageJsonPath = path_1.default.join(projectDir, 'package.json');
    const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
    packageJson.name = config.projectName;
    packageJson.productName = config.projectName;
    packageJson.description = config.description;
    packageJson.author = {
        name: config.author,
        email: config.email
    };
    await fs_extra_1.default.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    // 更新 forge.config.ts
    const forgeConfigPath = path_1.default.join(projectDir, 'forge.config.ts');
    let forgeConfig = await fs_extra_1.default.readFile(forgeConfigPath, 'utf-8');
    forgeConfig = forgeConfig.replace(/manufacturer: 'OurUI'/g, `manufacturer: '${config.manufacturer}'`);
    forgeConfig = forgeConfig.replace(/name: 'OurUI Tool V3'/g, `name: '${config.projectName}'`);
    forgeConfig = forgeConfig.replace(/description: 'OurUI Tool V3'/g, `description: '${config.description}'`);
    await fs_extra_1.default.writeFile(forgeConfigPath, forgeConfig);
    // 更新 README.md
    const readmePath = path_1.default.join(projectDir, 'README.md');
    let readme = await fs_extra_1.default.readFile(readmePath, 'utf-8');
    readme = readme.replace(/\{\{projectName\}\}/g, config.projectName);
    readme = readme.replace(/\{\{description\}\}/g, config.description);
    readme = readme.replace(/\{\{author\}\}/g, config.author);
    readme = readme.replace(/\{\{email\}\}/g, config.email);
    await fs_extra_1.default.writeFile(readmePath, readme);
}
program.parse();
//# sourceMappingURL=index.js.map