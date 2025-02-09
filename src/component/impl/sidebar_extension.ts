import '@/component/impl/sidebar_extension.scss';
import { Viewport } from '@/component/impl/viewport';
import { WindowPart } from '@/component/window_part';

export class SidebarExtension extends WindowPart {
  constructor() {
    super();
    this.add(new Resizer());
  }

  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'sidebar-extension focusable';
  }

  setWidth(width: number): void {
    if (width < 40) {
      width = 40;
    }
    this.element!.style.width = `${width}px`;
    this.application!.get(Viewport).setWidth(window.innerWidth - width - 40);
  }

  getWidth(): number {
    return this.element!.style.width ? parseInt(this.element!.style.width) : 0;
  }
}

export class Resizer extends WindowPart {
  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'resizer';
  }
}
