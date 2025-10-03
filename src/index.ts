#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const program = new Command();

interface ProjectConfig {
  projectName: string;
  description: string;
  author: string;
  email: string;
  manufacturer: string;
}

program
  .name('create-ourui-app')
  .description('Create a new Electron + React + TypeScript application')
  .version('1.0.0');

program
  .argument('[project-name]', 'project name')
  .action(async (projectName?: string) => {
    console.log(chalk.blue('🚀 Welcome to OurUI Electron App Scaffold!'));
    
    const config = await getProjectConfig(projectName);
    await createProject(config);
  });

async function getProjectConfig(projectName?: string): Promise<ProjectConfig> {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: projectName || 'my-electron-app',
      validate: (input: string) => {
        if (!input.trim()) return 'Project name is required';
        if (!/^[a-z0-9-_]+$/.test(input)) return 'Project name should only contain lowercase letters, numbers, hyphens, and underscores';
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

  return await inquirer.prompt(questions);
}

async function createProject(config: ProjectConfig): Promise<void> {
  const targetDir = path.join(process.cwd(), config.projectName);
  
  // 检查目录是否已存在
  if (await fs.pathExists(targetDir)) {
    console.log(chalk.red(`❌ Directory ${config.projectName} already exists!`));
    return;
  }

  console.log(chalk.yellow('📁 Creating project directory...'));
  await fs.ensureDir(targetDir);

  console.log(chalk.yellow('📋 Copying template files...'));
  // 获取模板目录路径 - 支持全局安装和本地使用
  const templateDir = getTemplatePath();
  await fs.copy(templateDir, targetDir);

  console.log(chalk.yellow('⚙️  Configuring project files...'));
  await configureProject(targetDir, config);

  console.log(chalk.green('✅ Project created successfully!'));
  console.log(chalk.blue(`\n📖 Next steps:`));
  console.log(chalk.white(`  cd ${config.projectName}`));
  console.log(chalk.white(`  npm install`));
  console.log(chalk.white(`  npm start`));
}

function getTemplatePath(): string {
  // 尝试不同的路径来找到模板目录
  const possiblePaths = [
    // 开发环境路径
    path.join(__dirname, '../templates'),
    // 全局安装路径
    path.join(__dirname, '../../templates'),
    // npm包安装路径
    path.join(__dirname, '../node_modules/ourui-electron-scaffold/templates'),
    // 当前目录
    path.join(process.cwd(), 'templates')
  ];

  for (const templatePath of possiblePaths) {
    if (fs.existsSync(templatePath)) {
      return templatePath;
    }
  }

  throw new Error('Template directory not found. Please ensure the package is properly installed.');
}

async function configureProject(projectDir: string, config: ProjectConfig): Promise<void> {
  // 更新 package.json
  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  
  packageJson.name = config.projectName;
  packageJson.productName = config.projectName;
  packageJson.description = config.description;
  packageJson.author = {
    name: config.author,
    email: config.email
  };

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  // 更新 forge.config.ts
  const forgeConfigPath = path.join(projectDir, 'forge.config.ts');
  let forgeConfig = await fs.readFile(forgeConfigPath, 'utf-8');
  
  forgeConfig = forgeConfig.replace(/manufacturer: 'OurUI'/g, `manufacturer: '${config.manufacturer}'`);
  forgeConfig = forgeConfig.replace(/name: 'OurUI Tool V3'/g, `name: '${config.projectName}'`);
  forgeConfig = forgeConfig.replace(/description: 'OurUI Tool V3'/g, `description: '${config.description}'`);

  await fs.writeFile(forgeConfigPath, forgeConfig);

  // 更新 README.md
  const readmePath = path.join(projectDir, 'README.md');
  let readme = await fs.readFile(readmePath, 'utf-8');
  
  readme = readme.replace(/\{\{projectName\}\}/g, config.projectName);
  readme = readme.replace(/\{\{description\}\}/g, config.description);
  readme = readme.replace(/\{\{author\}\}/g, config.author);
  readme = readme.replace(/\{\{email\}\}/g, config.email);

  await fs.writeFile(readmePath, readme);
}

program.parse();