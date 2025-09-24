import fs from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import inquirer from 'inquirer';

const execAsync = promisify(exec);

interface ProjectOptions {
  projectName: string;
  transport: 'stdio' | 'http';
  templatePath?: string;
  templateUrl?: string;
  includeExamples: boolean;
  initializeGit: boolean;
  installDeps: boolean;
}

async function processTemplate(
  filePath: string,
  targetPath: string,
  templateData: any,
) {
  const content = await fs.readFile(filePath, 'utf-8');
  const template = handlebars.compile(content);
  const processedContent = template(templateData);
  const finalTargetPath = targetPath.endsWith('.hbs')
    ? targetPath.slice(0, -4)
    : targetPath;
  await fs.writeFile(finalTargetPath, processedContent);
}

async function copyTemplateFiles(
  templateDir: string,
  targetDir: string,
  templateData: any,
) {
  const files = await fs.readdir(templateDir);
  for (const file of files) {
    const srcPath = path.join(templateDir, file);
    const destPath = path.join(targetDir, file);
    const stat = await fs.lstat(srcPath);

    if (stat.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyTemplateFiles(srcPath, destPath, templateData);
    } else if (file.endsWith('.hbs')) {
      await processTemplate(srcPath, destPath, templateData);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

function showNextSteps(projectName: string, installDeps: boolean, chalk: any) {
  console.log(chalk.green('Project generation complete!'));
  console.log('\nNext steps:');
  console.log(chalk.cyan(`  cd ${projectName}`));
  if (!installDeps) {
    console.log(chalk.cyan('  npm install'));
  }
  console.log(chalk.cyan('  npm start'));
}

export async function generateProject(options: ProjectOptions) {
  const {
    projectName,
    transport,
    templatePath,
    templateUrl,
    initializeGit,
    installDeps,
  } = options;
  const targetDir = path.join(process.cwd(), projectName);


  console.log(`Generating project in ${targetDir}...`);

  if (await fs.pathExists(targetDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${projectName} already exists. Overwrite?`,
        default: false,
      },
    ]);
    if (!overwrite) {
      console.log(chalk.red('Aborting.'));
      return;
    }
  } else {
    await fs.mkdir(targetDir);
  }

  try {
    let templateDir = '';
    if (templatePath) {
      templateDir = path.resolve(templatePath);
    } else if (templateUrl) {
      // Logic to download and use remote template
      console.log(chalk.yellow('Remote templates not implemented yet.'));
      return;
    }

    const templateData = {
      name: projectName,
      transport,
      transportPascalCase:
        transport.charAt(0).toUpperCase() + transport.slice(1),
      transportLowerCase: transport.toLowerCase(),
    };

    const baseTemplateDir = templateDir
      ? path.join(templateDir, 'base')
      : path.join(__dirname, 'templates', 'base');
    const transportTemplateDir = templateDir
      ? path.join(templateDir, transport)
      : path.join(__dirname, 'templates', transport);
    const sharedTemplateDir = templateDir
      ? path.join(templateDir, 'shared')
      : path.join(__dirname, 'templates', 'shared');

    await copyTemplateFiles(baseTemplateDir, targetDir, templateData);
    await copyTemplateFiles(transportTemplateDir, targetDir, templateData);
    await copyTemplateFiles(
      sharedTemplateDir,
      path.join(targetDir, 'src'),
      templateData,
    );

    if (initializeGit) {
      await execAsync('git init', { cwd: targetDir });
      console.log('Initialized Git repository.');
    }

    if (installDeps) {
      console.log('Installing dependencies...');
      await execAsync('npm install', { cwd: targetDir });
      console.log('Dependencies installed.');
    }

    showNextSteps(projectName, installDeps, chalk);
  } catch (error) {
    console.error(chalk.red('An error occurred during project generation:'));
    console.error(error);
    await fs.remove(targetDir); // Clean up failed generation
  }
}
