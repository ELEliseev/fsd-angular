import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UiSelect } from './select';
import type { UiSelectOption } from './select-option';

@Component({
  imports: [UiSelect],
  template: `<ui-select [options]="options" [value]="value()" (valueChange)="value.set($event)" />`,
})
class Host {
  readonly options: readonly UiSelectOption[] = [
    { value: '', label: 'Без исполнителя' },
    { value: 'u1', label: 'Андрей' },
    { value: 'u2', label: 'Мария' },
  ];
  readonly value = signal('u1');
}

describe('UiSelect', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    return { fixture, select };
  }

  it('показывает текущее значение при динамических опциях', async () => {
    const { select } = await setup();
    expect(select.value).toBe('u1');
  });

  it('обновляет отображение при смене значения снаружи', async () => {
    const { fixture, select } = await setup();
    fixture.componentInstance.value.set('u2');
    await fixture.whenStable();
    expect(select.value).toBe('u2');
  });

  it('сообщает о выборе пользователя', async () => {
    const { fixture, select } = await setup();
    select.value = 'u2';
    select.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.value()).toBe('u2');
  });
});
