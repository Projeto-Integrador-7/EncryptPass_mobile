import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse, HeadersDefaults } from 'axios';

import { Folder, ResponseFolder } from "../models/folder";

import { useAuth } from "./useAuth";

import api from "../services/api";

interface FolderContextData {
  folders: Folder[];
  loadFolders: () => void;
  createFolder(
    title: string,
    description: string
  ): Promise<void>;
}

const FolderContext = createContext<FolderContextData>({} as FolderContextData);

export function FolderProvider({ ...props }) {
  const { user } = useAuth();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFolders() {
    const response = await api.get(`folder/${user?._id}/findAll`);
    setFolders(response.data);
    setLoading(false);
  }

  async function createFolder(title: string, description: string) {
    try {
      const response = await api.post(`folder/${user?._id}/create`, { title, description, userId: user?._id });
      const { folder } = response.data;

      setFolders([
        ...folders,
        folder
      ])

    } catch {
      console.log('Erro')
    }
  }

  return (
    <FolderContext.Provider
      value={{ folders, loadFolders, createFolder }}
    >
      {props.children}
    </FolderContext.Provider>
  );

}

export function useFolder() {
  const context = useContext(FolderContext);

  return context;
}