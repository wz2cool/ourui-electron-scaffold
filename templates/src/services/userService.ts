import type { User, NewUser } from './database';

// IPC 通信频道定义
export const USER_CHANNELS = {
  ADD_USER: 'user:add',
  GET_ALL_USERS: 'user:getAll',
  GET_USER_BY_ID: 'user:getById',
  GET_USER_BY_EMAIL: 'user:getByEmail',
  UPDATE_USER: 'user:update',
  DELETE_USER: 'user:delete',
} as const;

// 渲染进程用户服务类
export class UserService {
  static async addUser(userData: Omit<NewUser, 'id' | 'createdAt'>): Promise<User> {
    return window.electronAPI.userService.addUser(userData);
  }

  static async getAllUsers(): Promise<User[]> {
    return window.electronAPI.userService.getAllUsers();
  }

  static async getUserById(id: number): Promise<User | null> {
    return window.electronAPI.userService.getUserById(id);
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return window.electronAPI.userService.getUserByEmail(email);
  }

  static async updateUser(id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>): Promise<User | null> {
    return window.electronAPI.userService.updateUser(id, userData);
  }

  static async deleteUser(id: number): Promise<boolean> {
    return window.electronAPI.userService.deleteUser(id);
  }
}

export default UserService;