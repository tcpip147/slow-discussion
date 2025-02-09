import { TabBody } from '@/component/impl/viewport';

export abstract class ViewItem {
  parent: TabBody;
  element: HTMLElement | undefined;

  constructor(parent: TabBody) {
    this.parent = parent;
  }

  abstract render(): void;
}
