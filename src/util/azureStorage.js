// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
// To bad im using it anyway
import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `images`;
const sasToken = 'sp=racwdl&st=2023-04-27T21:23:34Z&se=2023-04-28T05:23:34Z&spr=https&sv=2021-12-02&sr=c&sig=m9z7lICqNDeWlyF2DhY1GpeuhyJoT2oEmHbowkOKMmA%3D';
const storageAccountName = 'cookbookimages';

const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

const createBlobInContainer = async (file, id) => {
  const blobClient = containerClient.getBlockBlobClient(id); // create blobClient for container
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  await blobClient.uploadData(file, options); // upload file
};

const uploadFileToBlob = async (file, id) => {
  if (!file) return;
  await createBlobInContainer(file, id);
};
export const makeAzureUrl = (id) => `https://${storageAccountName}.blob.core.windows.net/${containerName}/${id}?${sasToken}`;
export default uploadFileToBlob;