// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
// To bad im using it anyway
import { BlobServiceClient } from "@azure/storage-blob";

//blob sas url = 'https://cookbookimages.blob.core.windows.net/images?sp=rad&st=2023-04-26T19:25:08Z&se=2023-05-04T03:25:08Z&spr=https&sv=2021-12-02&sr=c&sig=%2BZ26mAf0URfLQqxgGPpqIS7cpVvEPp4cqCDpKezXHbI%3D'
const containerName = `images`;
const sasToken = 'sp=racwd&st=2023-04-26T19:57:38Z&se=2023-04-27T03:57:38Z&spr=https&sv=2021-12-02&sr=c&sig=Cz3qKlSSZwxCad3jjMdYczwUOGRXVXyA0caqscxlexo%3D';
const storageAccountName = 'cookbookimages';

const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

const blobService = new BlobServiceClient(uploadUrl);
const containerClient = blobService.getContainerClient(containerName);

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

const createBlobInContainer = async (file, id) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(id);
  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};

const uploadFileToBlob = async (file, id) => {
  if (!file) return;
  // upload file
  await createBlobInContainer(file, id);
};
export const makeAzureUrl = (id) => `https://${storageAccountName}.blob.core.windows.net/${containerName}/${id}?${sasToken}`;
export default uploadFileToBlob;