import { Component, computed, input } from '@angular/core';
import type { User } from '../model/types';

@Component({
  selector: 'user-avatar',
  template: `<span class="avatar" [style.background]="user().color" [title]="user().name">
    {{ initials() }}
  </span>`,
  styles: `
    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.35rem;
      height: 1.35rem;
      border-radius: 50%;
      font-size: 0.6rem;
      font-weight: 700;
      color: #0e1015;
      flex-shrink: 0;
    }
  `,
})
export class UserAvatar {
  readonly user = input.required<User>();

  protected readonly initials = computed(() =>
    this.user()
      .name.split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );
}
