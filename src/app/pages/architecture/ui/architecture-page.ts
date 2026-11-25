import { Component } from '@angular/core';
import { UiIcon } from '@shared/ui';
import { ACTION_TRACE, EXERCISES, LAYERS, RULES } from '../model/layer-map';

@Component({
  selector: 'architecture-page',
  imports: [UiIcon],
  templateUrl: './architecture-page.html',
  styleUrl: './architecture-page.scss',
})
export class ArchitecturePage {
  protected readonly layers = LAYERS;
  protected readonly rules = RULES;
  protected readonly trace = ACTION_TRACE;
  protected readonly exercises = EXERCISES;
}
