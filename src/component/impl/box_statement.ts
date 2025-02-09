import '@/component/impl/box_statement.scss';
import { TabBody } from '@/component/impl/viewport';
import { StatementStatus } from '@/component/statement_status';
import { StatementType } from '@/component/statement_type';
import { ViewItem } from '@/component/view_item';

export class BoxStatement extends ViewItem {
  type: StatementType = StatementType.RAW_STRING;
  status: StatementStatus = StatementStatus.FALSE;
  argument: string = '';
  comment: string = '';
  prev: BoxStatement[] = [];
  next: BoxStatement[] = [];
  shrink: boolean = false;
  x: number = 0;
  y: number = 0;

  constructor(parent: TabBody) {
    super(parent);
    this.createElement();
  }

  createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'view-item box-statement';
  }

  setLocation(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  linkTo(next: BoxStatement): void {
    if (!this.next.includes(next)) {
      this.next.push(next);
      this.prev.push(this);
    }
  }

  // Override
  render(): void {
    this.element!.style.left = this.x + 'px';
    this.element!.style.top = this.y + 'px';
    this.next.forEach((next) => {
      this.drawLine(this, next);
    });
  }

  drawLine(from: BoxStatement, to: BoxStatement): void {
    const fromRect = from.element!.getBoundingClientRect();
    const toRect = to.element!.getBoundingClientRect();

    this.parent.ctx!.beginPath();

    if (from.x + fromRect.width < to.x || from.x > to.x + toRect.width) {
    } else {
    }

    this.parent.ctx!.moveTo(from.x + fromRect.width, from.y + fromRect.height);
    this.parent.ctx!.lineTo(to.x, to.y);
    this.parent.ctx!.stroke();
  }
}
