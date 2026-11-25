import { TestBed } from '@angular/core/testing';
import { TaskStore, type NewTask } from '@entities/task';
import { CreateTask } from './create-task';

describe('CreateTask', () => {
  let createTask: CreateTask;
  let add: ReturnType<typeof vi.fn<(input: NewTask) => void>>;

  beforeEach(() => {
    add = vi.fn<(input: NewTask) => void>();
    TestBed.configureTestingModule({
      providers: [CreateTask, { provide: TaskStore, useValue: { add } }],
    });
    createTask = TestBed.inject(CreateTask);
  });

  it('обрезает пробелы в названии и описании', () => {
    createTask.execute({
      title: '  Новая задача  ',
      description: '  детали  ',
      status: 'backlog',
      priority: 'high',
    });
    expect(add).toHaveBeenCalledWith({
      title: 'Новая задача',
      description: 'детали',
      status: 'backlog',
      priority: 'high',
    });
  });

  it('не создаёт задачу с пустым названием', () => {
    expect(() =>
      createTask.execute({ title: '   ', description: '', status: 'backlog', priority: 'low' }),
    ).toThrow('Название задачи не может быть пустым');
    expect(add).not.toHaveBeenCalled();
  });
});
