import { TestBed } from '@angular/core/testing';
import { TaskStore, type Task } from '@entities/task';
import { EditTask } from './edit-task';

describe('EditTask', () => {
  const task: Task = {
    id: 't1',
    title: 'Старое название',
    description: 'Старое описание',
    status: 'in-progress',
    priority: 'low',
    assigneeId: null,
    createdAt: '2026-11-20T10:00:00.000Z',
  };

  let editTask: EditTask;
  let update: ReturnType<typeof vi.fn<(task: Task) => void>>;

  beforeEach(() => {
    update = vi.fn<(task: Task) => void>();
    TestBed.configureTestingModule({
      providers: [EditTask, { provide: TaskStore, useValue: { update } }],
    });
    editTask = TestBed.inject(EditTask);
  });

  it('обновляет поля и обрезает пробелы, сохраняя остальное', () => {
    editTask.execute(task, {
      title: '  Новое название  ',
      description: '  новое описание  ',
      priority: 'high',
    });
    expect(update).toHaveBeenCalledWith({
      ...task,
      title: 'Новое название',
      description: 'новое описание',
      priority: 'high',
    });
  });

  it('не сохраняет пустое название', () => {
    expect(() =>
      editTask.execute(task, { title: '   ', description: '', priority: 'low' }),
    ).toThrow('Название задачи не может быть пустым');
    expect(update).not.toHaveBeenCalled();
  });
});
