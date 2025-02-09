import '@/component/impl/app.scss';
import { Menubar } from '@/component/impl/menubar';
import { Sidebar } from '@/component/impl/sidebar';
import { SidebarExtension } from '@/component/impl/sidebar_extension';
import { TabBody, Viewport } from '@/component/impl/viewport';
import { WindowPart } from '@/component/window_part';
import { addClass, closest, hasClass, removeClass, removeClassAll } from '@/util/dom-utils';

export class App extends WindowPart {
  constructor() {
    super();
    this.application = this;
    this.add(new Menubar());
    this.add(new Sidebar());
    this.add(new SidebarExtension());
    this.add(new Viewport());
  }

  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'app';
  }

  init(): void {
    this.createElements();
    this.addEventListeners();
    this.get(SidebarExtension).setWidth(200);

    this.getAll(TabBody).forEach((tabBody) => {
      tabBody.loadFile();
      tabBody.render();
    });
  }

  private createElements() {
    this.createElement();
    this.createChildrenElement(this);
    document.body.append(this.element!);
    this.callPostCreatedElements(this);
  }

  private createChildrenElement(parent: WindowPart) {
    parent.children.forEach((child) => {
      child.createElement();
      parent.element!.append(child.element!);
      this.createChildrenElement(child);
    });
  }

  private callPostCreatedElements(parent: WindowPart) {
    parent.children.forEach((child) => {
      child.postCreatedElement();
      this.callPostCreatedElements(child);
    });
  }

  private addEventListeners() {
    let sidebarExtWidth = 0;
    let startX = 0;
    let sidebarExtResizeMode = false;
    let sidebarExtReady = false;

    this.element!.addEventListener('mousedown', (e) => {
      if (sidebarExtReady) {
        sidebarExtWidth = this.get(SidebarExtension).getWidth();
        startX = e.clientX;
        sidebarExtResizeMode = true;
      }

      const focusable = closest(e.target, 'focusable');
      if (focusable && !hasClass(focusable, 'focused')) {
        removeClassAll('focused');
        addClass(focusable, 'focused');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (sidebarExtResizeMode) {
        const diffX = e.clientX - startX;
        const newWidth = sidebarExtWidth + diffX;
        this.get(SidebarExtension).setWidth(newWidth);
      } else if (hasClass(e.target, 'resizer')) {
        addClass(document.body, 'ew-resizing');
        sidebarExtReady = true;
      } else {
        removeClass(document.body, 'ew-resizing');
        sidebarExtReady = false;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (sidebarExtResizeMode) {
        sidebarExtResizeMode = false;
      }
    });

    window.addEventListener('resize', (e) => {
      this.get(SidebarExtension).setWidth(this.get(SidebarExtension).getWidth());
    });
  }
}
