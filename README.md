# create-mcp-server

A command-line tool for generating MCP (Minecraft Control Protocol) server projects.

## Usage

To create a new MCP server project, run the following command:

```bash
npx create-mcp-server
```

You will be prompted to enter the project name, choose a transport protocol (stdio or http), and select other options.

### Command-Line Flags

You can also use command-line flags to customize the project generation:

- `--name <project-name>`: Set the project name
- `--transport <stdio|http>`: Choose the transport protocol
- `--include-examples`: Include example usage files
- `--git`: Initialize a Git repository
- `--install`: Install dependencies

## Custom Templates

You can use your own templates to generate a project by providing a path to a local directory or a URL to a Git repository.

### Local Template

```bash
npx create-mcp-server --template-path /path/to/your/template
```

### Remote Template

```bash
npx create-mcp-server --template-url https://github.com/your-username/your-template.git
```

## License

This project is licensed under the MIT License.
