import cors from '@fastify/cors';
import Fastify from 'fastify';

import {
  authRoutes,
  gameRoutes,
  guessRoutes,
  poolRoutes,
  userRoutes,
} from './routes';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({
    port: 3333,
    // host: '0.0.0.0',
  });
}

bootstrap();
