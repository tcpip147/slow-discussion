import '@/component/impl/sidebar.scss';
import { WindowPart } from '@/component/window_part';

export class Sidebar extends WindowPart {
  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'sidebar focusable';
  }
}
