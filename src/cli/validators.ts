import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';

/**
 * Valida se o nome do projeto é válido.
 * - Não pode conter caracteres especiais que são inválidos para nomes de diretório.
 * - Deve ter pelo menos um caractere.
 */
export function isValidProjectName(name: string): boolean {
  if (!name || name.trim().length === 0) {
    return false;
  }
  // Regex para validar nomes de pacotes npm, que é uma boa proxy para nomes de projeto.
  // Permite letras minúsculas, números, hífens, pontos e underscores.
  // Não pode começar com ponto, underscore ou hífen.
  const npmPackageNameRegex = /^(?![_.-])(?!.*[\\/!*?"<>|])[a-z0-9-~._]+$/;
  return npmPackageNameRegex.test(name);
}

/**
 * Verifica se o diretório de destino é válido para a criação de um novo projeto.
 * - O diretório não pode existir ou, se existir, deve estar vazio.
 */
export async function isDirectoryValid(targetDir: string): Promise<boolean> {
  try {
    const stats = await fs.stat(targetDir);
    if (stats.isDirectory()) {
      const files = await fs.readdir(targetDir);
      // O diretório não é válido se contiver arquivos (ignorando arquivos de sistema como .DS_Store)
      return files.filter(file => !file.startsWith('.')).length === 0;
    }
    // Se o caminho existe mas não é um diretório, não é válido.
    return false;
  } catch (error: any) {
    // Se o erro for 'ENOENT', significa que o diretório não existe, o que é válido.
    if (error.code === 'ENOENT') {
      return true;
    }
    // Outros erros são inesperados.
    throw error;
  }
}

/**
 * Valida se a versão do Node.js atende ao requisito mínimo.
 * O requisito é >=18.0.0.
 */
export function isNodeVersionValid(): boolean {
  const requiredVersion = '>=18.0.0';
  return semver.satisfies(process.version, requiredVersion);
}
