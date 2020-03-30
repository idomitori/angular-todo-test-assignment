import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStoreService } from './todo-store.service';
import { LOCAL_STORAGE_TOKEN } from './todo.base';

const LOCAL_STORAGE_KEY = 'ANGULAR_TEST_TASK_STORE';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: LOCAL_STORAGE_TOKEN,
      useValue: LOCAL_STORAGE_KEY
    },
    TodoStoreService
  ]
})
export class TodoModule {}
