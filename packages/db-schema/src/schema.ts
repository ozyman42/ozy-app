import { pgTable, integer, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').unique(),
    totp: text('totp')
});

export const tradingExchanges = pgTable('trading_exchanges', {
    userId: integer('user_id').primaryKey().references(() => users.id ),
    bybitKey: text('bybit_key')
});

export const sessions = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    expiresAt: text('expires_at')
});
