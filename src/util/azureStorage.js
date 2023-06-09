// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
// To bad im using it anyway
import { BlobServiceClient } from "@azure/storage-blob";

//I know i need to change these to env variables later
const containerName = `images`;
const sasToken = 'sp=racwdl&st=2023-05-11T19:04:17Z&se=2023-06-01T03:04:17Z&spr=https&sv=2022-11-02&sr=c&sig=g8mWnZ4T1mYoH%2BKQj11gK5SFiR7Fm7og3L81GL%2BuTKA%3D';
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
//export const makeAzureUrl = (id) => `https://${storageAccountName}.blob.core.windows.net/${containerName}/${id}?${sasToken}`;
export const makeAzureUrl = (id) => `https://${storageAccountName}.blob.core.windows.net/${containerName}/${id}`;  //anonymous read access allowed
export default uploadFileToBlob;