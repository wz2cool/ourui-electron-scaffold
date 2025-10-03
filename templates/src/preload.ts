// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { USER_CHANNELS } from './services/userService';
import type { User, NewUser } from './services/database';

// 定义API接口类型
interface ElectronAPI {
  userService: {
    addUser: (userData: Omit<NewUser, 'id' | 'createdAt'>) => Promise<User>;
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
    updateUser: (id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>) => Promise<User | null>;
    deleteUser: (id: number) => Promise<boolean>;
  };
}

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  userService: {
    addUser: (userData: Omit<NewUser, 'id' | 'createdAt'>) => 
      ipcRenderer.invoke(USER_CHANNELS.ADD_USER, userData),
    
    getAllUsers: () => 
      ipcRenderer.invoke(USER_CHANNELS.GET_ALL_USERS),
    
    getUserById: (id: number) => 
      ipcRenderer.invoke(USER_CHANNELS.GET_USER_BY_ID, id),
    
    getUserByEmail: (email: string) => 
      ipcRenderer.invoke(USER_CHANNELS.GET_USER_BY_EMAIL, email),
    
    updateUser: (id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>) => 
      ipcRenderer.invoke(USER_CHANNELS.UPDATE_USER, id, userData),
    
    deleteUser: (id: number) => 
      ipcRenderer.invoke(USER_CHANNELS.DELETE_USER, id),
  },
});

// 声明全局类型
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
