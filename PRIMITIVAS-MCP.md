# Primitivas MCP - Arquitetura Declarativa

## Conceitos Fundamentais

### Sintaxe Declarativa

Cada primitiva MCP é definida como um objeto JavaScript que contém:
- **Metadados**: Informações descritivas (nome, descrição, parâmetros)
- **Handler**: Função que implementa a lógica da primitiva
- **Configurações**: Propriedades específicas do tipo de primitiva


### Organização de arquivos
```
primitives/
├─ tools/
│  ├─ index.ts
│  └─ example-tool.ts
├─ resources/
│  ├─ index.ts
│  └─ example-resource.ts
├─ prompts/
│  ├─ index.ts
│  └─ example-prompt.ts
└─ samplings/
   ├─ index.ts
   └─ example-sampling.ts
```


### Estrutura Base de uma Primitiva

```typescript
interface PrimitiveDefinition {
  name: string;
  metadata: object;
  handler: Function;
}
```

## Primitivas

### Tools (`primitives/tools/`)

Tools são funções que o servidor pode executar para realizar tarefas específicas.

#### Estrutura de um Tool

```typescript
// primitives/tools/example-tool.ts
export const exampleTool = {
  name: "example-tool",
  metadata: {
    description: "Uma ferramenta de exemplo",
    inputSchema: {
      type: "object",
      properties: {
        input: { type: "string" }
      }
    }
  },
  handler: async (args) => {
    return { content: `Processado: ${args.input}` };
  }
};
```

#### Index de Tools

```typescript
// primitives/tools/index.ts
import { exampleTool } from './example-tool';

export const tools = [
  exampleTool,
  // outros tools...
];
```

### Resources (`primitives/resources/`)

Resources fornecem acesso a dados ou informações através de URIs.

#### Estrutura de um Resource

```typescript
// primitives/resources/example-resource.ts
export const exampleResource = {
  name: "example-resource",
  uri: "resource://example",
  metadata: {
    title: "Recurso de Exemplo",
    description: "Um recurso de exemplo",
    mimeType: "text/plain"
  },
  handler: async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "Dados do recurso exemplo"
    }]
  })
};
```

#### Index de Resources

```typescript
// primitives/resources/index.ts
import { exampleResource } from './example-resource';

export const resources = [
  exampleResource,
  // outros resources...
];
```

### Prompts (`primitives/prompts/`)

Prompts são templates reutilizáveis para interações com modelos de linguagem.

#### Estrutura de um Prompt

```typescript
// primitives/prompts/example-prompt.ts
export const examplePrompt = {
  name: "example-prompt",
  metadata: {
    description: "Um prompt de exemplo",
    arguments: [
      {
        name: "topic",
        description: "Tópico para discussão",
        required: true
      }
    ]
  },
  handler: async (args) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Vamos discutir sobre: ${args.topic}`
        }
      }
    ]
  })
};
```

#### Index de Prompts

```typescript
// primitives/prompts/index.ts
import { examplePrompt } from './example-prompt';

export const prompts = [
  examplePrompt,
  // outros prompts...
];
```

### Samplings (`primitives/samplings/`)

Samplings definem configurações e handlers para amostragem de modelos.

#### Estrutura de um Sampling

```typescript
// primitives/samplings/example-sampling.ts
export const exampleSampling = {
  name: "example-sampling",
  metadata: {
    description: "Configuração de amostragem exemplo",
    modelPreferences: {
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  handler: async (request) => ({
    model: request.modelPreferences?.hints?.preferredModel || "default",
    stopReason: "endTurn",
    usage: {
      inputTokens: 10,
      outputTokens: 50
    }
  })
};
```

#### Index de Samplings

```typescript
// primitives/samplings/index.ts
import { exampleSampling } from './example-sampling';

export const samplings = [
  exampleSampling,
  // outros samplings...
];
```

## Vantagens da Arquitetura Declarativa

1. **Modularidade**: Cada primitiva é independente e reutilizável
2. **Manutenibilidade**: Fácil adição/remoção de primitivas
3. **Testabilidade**: Handlers podem ser testados isoladamente
4. **Escalabilidade**: Estrutura suporta crescimento do projeto
5. **Legibilidade**: Código mais limpo e organizizado
6. **Tipagem**: Benefícios completos do TypeScript

## Desenvolvimento

### Adicionando uma Nova Primitiva

1. Crie o arquivo da primitiva na pasta correspondente
2. Defina o objeto seguindo a estrutura padrão
3. Exporte a primitiva
4. Adicione a importação no arquivo `index.ts` da categoria
5. Inclua a primitiva no array de exportação

### Exemplo Prático

```typescript
// primitives/tools/calculate.ts
export const calculateTool = {
  name: "calculate",
  metadata: {
    description: "Realiza cálculos matemáticos",
    inputSchema: {
      type: "object",
      properties: {
        expression: { type: "string" }
      },
      required: ["expression"]
    }
  },
  handler: async (args) => {
    try {
      const result = eval(args.expression);
      return { content: `Resultado: ${result}` };
    } catch (error) {
      return { content: `Erro: ${error.message}`, isError: true };
    }
  }
};
```