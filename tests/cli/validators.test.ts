import { describe, it, expect, vi } from 'vitest';
import { isNodeVersionValid, isValidProjectName } from '../../src/cli/validators';

describe('CLI Validators', () => {
  describe('isNodeVersionValid', () => {
    it('should return true for a valid Node.js version', () => {
      // Mock process.version
      vi.stubGlobal('process', { ...process, version: 'v18.0.0' });
      expect(isNodeVersionValid()).toBe(true);
    });

    it('should return true for a higher major version', () => {
      vi.stubGlobal('process', { ...process, version: 'v19.5.0' });
      expect(isNodeVersionValid()).toBe(true);
    });

    it('should return false for an invalid Node.js version', () => {
      vi.stubGlobal('process', { ...process, version: 'v16.19.0' });
      expect(isNodeVersionValid()).toBe(false);
    });
  });

  describe('isValidProjectName', () => {
    it('should return true for valid project names', () => {
      expect(isValidProjectName('my-project')).toBe(true);
      expect(isValidProjectName('project-123')).toBe(true);
      expect(isValidProjectName('project_name')).toBe(true);
    });

    it('should return false for invalid project names', () => {
      expect(isValidProjectName('MyProject')).toBe(false); // Uppercase
      expect(isValidProjectName('my project')).toBe(false); // Space
      expect(isValidProjectName('-my-project')).toBe(false); // Starts with hyphen
      expect(isValidProjectName('.my-project')).toBe(false); // Starts with dot
      expect(isValidProjectName('my-project-!')).toBe(false); // Special char
      expect(isValidProjectName('')).toBe(false); // Empty
    });
  });
});
