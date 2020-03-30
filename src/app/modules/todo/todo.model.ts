let idCounter = 1;

export enum TodoImportance {
  Low,
  Medium,
  High
}

export type ITodoStatus = 'open' | 'done';

export interface ITodoItemStruct {
  id: string;
  content: string;
  createdAt: Date;
  status: ITodoStatus;
  importance: TodoImportance;
}

export interface ITodoItem extends ITodoItemStruct {
  switchState(): void;

  updateContent(content: string): void;

  updateImportance(importance: TodoImportance): void;
}

export class TodoItem implements ITodoItem {
  id: string;
  status: ITodoStatus;
  createdAt: Date;
  content: string;
  importance: TodoImportance;

  constructor(
    content: string,
    importance: TodoImportance = TodoImportance.Medium,
    status: ITodoStatus,
    id?: string,
    createdAt?: Date
  ) {
    this.createdAt = createdAt ?? new Date();
    this.id = id ?? String(`${this.createdAt.getTime()}-${idCounter++}`);
    this.status = status;
    this.importance = importance;
    this.content = content;
  }

  switchState() {
    switch (this.status) {
      case 'open':
        this.status = 'done';
        break;
      case 'done':
        this.status = 'open';
        break;
    }
  }

  updateContent(content: string) {
    this.content = content;
  }

  updateImportance(importance: TodoImportance) {
    this.importance = importance;
  }
}

export const todoItemFactory = (
  content: string,
  importance: TodoImportance
) => {
  return new TodoItem(content, importance, 'open');
};

export const todoItemFromStructFactory = (item: ITodoItemStruct) => {
  return new TodoItem(
    item.content,
    item.importance,
    item.status,
    item.id,
    item.createdAt
  );
};
