import { generateProject } from '../src/generator';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('Project Generation', () => {
  const projectName = 'test-project';
  const projectDir = path.join(process.cwd(), projectName);

  afterEach(async () => {
    await fs.remove(projectDir);
  });

  it('should generate a project with stdio transport', async () => {
    await generateProject({
      projectName,
      transport: 'stdio',
      includeExamples: false,
      initializeGit: false,
      installDeps: false,
      templatePath: '',
      templateUrl: '',
    });

    expect(await fs.pathExists(projectDir)).toBe(true);
    expect(await fs.pathExists(path.join(projectDir, 'src', 'server.ts'))).toBe(
      true,
    );
  });

  it('should generate a project with http transport', async () => {
    await generateProject({
      projectName,
      transport: 'http',
      includeExamples: false,
      initializeGit: false,
      installDeps: false,
      templatePath: '',
      templateUrl: '',
    });

    expect(await fs.pathExists(projectDir)).toBe(true);
    expect(await fs.pathExists(path.join(projectDir, 'src', 'server.ts'))).toBe(
      true,
    );
  });

  it('should initialize a git repository', async () => {
    await generateProject({
      projectName,
      transport: 'stdio',
      includeExamples: false,
      initializeGit: true,
      installDeps: false,
      templatePath: '',
      templateUrl: '',
    });

    expect(await fs.pathExists(path.join(projectDir, '.git'))).toBe(true);
  });
});
