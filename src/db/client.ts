import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import * as schema from '@/db/schema';

export const DATABASE_NAME = 'treev.db';

const expoDb = openDatabaseSync(DATABASE_NAME);

export const db = drizzle(expoDb, { schema });
export { expoDb };
