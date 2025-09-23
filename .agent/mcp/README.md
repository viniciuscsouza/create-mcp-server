# Visão Geral da Documentação do Protocolo de Contexto do Modelo (MCP)

Este repositório contém a documentação completa para o Protocolo de Contexto do Modelo (MCP), um padrão aberto para conectar aplicações de IA a sistemas externos, ferramentas e fontes de dados. O MCP permite que aplicações de IA, como o Claude ou o ChatGPT, interajam de forma segura com recursos locais e remotos, executem ações e acessem informações contextuais para fornecer respostas mais relevantes e úteis.

A documentação abrange desde conceitos fundamentais e arquitetura até guias de desenvolvimento detalhados para a construção de servidores e clientes MCP, bem como diretrizes para contribuir com o ecossistema.

## Sumário Detalhado

Aqui está um resumo de todos os documentos `.mdx` neste repositório, organizados por categoria:

### **Introdução e Conceitos Fundamentais**

- **index.mdx**: Página inicial da documentação do MCP.
- **intro.mdx**: Uma breve introdução ao Protocolo de Contexto do Modelo (MCP).
- **introduction.mdx**: Apresenta o MCP, sua arquitetura e como começar a usá-lo.
- **mcp-overview.mdx**: Visão geral do SDK Java para o Protocolo de Contexto do Modelo (MCP).
- **faqs.mdx**: Responde a perguntas frequentes sobre o MCP, explicando o que é e por que é importante.
- **architecture.mdx**: Descreve a arquitetura do MCP, incluindo seus principais componentes e camadas.
- **server-concepts.mdx**: Explica os conceitos fundamentais dos servidores MCP, incluindo ferramentas, recursos e prompts.
- **client-concepts.mdx**: Detalha os conceitos essenciais para clientes MCP, como amostragem, raízes e elicitação.
- **messages.mdx**: Especifica o formato das mensagens JSON-RPC 2.0 usadas no protocolo.
- **lifecycle.mdx**: Descreve o ciclo de vida da conexão entre cliente e servidor no MCP.
- **transports.mdx**: Detalha os mecanismos de transporte (stdio, HTTP) usados para a comunicação.
- **versioning.mdx**: Explica o esquema de versionamento do protocolo MCP.
- **schema.mdx**: Referência detalhada do esquema para todos os tipos de dados e interfaces do MCP.

### **Recursos do Protocolo**

- **tools.mdx**: Documentação sobre como expor funcionalidades executáveis (ferramentas) através de um servidor MCP.
- **resources.mdx**: Explica como expor fontes de dados e conteúdo para serem usados como contexto.
- **prompts.mdx**: Descreve como criar templates de prompt reutilizáveis para guiar interações com o LLM.
- **sampling.mdx**: Detalha como os servidores podem solicitar conclusões do LLM através do cliente.
- **roots.mdx**: Explica o conceito de "raízes" para definir os limites operacionais dos servidores.
- **elicitation.mdx**: Guia sobre como os servidores podem solicitar interativamente informações adicionais dos usuários.
- **cancellation.mdx**: Especificação para o cancelamento opcional de requisições em andamento.
- **completion.mdx**: Define como os servidores podem oferecer sugestões de autocompletar para argumentos.
- **logging.mdx**: Descreve o sistema de logging estruturado do servidor para o cliente.
- **pagination.mdx**: Explica o modelo de paginação baseado em cursor para lidar com grandes conjuntos de resultados.
- **ping.mdx**: Detalha o mecanismo de ping para verificação de conectividade.
- **progress.mdx**: Especificação para o rastreamento de progresso de operações de longa duração.

### **Desenvolvimento e SDKs**

- **build-server.mdx**: Tutorial para construir um servidor MCP simples.
- **build-client.mdx**: Guia para construir um cliente chatbot que se conecta a servidores MCP.
- **building-a-client-node.mdx**: Guia específico para a construção de um cliente MCP com Node.js.
- **connect-local-servers.mdx**: Demonstra como conectar o Claude Desktop a servidores MCP locais.
- **connect-remote-servers.mdx**: Guia para conectar o Claude a servidores MCP remotos.
- **building-mcp-with-llms.mdx**: Tutorial sobre como usar LLMs para acelerar o desenvolvimento de MCP.
- **inspector.mdx**: Guia para usar o MCP Inspector, uma ferramenta interativa para testar e depurar servidores.
- **debugging.mdx**: Um guia completo para depuração de integrações MCP.
- **sdk.mdx**: Apresenta os SDKs oficiais para a construção com MCP em várias linguagens.
- **mcp-client.mdx**: Documentação sobre a implementação de um cliente MCP em Java.
- **mcp-server.mdx**: Documentação sobre a implementação de um servidor MCP em Java.

### **Comunidade e Governança**

- **contributing.mdx**: Informações sobre como contribuir para o desenvolvimento do MCP.
- **governance.mdx**: Descreve o modelo de governança do projeto MCP.
- **communication.mdx**: Estratégia e canais de comunicação para a comunidade de contribuidores.
- **sep-guidelines.mdx**: Diretrizes para propor melhorias à especificação (SEPs).
- **working-interest-groups.mdx**: Explica a estrutura dos Grupos de Trabalho e de Interesse na governança do MCP.

### **Informações do Projeto**

- **changelog.mdx**: Lista as principais alterações na especificação do MCP desde a revisão anterior.
- **roadmap.mdx**: Descreve os planos e prioridades para a evolução do MCP.
- **security_best_practices.mdx**: Fornece as melhores práticas de segurança para implementações MCP.
- **authorization.mdx**: Especifica o fluxo de autorização para transportes baseados em HTTP.

### **Ecossistema e Exemplos**

- **examples.mdx**: Mostra vários servidores MCP de exemplo que demonstram as capacidades do protocolo.
- **clients.mdx**: Uma lista de aplicações que suportam integrações com o MCP.

### **Arquivos Diversos**

- **client.mdx**: Conteúdo de placeholder.
- **server.mdx**: Conteúdo de placeholder.
- **use-local-mcp-server.mdx**: Arquivo de placeholder.
- **snippet-intro.mdx**: Introdução ao uso de snippets de conteúdo reutilizáveis na documentação.
