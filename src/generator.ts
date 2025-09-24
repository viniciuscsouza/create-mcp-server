import fs from 'fs-extra';
import path from 'path';

interface ProjectOptions {
  projectName: string;
  transport: 'stdio' | 'http';
  includeExamples: boolean;
  initializeGit: boolean;
  installDeps: boolean;
}

export async function generateProject(options: ProjectOptions) {
  const { projectName } = options;
  const targetDir = path.join(process.cwd(), projectName);

  console.log(`Generating project in ${targetDir}...`);

  // 1. Create target directory
  if (await fs.pathExists(targetDir)) {
    // For now, we'll just log a warning. Later we will add interactive prompts.
    console.warn(`⚠️ Directory ${projectName} already exists.`);
    // A real implementation would ask the user to overwrite or cancel.
    // For this initial step, we'll just proceed, which might overwrite files.
  } else {
    await fs.mkdir(targetDir);
  }


  // 2. Copy base template files
  const baseTemplateDir = path.join(__dirname, 'templates/base');
  try {
    await fs.copy(baseTemplateDir, targetDir);
    console.log('Copied base template files.');
  } catch (error) {
    console.error('Error copying base template files:', error);
    throw error;
  }

  // More logic will be added here later for transport, placeholders, etc.

  console.log('Project generation (initial) complete!');
}
