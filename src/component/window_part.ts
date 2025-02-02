import { App } from '@/component/impl/app';

export abstract class WindowPart {
  application: App | undefined;
  element: HTMLElement | undefined;
  children: WindowPart[] = [];

  abstract createElement(): void;

  add(child: WindowPart): void {
    child.application = this.application;
    this.children.push(child);
  }

  walkTree(callback: (part: WindowPart) => void): void {
    callback(this);
    this.children.forEach((childrenPart: WindowPart) => {
      childrenPart.walkTree(callback);
    });
  }
}
