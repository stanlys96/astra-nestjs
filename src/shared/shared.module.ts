import { Global, Module, Provider } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.services';

const providers: Provider[] = [ApiConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
