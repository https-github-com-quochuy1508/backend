import path from 'path';
import dotenv from 'dotenv';

/**
 * Initialize environment variables.
 */
if (process.env.NODE_ENV === 'production') {
	console.log('HELLO production');
	dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });
} else {
	console.log('HELLO no production');
	dotenv.config();
}
