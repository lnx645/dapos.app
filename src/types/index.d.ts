export interface AppCradle {
    auth: string;
}
declare module '@fastify/awilix' {
    interface AwilixContainerCradle extends AppCradle { }
}