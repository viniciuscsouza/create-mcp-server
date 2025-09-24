#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { isNodeVersionValid, isValidProjectName } from './cli/validators.js';
import { displayBanner, promptUser, ProjectOptions } from './cli/ui.js';
// A função de geração será usada em uma fase futura, mas já a importamos.
// import { generateProject } from './generator.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

async function main() {
  // 1. Validação de Ambiente
  if (!isNodeVersionValid()) {
    console.error(
      chalk.red('Erro: Versão do Node.js não suportada.') +
      chalk.yellow('\nPor favor, use Node.js >= 18.0.0.')
    );
    process.exit(1);
  }

  // 2. Exibição do Banner
  displayBanner();

  // 3. Configuração do CLI com Commander
  const program = new Command();
  program
    .version(packageJson.version)
    .description(packageJson.description)
    .argument('[projectName]', 'Nome do projeto', (name) => {
        if (!isValidProjectName(name)) {
            console.error(chalk.red('\nErro: Nome de projeto inválido.'));
            console.log(chalk.dim('Use apenas letras minúsculas, números, hífens e underscores.'));
            process.exit(1);
        }
        return name;
    })
    .option('-d, --projectDescription <string>', 'Descrição do projeto')
    .option('-t, --transport <stdio|http>', 'Tipo de transporte')
    .option('--no-examples', 'Não incluir primitivas de exemplo')
    .option('--no-git', 'Não inicializar repositório Git')
    .option('--no-install', 'Não instalar dependências')
    .option('-y, --yes', 'Aceitar todas as opções padrão e pular prompts', false)
    .action(async (projectName, options) => {
      let projectOptions: Partial<ProjectOptions> = {
        projectName,
        projectDescription: options.projectDescription,
        transport: options.transport,
        // Commander passa `undefined` se a flag --no-<option> não for usada.
        // Se a flag for usada, passa `false`. Se a flag positiva (--examples) não existe,
        // nunca será `true` aqui. Precisamos normalizar isso.
        includeExamples: options.examples, // undefined ou false
        initializeGit: options.git, // undefined ou false
        installDeps: options.install, // undefined ou false
      };

      // 4. Fluxo Interativo (se necessário)
      if (!options.yes) {
        projectOptions = await promptUser(projectOptions);
      } else {
        // Preencher com padrões se --yes for usado e faltarem opções
        projectOptions.projectName = projectOptions.projectName ?? 'my-mcp-server';
        projectOptions.projectDescription = projectOptions.projectDescription ?? 'Um servidor MCP personalizado';
        projectOptions.transport = projectOptions.transport ?? 'stdio';
        projectOptions.includeExamples = projectOptions.includeExamples ?? true;
        projectOptions.initializeGit = projectOptions.initializeGit ?? true;
        projectOptions.installDeps = projectOptions.installDeps ?? true;
      }

      // 5. Lógica de Geração (placeholder)
      console.log(chalk.green('\nConfiguração final do projeto:'));
      console.log(projectOptions);

      // TODO: Chamar a função de geração do projeto aqui.
      // await generateProject(projectOptions as ProjectOptions);

      console.log(chalk.bold.green('\nProjeto pronto para ser gerado!'));
    });

  await program.parseAsync(process.argv);
}

main().catch(err => {
  console.error(chalk.red('\nOcorreu um erro inesperado:'), err);
  process.exit(1);
});
