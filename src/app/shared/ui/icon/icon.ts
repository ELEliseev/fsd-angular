import { Component, computed, input } from '@angular/core';
import { ICON_PATHS, type UiIconName } from './icon-paths';

@Component({
  selector: 'ui-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (d of paths(); track d) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class UiIcon {
  readonly name = input.required<UiIconName>();

  protected readonly paths = computed(() => ICON_PATHS[this.name()]);
}
