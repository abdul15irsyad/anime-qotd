import Redis, { RedisOptions } from 'ioredis';

export const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379/3';
export const REDIS_TTL = process.env.REDIS_TTL ? +process.env.REDIS_TTL : 1800;

const redisOptions: RedisOptions = {
  connectionName: 'portfolio',
  retryStrategy: () => null,
};
const redisClientSingleton = () => new Redis(REDIS_URL, redisOptions);

type RedisClientSingleton = ReturnType<typeof redisClientSingleton>;

const globalForRedis = globalThis as unknown as {
  redis: RedisClientSingleton | undefined;
};

export const redis = globalForRedis.redis ?? redisClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
