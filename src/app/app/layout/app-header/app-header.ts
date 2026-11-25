import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_NAME } from '@shared/config';
import { UiIcon } from '@shared/ui';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, UiIcon],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  protected readonly appName = APP_NAME;
}
