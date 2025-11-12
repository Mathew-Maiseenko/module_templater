import { checkProjRequiredStruct, setupCLI } from './lib/initial';
import { getModulesNamesFromConfigDir } from './lib/utils/process/getModulesListFromConfigDir/getModulesListFromConfigDir';
import { processModuleTemplate } from './lib/utils/process/processModuleTemplate/processModuleTemplate';

async function main() {
  const { cli_arguments } = setupCLI();

  const { path, moduleTitle, moduleTypeName, variables } = cli_arguments;

  console.log('Вызвано с аргуметами', cli_arguments);

  const isProjectStructValid = checkProjRequiredStruct(path);
  if (!isProjectStructValid) {
    process.exit(1);
  }

  const modulesNamesSet = new Set(await getModulesNamesFromConfigDir(path));

  if (!modulesNamesSet.has(moduleTypeName)) {
    console.error(
      `Шаблон для модуля ${moduleTitle} отсувствует в конфигурации!`
    );
    process.exit(1);
  }

  const processedFileSystem = processModuleTemplate(
    path,
    moduleTypeName,
    variables
  );
}

///////////////////////////////////////////////

if (require.main === module) {
  main();
}
