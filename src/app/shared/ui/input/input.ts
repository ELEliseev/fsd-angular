import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class UiInput {
  readonly label = input('');
  readonly placeholder = input('');
  readonly multiline = input(false);
  readonly value = model('');

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value.set(target.value);
  }
}
