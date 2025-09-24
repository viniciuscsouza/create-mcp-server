# Create MCP Server - Especificação Técnica

## Visão Geral

O `create-mcp-server` é uma ferramenta CLI que scaffolding projetos de servidores MCP (Model Context Protocol) utilizando uma arquitetura declarativa baseada em objetos JavaScript. A ferramenta automatiza a criação de projetos estruturados, modulares e prontos para desenvolvimento.

## Arquitetura da Ferramenta

### Componentes Principais

1. **CLI (Command Line Interface)**: Interface interativa que gerencia o fluxo de criação
2. **Sistema de Templates**: Estruturas pré-definidas para diferentes configurações
3. **Engine de Geração**: Processa templates e substitui placeholders
4. **Validador**: Verifica ambiente e entradas do usuário

## Estrutura de Templates

### Organização Base

```
create-mcp-server/
├─ src/
│  ├─ cli/
│  │  ├─ index.ts
│  │  ├─ prompts.ts
│  │  ├─ validators.ts
│  │  └─ generator.ts
│  ├─ templates/
│  │  ├─ base/
│  │  │  ├─ template.json
│  │  │  ├─ primitives/
│  │  │  ├─ src/
│  │  │  ├─ package.json.hbs
│  │  │  ├─ tsconfig.json
│  │  │  └─ README.md.hbs
│  │  ├─ stdio/
│  │  │  ├─ template.json
│  │  │  ├─ src/
│  │  │  │  └─ index.ts.hbs
│  │  │  └─ package.json.hbs
│  │  ├─ http/
│  │  │  ├─ template.json
│  │  │  ├─ src/
│  │  │  │  └─ index.ts.hbs
│  │  │  └─ package.json.hbs
│  │  └─ shared/
│  │     ├─ primitives/
│  │     └─ server.ts.hbs
│  └─ utils/
│     ├─ file-utils.ts
│     ├─ template-utils.ts
│     └─ validation.ts
├─ bin/
│  └─ create-mcp-server.js
├─ package.json
└─ tsconfig.json
```

### Metadados de Template (`template.json`)

```json
{
  "name": "MCP Server - STDIO",
  "description": "Servidor MCP com transporte STDIO para integração com assistentes",
  "transport": "stdio",
  "category": "transport",
  "compatibility": {
    "node": ">=18.0.0",
    "mcp-sdk": "^1.0.0"
  },
  "features": [
    "typescript",
    "declarative-primitives",
    "hot-reload",
    "testing-setup"
  ],
  "placeholders": {
    "projectName": "Nome do projeto",
    "projectDescription": "Descrição do projeto", 
    "authorName": "Nome do autor",
    "authorEmail": "Email do autor"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js"
  }
}
```

## Interface CLI

### Fluxo Interativo

#### 1. Inicialização e Verificação
```bash
npx create-mcp-server
```

- Exibe banner de boas-vindas com versão
- Verifica requisitos do sistema (Node.js ≥18, npm/yarn)
- Detecta gerenciador de pacotes preferido
- Valida disponibilidade de comandos essenciais

#### 2. Coleta de Informações

**Configuração do Projeto:**
```
? Nome do projeto: (my-mcp-server)
? Descrição: (Um servidor MCP personalizado)
? Autor: (detectado do git config ou solicitado)
? Email: (detectado do git config ou solicitado)
```

**Configuração Técnica:**
```
? Selecione o transporte:
  ❯ STDIO (Recomendado para assistentes)
    HTTP (Para APIs REST)

? Incluir primitivas de exemplo? (Y/n)
? Configurar testes automatizados? (Y/n)
? Inicializar repositório Git? (Y/n)
? Instalar dependências automaticamente? (Y/n)
```

#### 3. Confirmação e Resumo
```
📋 Resumo da Configuração:

Projeto: my-mcp-server
Transporte: STDIO
Localização: ./my-mcp-server
Primitivas de exemplo: ✓
Testes: ✓
Git: ✓
Instalação automática: ✓

? Confirma a criação do projeto? (Y/n)
```

### Flags de Linha de Comando

#### Modo Não-Interativo
```bash
npx create-mcp-server \
  --name "my-server" \
  --transport stdio \
  --description "Meu servidor MCP" \
  --author "João Silva" \
  --email "joao@example.com" \
  --examples \
  --tests \
  --git \
  --install \
  --yes
```

#### Flags Disponíveis
- `--name <string>`: Nome do projeto
- `--transport <stdio|http>`: Tipo de transporte
- `--description <string>`: Descrição do projeto
- `--author <string>`: Nome do autor
- `--email <string>`: Email do autor
- `--examples`: Incluir primitivas de exemplo
- `--no-examples`: Não incluir exemplos
- `--tests`: Configurar testes
- `--no-tests`: Não configurar testes
- `--git`: Inicializar Git
- `--no-git`: Não inicializar Git
- `--install`: Instalar dependências
- `--no-install`: Não instalar dependências
- `--package-manager <npm|yarn|pnpm>`: Gerenciador específico
- `--template-path <path>`: Template customizado local
- `--template-url <url>`: Template customizado remoto
- `--yes`: Aceitar todas as opções padrão
- `--help`: Exibir ajuda
- `--version`: Exibir versão

## Sistema de Templates

### Template Base (Shared)

#### Estrutura de Primitivas
```
primitives/
├─ tools/
│  ├─ index.ts
│  └─ example-tool.ts.hbs
├─ resources/
│  ├─ index.ts
│  └─ example-resource.ts.hbs
├─ prompts/
│  ├─ index.ts
│  └─ example-prompt.ts.hbs
└─ samplings/
   ├─ index.ts
   └─ example-sampling.ts.hbs
```

#### Server Base (`server.ts.hbs`)
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { tools } from './primitives/tools/index.js';
import { resources } from './primitives/resources/index.js';
import { prompts } from './primitives/prompts/index.js';
import { samplings } from './primitives/samplings/index.js';

export const server = new Server(
  {
    name: "{{projectName}}",
    version: "1.0.0",
    description: "{{projectDescription}}"
  },
  {
    capabilities: {
      {{#if hasTools}}tools: {},{{/if}}
      {{#if hasResources}}resources: {},{{/if}}
      {{#if hasPrompts}}prompts: {},{{/if}}
      {{#if hasSamplings}}sampling: {}{{/if}}
    },
  }
);

// Auto-register all primitives
{{#if hasTools}}
tools.forEach(tool => {
  server.registerTool(tool.name, tool.metadata, tool.handler);
});
{{/if}}

{{#if hasResources}}
resources.forEach(resource => {
  server.registerResource(
    resource.name,
    resource.uri,
    resource.metadata,
    resource.handler
  );
});
{{/if}}

{{#if hasPrompts}}
prompts.forEach(prompt => {
  server.registerPrompt(prompt.name, prompt.metadata, prompt.handler);
});
{{/if}}

{{#if hasSamplings}}
samplings.forEach(sampling => {
  server.registerSamplingHandler(sampling.name, sampling.handler);
});
{{/if}}
```

### Template STDIO (`stdio/index.ts.hbs`)
```typescript
#!/usr/bin/env node

import { server } from './server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log to stderr for debugging (stdout is reserved for MCP communication)
  console.error(`{{projectName}} MCP server running with STDIO transport`);
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.error('Shutting down server...');
  await server.close();
  process.exit(0);
});

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
```

### Template HTTP (`http/index.ts.hbs`)
```typescript
#!/usr/bin/env node

import { server } from './server.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function main() {
  const transport = new SSEServerTransport('/message', server);
  
  // Start HTTP server
  const httpServer = transport.listen(PORT);
  
  console.log(`{{projectName}} MCP server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  return httpServer;
}

// Handle graceful shutdown  
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await server.close();
  process.exit(0);
});

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
```

## Validações e Tratamento de Erros

### Validações de Entrada

#### Nome do Projeto
```typescript
const validateProjectName = (name: string): boolean => {
  // Caracteres válidos: letras, números, hífens, underscores
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  // Não pode começar com números ou caracteres especiais
  const startsValid = /^[a-zA-Z]/.test(name);
  // Comprimento adequado
  const validLength = name.length >= 2 && name.length <= 50;
  
  return validPattern.test(name) && startsValid && validLength;
};
```

#### Diretório de Destino
```typescript
const validateDestination = async (projectName: string): Promise<ValidationResult> => {
  const targetPath = path.join(process.cwd(), projectName);
  
  if (await fs.pathExists(targetPath)) {
    const files = await fs.readdir(targetPath);
    
    if (files.length > 0) {
      return {
        valid: false,
        message: `Diretório '${projectName}' já existe e não está vazio`,
        suggestions: [
          'Escolher outro nome',
          'Remover arquivos existentes',
          'Usar --force para sobrescrever'
        ]
      };
    }
  }
  
  return { valid: true };
};
```

### Tratamento de Conflitos

#### Diretório Existente
```
⚠️  O diretório 'my-server' já existe e contém arquivos.

? Como proceder?
  ❯ Cancelar e escolher outro nome
    Sobrescrever conteúdo existente
    Criar com sufixo numérico (my-server-2)
    Fazer merge (manter arquivos existentes)
```

## Pós-Criação e Configuração

### Ações Automáticas

1. **Substituição de Placeholders**
   - Processa todos os arquivos `.hbs` (Handlebars)
   - Substitui variáveis de contexto
   - Remove extensão `.hbs` dos arquivos processados

2. **Inicialização Git** (se solicitado)
   ```bash
   git init
   git add .
   git commit -m "feat: initial project setup with create-mcp-server"
   ```

3. **Instalação de Dependências** (se solicitado)
   ```bash
   npm install  # ou yarn/pnpm conforme detectado
   ```

4. **Configuração de Desenvolvimento**
   - Cria scripts de build e desenvolvimento
   - Configura hot-reload para desenvolvimento
   - Configura TypeScript com configurações otimizadas

### Instruções Pós-Criação

```
🎉 Projeto '{{projectName}}' criado com sucesso!

📁 Localização: ./{{projectName}}

🚀 Próximos passos:
  cd {{projectName}}
  {{#unless autoInstall}}npm install{{/unless}}
  npm run dev

📚 Guia de desenvolvimento:
  • Adicionar tools: primitives/tools/
  • Adicionar resources: primitives/resources/  
  • Adicionar prompts: primitives/prompts/
  • Documentação completa: README.md

{{#if isStdio}}
🔗 Para integrar com Claude Desktop, adicione ao config.json:
  {
    "mcpServers": {
      "{{projectName}}": {
        "command": "node",
        "args": ["./dist/index.js"],
        "cwd": "{{absolutePath}}"
      }
    }
  }
{{/if}}

{{#if isHttp}}
🌐 Servidor HTTP disponível em: http://localhost:3000
📋 Health check: http://localhost:3000/health
{{/if}}
```

## Extensibilidade

### Templates Customizados

#### Local
```bash
npx create-mcp-server --template-path ./my-custom-template
```

#### Remoto
```bash
npx create-mcp-server --template-url https://github.com/user/mcp-template
```

#### Estrutura de Template Customizado
```
custom-template/
├─ template.json
├─ src/
├─ primitives/
├─ package.json.hbs
└─ hooks/
   ├─ pre-generate.js
   └─ post-generate.js
```

### Hooks de Extensão

#### Pre-generate Hook
```javascript
// hooks/pre-generate.js
module.exports = async (context) => {
  // Modificar contexto antes da geração
  if (context.projectName.includes('api')) {
    context.includeSwagger = true;
  }
  
  return context;
};
```

#### Post-generate Hook  
```javascript
// hooks/post-generate.js
module.exports = async (projectPath, context) => {
  // Ações após geração dos arquivos
  if (context.includeSwagger) {
    await installSwaggerDependencies(projectPath);
  }
};
```

## Testes e Qualidade

### Estrutura de Testes (quando habilitado)
```
tests/
├─ setup.ts
├─ primitives/
│  ├─ tools.test.ts
│  ├─ resources.test.ts
│  └─ prompts.test.ts
└─ server.test.ts
```

### Configuração de Linting
- ESLint com regras TypeScript
- Prettier para formatação
- Husky para git hooks
- lint-staged para arquivos staged

## Considerações Técnicas

### Performance
- Templates lazy-loaded por demanda
- Cache de validações comuns
- Processamento assíncrono de arquivos grandes
- Progress indicators para operações longas

### Compatibilidade
- Node.js ≥18 (ESM nativo)
- Suporte a Windows, macOS, Linux
- Detecção automática de gerenciador de pacotes
- Fallbacks para comandos não disponíveis

### Segurança
- Validação rigorosa de paths
- Sanitização de entradas do usuário  
- Verificação de dependências confiáveis
- Isolamento de execução de hooks customizados