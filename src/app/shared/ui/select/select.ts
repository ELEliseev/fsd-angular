import { Component, input, model } from '@angular/core';
import type { UiSelectOption } from './select-option';

@Component({
  selector: 'ui-select',
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class UiSelect {
  readonly label = input('');
  readonly options = input.required<readonly UiSelectOption[]>();
  readonly value = model('');

  protected onChange(event: Event): void {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
