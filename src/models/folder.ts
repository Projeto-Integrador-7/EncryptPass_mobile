export interface Folder {
  _id: string;
  title: string;
  description: string;
}

export interface ResponseFolder {
  sucesso: string;
  folder: Folder[];
}