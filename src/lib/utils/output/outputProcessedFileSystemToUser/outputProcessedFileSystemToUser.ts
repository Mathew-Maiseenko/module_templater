import { IProcessedDirParams } from '../../../../types/IProcessedFs';

export async function outputProcessedFileSystemToUser(
  processedFS: IProcessedDirParams
) {
  console.log(processedFS);
}
