import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 定义用户表结构
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  address: text('address'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;