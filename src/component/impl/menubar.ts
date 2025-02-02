import '@/component/impl/menubar.scss';
import { WindowPart } from '@/component/window_part';

export class Menubar extends WindowPart {
  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'menubar';
  }
}
