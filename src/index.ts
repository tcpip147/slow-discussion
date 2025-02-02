import { App } from '@/component/impl/app';
import { Menubar } from '@/component/impl/menubar';
import { Sidebar } from '@/component/impl/sidebar';
import '@/index.scss';
import '@/theme/theme.dark.scss';

window.onload = function () {
  const app = new App();
  app.add(new Menubar());
  app.add(new Sidebar());
  app.init();
};
