import { App } from '@/component/impl/app';

export abstract class WindowPart {
  application: App | undefined;
  element: HTMLElement | undefined;
  children: WindowPart[] = [];

  abstract createElement(): void;

  postCreatedElement(): void {}

  add(child: WindowPart): void {
    child.application = this.application;
    this.children.push(child);
  }

  get<T extends WindowPart>(cls: new (...args: any[]) => T): T {
    let child = null;
    this.walkTree((part: WindowPart) => {
      if (part instanceof cls) {
        child = part as T;
        return true;
      }
    });
    if (child != null) {
      return child;
    }
    throw 'unknown type';
  }

  getAll<T extends WindowPart>(cls: new (...args: any[]) => T): T[] {
    let children: T[] = [];
    this.walkTree((part: WindowPart) => {
      if (part instanceof cls) {
        children.push(part as T);
        return true;
      }
    });
    return children;
  }

  walkTree(callback: (part: WindowPart) => void): boolean {
    callback(this);
    for (const child of this.children) {
      if (child.walkTree(callback)) {
        return true;
      }
    }
    return false;
  }
}
