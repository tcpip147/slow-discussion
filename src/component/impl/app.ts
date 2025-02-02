import '@/component/impl/app.scss';
import { WindowPart } from '@/component/window_part';
import { addClass, closest, removeClass, removeClassAll } from '@/util/dom-utils';

export class App extends WindowPart {
  constructor() {
    super();
    this.application = this;
  }

  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'app';
  }

  init(): void {
    this.createElements();
    this.addEventListeners();
  }

  private createElements() {
    this.createElement();
    this.createChildrenElement(this);
    document.body.append(this.element!);
  }

  private createChildrenElement(parent: WindowPart) {
    parent.children.forEach((child) => {
      child.createElement();
      parent.element!.append(child.element!);
      this.createChildrenElement(child);
    });
  }

  private addEventListeners() {
    this.element!.addEventListener('mousedown', (e) => {
      const focusable = closest(e.target, 'focusable');
      if (focusable) {
        removeClassAll('focused');
        addClass(focusable, 'focused');
      }
    });
  }
}
