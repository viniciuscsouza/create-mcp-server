# TODO - Implementação do `create-mcp-server`

Este arquivo detalha as tarefas necessárias para implementar a ferramenta `create-mcp-server` conforme as especificações.

## Fase 1: Estrutura do Projeto e Dependências

- [x] 1.1. Criar a estrutura de diretórios principal (`src`, `bin`, `templates`).
- [x] 1.2. Inicializar um projeto Node.js com `npm init`.
- [x] 1.3. Instalar dependências de desenvolvimento (`typescript`, `@types/node`, `tsx`).
- [x] 1.4. Instalar dependências de produção (`commander` para CLI, `inquirer` para prompts, `chalk` para estilo, `handlebars` para templating, `fs-extra` para operações de arquivo).
- [x] 1.5. Configurar `tsconfig.json` para o projeto.
- [x] 1.6. Criar o script executável em `bin/create-mcp-server.js`.

## Fase 2: Implementação do CLI

- [x] 2.1. Implementar a interface CLI principal em `src/cli/index.ts`.
- [x] 2.2. Usar `commander` para definir as flags de linha de comando (`--name`, `--transport`, etc.).
- [x] 2.3. Implementar o fluxo interativo com `inquirer` em `src/cli/prompts.ts`.
- [x] 2.4. Adicionar um banner de boas-vindas usando `chalk`.
- [x] 2.5. Implementar as validações de ambiente (versão do Node.js, etc.) em `src/cli/validators.ts`.

## Fase 3: Sistema de Templates

- [ ] 3.1. Criar a estrutura de templates em `src/templates/`.
- [ ] 3.2. Desenvolver o template `base` com a estrutura compartilhada (`primitives`, `server.ts.hbs`).
- [ ] 3.3. Criar o `template.json` para o template `base`.
- [ ] 3.4. Desenvolver o template `stdio` com seu `index.ts.hbs` específico.
- [ ] 3.5. Desenvolver o template `http` com seu `index.ts.hbs` específico.
- [ ] 3.6. Implementar a lógica de manipulação de placeholders com `handlebars` em `src/cli/generator.ts`.

## Fase 4: Lógica de Geração do Projeto

- [ ] 4.1. Implementar a função principal de geração em `src/cli/generator.ts`.
- [ ] 4.2. Adicionar lógica para copiar os arquivos do template para o diretório de destino.
- [ ] 4.3. Implementar o processamento dos arquivos `.hbs`, substituindo os placeholders.
- [ ] 4.4. Implementar a lógica para renomear os arquivos `.hbs` para `.ts` ou outros.
- [ ] 4.5. Adicionar a funcionalidade para inicializar um repositório Git.
- [ ] 4.6. Adicionar a funcionalidade para instalar as dependências (`npm install`).

## Fase 5: Validações e Tratamento de Erros

- [x] 5.1. Implementar a validação de nome do projeto em `src/cli/validators.ts`.
- [x] 5.2. Implementar a validação de diretório de destino (verificar se existe e não está vazio).
- [ ] 5.3. Adicionar tratamento de erros para falhas na criação de arquivos ou instalação.
- [ ] 5.4. Implementar a lógica de confirmação antes de gerar o projeto.

## Fase 6: Funcionalidades Adicionais

- [ ] 6.1. Implementar o suporte para templates customizados (`--template-path`, `--template-url`).
- [ ] 6.2. Adicionar a configuração de testes automatizados (copiar estrutura de testes).
- [ ] 6.3. Implementar a exibição da mensagem de "próximos passos" ao final da criação.
- [ ] 6.4. Criar a documentação `README.md` para a ferramenta `create-mcp-server`.

## Fase 7: Testes e Refinamento

- [x] 7.1. Escrever testes unitários para as funções de validação.
- [ ] 7.2. Escrever testes de integração para o fluxo de criação do projeto.
- [ ] 7.3. Refinar a saída do console e as mensagens do usuário.
- [ ] 7.4. Testar em diferentes sistemas operacionais (Windows, macOS, Linux).
