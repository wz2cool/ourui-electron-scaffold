// Electron API 相关类型定义

export interface ElectronVersions {
  chrome: string;
  node: string;
  electron: string;
}

export interface WindowControls {
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  onStateChanged: (callback: (state: { isMaximized: boolean }) => void) => void;
  removeStateListener: () => void;
}

export interface UserAPI {
  getAll: () => Promise<any[]>;
  getById: (id: number) => Promise<any>;
  create: (userData: any) => Promise<any>;
  update: (id: number, userData: any) => Promise<any>;
  delete: (id: number) => Promise<void>;
  search: (query: string) => Promise<any[]>;
  updateStatus: (id: number, status: string) => Promise<any>;
  getStats: () => Promise<any>;
}

export interface ElectronAPI {
  openFile: () => Promise<string | null>;
  getVersions: () => ElectronVersions;
  window: WindowControls;
  user: UserAPI;
}

// 扩展全局 Window 接口
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};