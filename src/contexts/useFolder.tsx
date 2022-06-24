import React, { createContext, useContext, useState } from "react";
import { useToast } from "native-base";
import { CustomToast } from "../components/CustomToast";

import { Folder } from "../models/folder";

import { useAuth } from "./useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface FolderContextData {
  folders: Folder[];
  folderLoading: boolean;
  folderPromiseLoading: boolean;
  loadFolders: () => void;
  createFolder(
    title: string,
    description: string
  ): Promise<void>;
  editFolder(
    title: string,
    description: string,
    folder_id: string
  ): Promise<void>;
  deleteFolder(
    folder_id: string
  ): Promise<void>;
}

const FolderContext = createContext<FolderContextData>({} as FolderContextData);

export function FolderProvider({ ...props }) {
  const { session } = useAuth();
  const api = useAxiosPrivate();
  const toast = useToast();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderLoading, setfolderLoading] = useState(true);
  const [folderPromiseLoading, setFolderPromiseLoading] = useState(false);

  async function loadFolders() {
    const response = await api.get(`folder/${session?.user._id}/findAll`);
    setFolders(response.data);
    setfolderLoading(false);
  }

  async function createFolder(title: string, description: string) {
    setFolderPromiseLoading(true);
    try {
      const response = await api.post(`folder/${session?.user._id}/create`, { title, description });
      const { folder } = response.data;

      setFolders([
        ...folders,
        folder
      ])

      toast.show({
        render: () => {
          return (
            <CustomToast
              type="success"
              description={response.data.Sucesso}
            />
          )
        }
      });

    } catch (res: any) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              type="error"
              description={res.response.data.Erro}
            />
          )
        }
      });
    }
    setFolderPromiseLoading(false);
  }

  async function editFolder(title: string, description: string, folder_id: string) {
    setFolderPromiseLoading(true);
    try {
      const response = await api.put(`folder/${session?.user._id}/update/${folder_id}`, { title, description });

      let elementIndex = folders.findIndex(item => item._id === folder_id);

      let updateFolders = [...folders];
      updateFolders[elementIndex] = response.data.folder

      setFolders(updateFolders)

      toast.show({
        render: () => {
          return (
            <CustomToast
              type="success"
              description={response.data.Sucesso}
            />
          )
        }
      });

    } catch (res: any) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              type="error"
              description={res.response.data.Erro}
            />
          )
        }
      });
    }
    setFolderPromiseLoading(false);
  }

  async function deleteFolder(folder_id: string) {
    setFolderPromiseLoading(true);
    try {
      const response = await api.delete(`folder/${session?.user._id}/delete/${folder_id}`);

      let elementIndex = folders.findIndex(item => item._id === folder_id);

      let updateFolders = [...folders];
      updateFolders.splice(elementIndex, 1);

      setFolders(updateFolders)

      toast.show({
        render: () => {
          return (
            <CustomToast
              type="success"
              description={response.data.Sucesso}
            />
          )
        }
      });

    } catch (res: any) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              type="error"
              description={res.response.data.Erro}
            />
          )
        }
      });
    }
    setFolderPromiseLoading(false);
  }

  return (
    <FolderContext.Provider
      value={{ folders, folderLoading, folderPromiseLoading, loadFolders, createFolder, editFolder, deleteFolder}}
    >
      {props.children}
    </FolderContext.Provider>
  );

}

export function useFolder() {
  const context = useContext(FolderContext);

  return context;
}