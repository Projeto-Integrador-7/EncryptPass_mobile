import React, { createContext, useContext, useState } from "react";
import { useToast } from "native-base";
import { CustomToast } from "../components/CustomToast";

import { Folder } from "../models/folder";

import { useAuth } from "./useAuth";
import useAxios from "../hooks/useAxios";

interface FolderContextData {
  folders: Folder[];
  folderLoading: boolean;
  loadFolders: () => void;
  createFolder(
    title: string,
    description: string
  ): Promise<void>;
}

const FolderContext = createContext<FolderContextData>({} as FolderContextData);

export function FolderProvider({ ...props }) {
  const { session } = useAuth();
  const api = useAxios();
  const toast = useToast();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderLoading, setfolderLoading] = useState(true);

  async function loadFolders() {
    const response = await api.get(`folder/${session?.user._id}/findAll`);
    setFolders(response.data);
    setfolderLoading(false);
  }

  async function createFolder(title: string, description: string) {
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
  }

  return (
    <FolderContext.Provider
      value={{ folders, folderLoading, loadFolders, createFolder }}
    >
      {props.children}
    </FolderContext.Provider>
  );

}

export function useFolder() {
  const context = useContext(FolderContext);

  return context;
}