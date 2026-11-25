import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class UiButton {
  readonly variant = input<'primary' | 'ghost' | 'danger'>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
}
