#!/usr/bin/env node

import { Command } from 'commander';
import { generateProject } from './generator.js';

const program = new Command();

program
  .version('0.0.1')
  .description('A CLI to create MCP (Model Context Protocol) servers');

program
  .command('create <projectName>')
  .description('Create a new MCP server project')
  .option('-t, --transport <type>', 'Specify the transport type (stdio or http)', 'stdio')
  .action(async (projectName: string, options: { transport: 'stdio' | 'http' }) => {
    console.log(`Creating project: ${projectName} with ${options.transport} transport`);

    await generateProject({
      projectName,
      transport: options.transport,
      includeExamples: true, // default for now
      initializeGit: false, // default for now
      installDeps: false,   // default for now
    });
  });

program.parse(process.argv);
