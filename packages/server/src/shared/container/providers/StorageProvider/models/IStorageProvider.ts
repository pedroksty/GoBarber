export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFle(file: string): Promise<void>;
}
