import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { isValidProjectName, isDirectoryValid } from '../src/cli/validators';

const TEST_DIR = path.join(__dirname, 'test-project-dir');

describe('validators', () => {
  beforeEach(async () => {
    // Limpa o diretório de teste antes de cada teste
    await fs.emptyDir(TEST_DIR);
  });

  afterEach(async () => {
    // Remove o diretório de teste após cada teste
    await fs.remove(TEST_DIR);
  });

  describe('isValidProjectName', () => {
    it('should return true for valid project names', () => {
      expect(isValidProjectName('my-project')).toBe(true);
      expect(isValidProjectName('project123')).toBe(true);
      expect(isValidProjectName('p')).toBe(true);
      expect(isValidProjectName('a.b.c')).toBe(true);
      expect(isValidProjectName('my-project_v1')).toBe(true);
    });

    it('should return false for invalid project names', () => {
      expect(isValidProjectName('')).toBe(false);
      expect(isValidProjectName(' ')).toBe(false);
      expect(isValidProjectName('MyProject')).toBe(false); // Uppercase
      expect(isValidProjectName('my project')).toBe(false); // Spaces
      expect(isValidProjectName('/my-project')).toBe(false); // Contains invalid characters
      expect(isValidProjectName('.my-project')).toBe(false); // Starts with dot
      expect(isValidProjectName('_my-project')).toBe(false); // Starts with underscore
      expect(isValidProjectName('my-project!')).toBe(false); // Special characters
    });
  });

  describe('isDirectoryValid', () => {
    it('should return true if directory does not exist', async () => {
      const nonExistentDir = path.join(TEST_DIR, 'non-existent');
      await expect(isDirectoryValid(nonExistentDir)).resolves.toBe(true);
    });

    it('should return true if directory exists and is empty', async () => {
      const emptyDir = path.join(TEST_DIR, 'empty');
      await fs.ensureDir(emptyDir);
      await expect(isDirectoryValid(emptyDir)).resolves.toBe(true);
    });

    it('should return false if directory exists and is not empty', async () => {
      const nonEmptyDir = path.join(TEST_DIR, 'non-empty');
      await fs.ensureDir(nonEmptyDir);
      await fs.writeFile(path.join(nonEmptyDir, 'file.txt'), 'hello');
      await expect(isDirectoryValid(nonEmptyDir)).resolves.toBe(false);
    });

    it('should return false if path exists and is a file', async () => {
      const filePath = path.join(TEST_DIR, 'a-file.txt');
      await fs.writeFile(filePath, 'i am a file');
      await expect(isDirectoryValid(filePath)).resolves.toBe(false);
    });

    it('should return true for empty directory with hidden files', async () => {
        const dirWithHiddenFile = path.join(TEST_DIR, 'hidden-file-dir');
        await fs.ensureDir(dirWithHiddenFile);
        await fs.writeFile(path.join(dirWithHiddenFile, '.DS_Store'), 'ignore me');
        await expect(isDirectoryValid(dirWithHiddenFile)).resolves.toBe(true);
    });
  });
});
