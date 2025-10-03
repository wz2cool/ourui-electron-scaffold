import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import * as path from 'path';
import { app } from 'electron';
import { users, User, NewUser } from './database';

class DatabaseService {
  private db: Database.Database;
  private drizzleDb: ReturnType<typeof drizzle>;

  constructor() {
    // 获取应用数据目录
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'users.db');
    
    // 初始化数据库连接
    this.db = new Database(dbPath);
    this.drizzleDb = drizzle(this.db);
    
    // 创建表
    this.initDatabase();
  }

  private initDatabase() {
    // 创建用户表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        address TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  // 添加用户
  async addUser(userData: Omit<NewUser, 'id' | 'createdAt'>): Promise<User> {
    try {
      const result = await this.drizzleDb.insert(users).values({
        ...userData,
        createdAt: new Date().toISOString(),
      }).returning();
      
      return result[0];
    } catch (error) {
      throw new Error(`添加用户失败: ${error.message}`);
    }
  }

  // 获取所有用户
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.drizzleDb.select().from(users);
    } catch (error) {
      throw new Error(`获取用户列表失败: ${error.message}`);
    }
  }

  // 根据ID获取用户
  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await this.drizzleDb.select().from(users).where(eq(users.id, id));
      return result[0] || null;
    } catch (error) {
      throw new Error(`获取用户失败: ${error.message}`);
    }
  }

  // 根据邮箱获取用户
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.drizzleDb.select().from(users).where(eq(users.email, email));
      return result[0] || null;
    } catch (error) {
      throw new Error(`获取用户失败: ${error.message}`);
    }
  }

  // 更新用户
  async updateUser(id: number, userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>): Promise<User | null> {
    try {
      const result = await this.drizzleDb.update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
      
      return result[0] || null;
    } catch (error) {
      throw new Error(`更新用户失败: ${error.message}`);
    }
  }

  // 删除用户
  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await this.drizzleDb.delete(users).where(eq(users.id, id));
      return result.changes > 0;
    } catch (error) {
      throw new Error(`删除用户失败: ${error.message}`);
    }
  }

  // 关闭数据库连接
  close() {
    this.db.close();
  }
}

// 创建单例实例
let databaseService: DatabaseService | null = null;

export const getDatabaseService = (): DatabaseService => {
  if (!databaseService) {
    databaseService = new DatabaseService();
  }
  return databaseService;
};

export default DatabaseService;