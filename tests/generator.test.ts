import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { generateProject } from '../src/generator';
import fs from 'fs-extra';
import path from 'path';

describe('Project Generator', () => {
  const testProjectName = 'vitest-test-project';
  const testProjectDir = path.join(process.cwd(), testProjectName);

  beforeAll(async () => {
    // Ensure the directory is clean before the test
    if (await fs.pathExists(testProjectDir)) {
      await fs.remove(testProjectDir);
    }
  });

  afterAll(async () => {
    // Clean up the created directory after the test
    if (await fs.pathExists(testProjectDir)) {
      await fs.remove(testProjectDir);
    }
  });

  it('should create a new project directory with base files', async () => {
    await generateProject({
      projectName: testProjectName,
      transport: 'stdio',
      includeExamples: true,
      initializeGit: false,
      installDeps: false,
    });

    // Check if the project directory exists
    const dirExists = await fs.pathExists(testProjectDir);
    expect(dirExists).toBe(true);

    // Check if base files were copied
    const readmeExists = await fs.pathExists(path.join(testProjectDir, 'README.md.hbs'));
    const pkgJsonExists = await fs.pathExists(path.join(testProjectDir, 'package.json.hbs'));
    const tsconfigExists = await fs.pathExists(path.join(testProjectDir, 'tsconfig.json'));

    expect(readmeExists).toBe(true);
    expect(pkgJsonExists).toBe(true);
    expect(tsconfigExists).toBe(true);
  });
});
