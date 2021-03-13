import type { Connection, FileProperties } from 'jsforce';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function listBrokenMetadata(
  conn: Connection
): Promise<Array<FileProperties>> {
  let fileProperties = await conn.metadata.list([
    { type: 'CustomMetadata' },
    {
      type: 'Layout'
    },
    { type: 'QuickAction' }
  ]);
  if (!Array.isArray(fileProperties)) {
    fileProperties = [fileProperties];
  }
  return fileProperties;
}
