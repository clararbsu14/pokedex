import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Autorise les appels depuis un autre port (utile si ton front est ailleurs)
    app.enableCors();

    // Lance l'app sur le port 3000
    await app.listen(3000);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
