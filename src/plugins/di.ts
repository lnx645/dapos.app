import { AuthService } from '@/services/AuthService';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asFunction, asValue, Lifetime } from 'awilix';
import fp from 'fastify-plugin';

declare module '@fastify/awilix' {
  interface AwilixContainerCradle {
    userService: string;
    authService: AuthService;
  }
}

export default fp(async (fastify) => {
    fastify.register(fastifyAwilixPlugin, {
        disposeOnClose: true,
        disposeOnResponse: true,
        strictBooleanEnforced: true
    });

    diContainer.register({
        userService: asFunction(() => {
            return "WAKWAY"
        }, { lifetime: Lifetime.SCOPED, dispose: () => { } }),
        authService: asClass(AuthService, {
            lifetime: Lifetime.SINGLETON,
            dispose: (module) => module.dispose(),
        })
    })

})