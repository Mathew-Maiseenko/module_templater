import fs from 'fs/promises';
import path from 'path';

import { IProcessedFileParams } from '../../../../types/IProcessedFs';
import { replaceVariables } from '../replaceVariablesInText/replaceVariables';

export async function getProcessedFileFromTemplate(
  filePath: string,
  variables: Record<string, string>
): Promise<IProcessedFileParams> {
  const text = await fs.readFile(filePath, 'utf8');

  const { value: fileText, errors: errorsReadingFile } = replaceVariables(
    text,
    variables
  );

  const originalFileName = path.basename(filePath);
  const { value: processedFileName, errors: errorsReadingFileName } =
    replaceVariables(originalFileName, variables);

  const errors = [...errorsReadingFile, ...errorsReadingFileName];

  return {
    fileText,
    fileName: processedFileName,
    errors,
  };
}
