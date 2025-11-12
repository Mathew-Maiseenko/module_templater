# BananaCat Module Templater

A command-line interface (CLI) utility for creating project modules from predefined templates.

## Quick Start

Execute the following command in the root directory of your project:

```bash
npx bananacat-module-templater <ModuleTypeName> <ModuleTitle> [path] --var <variable_name>=<value>
```

## API

### Command

The main command for generating a module:

```bash
npx bananacat-module-templater <ModuleTypeName> <ModuleTitle> [path] [options]
```

### Arguments

1.  `<ModuleTypeName>` (required)

    - **Description:** The type of module to create. This name must correspond to a subdirectory name in `banana_templates.local`.
    - **Example:** `module`, `feature`, `widget`

2.  `<ModuleTitle>` (required)

    - **Description:** The title of your new module. This value is automatically available in templates as the reserved `__MODULE_TITLE__` variable.
    - **Example:** `MyAwesomeComponent`, `UserProfile`

3.  `[path]` (optional)
    - **Description:** The path where the module should be created.
    - **Default:** The current working directory (`process.cwd()`).

### Options

- `--var <name=value>`
  - **Description:** Allows passing custom variables to the templates. Can be used multiple times to pass multiple variables.
  - **Example:** `--var componentName=Aboba --var cssStyle=bold`

---

## Template Configuration (`banana_templates.local`)

For the utility to work, a `banana_templates.local` directory must be present in the root of your project.

### Directory Structure

```
.
├── banana_templates.local/
│   └── <ModuleTypeName>/
│       ├── {{__MODULE_TITLE__}}.tsx
│       └── styles.css
└── ...
```

- `banana_templates.local/`: The root folder for all templates.
- `<ModuleTypeName>/`: A directory whose name corresponds to the `<ModuleTypeName>` argument. It contains the template files and folders for a single module type.

### Template Variables

You can use variables to dynamically generate content in files and their names.

- **Syntax:** `{{__VARIABLE_NAME__}}`

The utility will replace these placeholders with their corresponding values when generating the module.

**Example:**

If you have a file `banana_templates.local/module/{{__MODULE_TITLE__}}.ts`, and you run the command:

```bash
npx bananacat-module-templater module MyComponent
```

A file named `MyComponent.ts` will be created.

### Reserved Variable `__MODULE_TITLE__`

- `__MODULE_TITLE__` is a special, reserved variable.
- Its value is always equal to the second command-line argument, `<ModuleTitle>`.
- This is useful for naming the main file or directory of a module according to its title.
