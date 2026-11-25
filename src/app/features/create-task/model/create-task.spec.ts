import { TestBed } from '@angular/core/testing';
import { TaskStore, type NewTask } from '@entities/task';
import { CreateTask } from './create-task';

describe('CreateTask', () => {
  let createTask: CreateTask;
  let add: ReturnType<typeof vi.fn<(input: NewTask) => Promise<void>>>;

  beforeEach(() => {
    add = vi.fn<(input: NewTask) => Promise<void>>().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [CreateTask, { provide: TaskStore, useValue: { add } }],
    });
    createTask = TestBed.inject(CreateTask);
  });

  it('обрезает пробелы в названии и описании', async () => {
    await createTask.execute({
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

  it('не создаёт задачу с пустым названием', async () => {
    await expect(
      createTask.execute({ title: '   ', description: '', status: 'backlog', priority: 'low' }),
    ).rejects.toThrow('Название задачи не может быть пустым');
    expect(add).not.toHaveBeenCalled();
  });
});
