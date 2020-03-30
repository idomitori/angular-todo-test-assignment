import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ITodoItem,
  ITodoItemStruct,
  todoItemFromStructFactory
} from './todo.model';
import { LOCAL_STORAGE_TOKEN } from './todo.base';

const getInitialState = (key: string): ITodoItem[] => {
  const localState = localStorage.getItem(key);
  try {
    return (
      (JSON.parse(localState) as ITodoItemStruct[]).map(
        todoItemFromStructFactory
      ) ?? []
    );
  } catch {
    return [];
  }
};

const saveState = (key: string, state: ITodoItem[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {}
};

@Injectable()
export class TodoStoreService {
  private store$$ = new BehaviorSubject(getInitialState(this.localStorageKey));
  private store$ = this.store$$
    .asObservable()
    .pipe(tap(state => saveState(this.localStorageKey, state)));

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private localStorageKey: string) {}

  addItem(item: ITodoItem) {
    const items = [...this.store$$.getValue(), item];
    this.store$$.next(items);
  }

  getItems() {
    return this.store$;
  }

  updateItem(updatedItem: ITodoItem) {
    const items = this.store$$.getValue();
    const index = this.store$$
      .getValue()
      .findIndex(listItem => listItem.id === updatedItem.id);
    const item = todoItemFromStructFactory(updatedItem);
    items[index] = item;
    this.store$$.next([...items]);
  }

  removeItem(item: ITodoItem) {
    const items = this.store$$
      .getValue()
      .filter(listItem => listItem.id !== item.id);
    this.store$$.next(items);
  }
}
