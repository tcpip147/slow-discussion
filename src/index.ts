import { App } from '@/component/impl/app';
import '@/index.scss';
import '@/theme/theme.dark.scss';

window.onload = function () {
  const app = new App();
  app.init();
};
