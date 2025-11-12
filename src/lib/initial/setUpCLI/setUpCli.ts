import { Command } from 'commander';

import {
  collectVariables,
  parseCollectedVariables,
} from './utils/multipleOptionsParsers';

export interface CLIArguments {
  moduleTypeName: string;
  moduleTitle: string;
  path: string;
  variables: Record<string, string>;
}

export interface CLIOptions {
  // verbose?: boolean;
  // debug?: boolean;
  var?: string[];
}

export function setupCLI() {
  const program = new Command();

  program
    .name('module-templater')
    .description('CLI for project modules templates')
    .version('1.0.0')
    .argument(
      '<ModuleTypeName>',
      'project module type like "module" or "features" in FSD'
    )
    .argument('<ModuleTitle>', 'project path to check')
    .argument('[path]', 'project path to check', process.cwd())
    .option(
      '--var <name=value>',
      'template variable (can be used multiple times)',
      collectVariables
    )
    // .option('-v, --verbose', 'enable verbose output')
    // .option('-d, --debug', 'enable debug mode')
    .parse();

  const options = program.opts() as CLIOptions;

  const templateVariables: Record<string, string> = {
    __MODULE_TITLE__: program.args[1],
    ...parseCollectedVariables(options.var || []),
  };

  const argumentsResult: CLIArguments = {
    moduleTypeName: program.args[0],
    moduleTitle: program.args[1],
    path: program.args[2] || process.cwd(),
    variables: templateVariables,
  };

  return {
    cli_arguments: argumentsResult,
    options,
    program,
  };
}
