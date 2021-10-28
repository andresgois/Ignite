
import fs from 'fs';

export const deleteFile = async (filename: string) => {

  try {
    // stats - verifica se um arquivo existe ou não
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filename);
}