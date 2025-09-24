import chalk from 'chalk';
import inquirer from 'inquirer';
import { isValidProjectName } from './validators.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');

/**
 * Exibe um banner de boas-vindas estilizado.
 */
export function displayBanner(): void {
  console.log(
    chalk.bold.cyan(`\n🎉 Bem-vindo ao ${packageJson.name} v${packageJson.version}!\n`)
  );
  console.log(chalk.dim('Vamos criar um novo servidor MCP.\n'));
}

/**
 * Coleta as opções do projeto de forma interativa.
 * @param options - Opções já fornecidas via CLI.
 * @returns Uma promessa que resolve com as opções completas do projeto.
 */
export async function promptUser(options: Partial<ProjectOptions>): Promise<ProjectOptions> {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Qual é o nome do projeto?',
      default: 'my-mcp-server',
      when: !options.projectName,
      validate: isValidProjectName,
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Descrição do projeto:',
      default: 'Um servidor MCP personalizado',
      when: !options.projectDescription,
    },
    {
      type: 'list',
      name: 'transport',
      message: 'Selecione o transporte:',
      choices: [
        { name: 'STDIO (Recomendado para assistentes)', value: 'stdio' },
        { name: 'HTTP (Para APIs REST)', value: 'http' },
      ],
      default: 'stdio',
      when: !options.transport,
    },
    {
        type: 'confirm',
        name: 'includeExamples',
        message: 'Incluir primitivas de exemplo?',
        default: true,
        when: options.includeExamples === undefined,
    },
    {
        type: 'confirm',
        name: 'initializeGit',
        message: 'Inicializar um repositório Git?',
        default: true,
        when: options.initializeGit === undefined,
    },
    {
        type: 'confirm',
        name: 'installDeps',
        message: 'Instalar dependências automaticamente?',
        default: true,
        when: options.installDeps === undefined,
    }
  ];

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    ...answers,
  } as ProjectOptions;
}

// Definindo a interface para as opções do projeto.
// Isso será útil no `index.ts` também.
export interface ProjectOptions {
  projectName: string;
  projectDescription: string;
  transport: 'stdio' | 'http';
  includeExamples: boolean;
  initializeGit: boolean;
  installDeps: boolean;
}
