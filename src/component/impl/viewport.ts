import { BoxStatement } from '@/component/impl/box_statement';
import '@/component/impl/viewport.scss';
import { ViewItem } from '@/component/view_item';
import { WindowPart } from '@/component/window_part';

export class Viewport extends WindowPart {
  constructor() {
    super();
    this.add(new TabBody());
  }

  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'viewport focusable';
  }

  setWidth(width: number): void {
    this.element!.style.width = `${width}px`;
    this.getAll(TabBody).forEach((tabBody) => {
      tabBody.render();
    });
  }
}

export class TabBody extends WindowPart {
  items: ViewItem[] = [];
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | undefined;

  constructor() {
    super();
  }

  // Override
  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'tab-body';
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.element!.append(this.canvas);
  }

  loadFile(): void {
    const box1 = new BoxStatement(this);
    box1.setLocation(100, 100);
    this.append(box1);

    const box2 = new BoxStatement(this);
    box2.setLocation(300, 200);
    this.append(box2);

    box1.linkTo(box2);
  }

  append(item: ViewItem): void {
    this.items.push(item);
    if (item instanceof BoxStatement) {
      this.element!.append(item.element!);
    }
  }

  render(): void {
    this.canvas!.width = this.element!.getBoundingClientRect().width;
    this.canvas!.height = this.element!.getBoundingClientRect().height;

    this.items.forEach((item) => {
      item.render();
    });
  }
}
