import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { Task } from 'src/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebRequestService: WebRequestService) {}

  // send a web request to create a list

  getLists(){
    return this.WebRequestService.get('lists');
  }
  
  createList(title: string){
    return this.WebRequestService.post('lists', { title: title });
  }

 

  getTasks(listId: string){
    return this.WebRequestService.get(`lists/${listId}/tasks`);
  }

  createTask( title: string, listId: string,){
    return this.WebRequestService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: any){
    // console.log(task);
    return this.WebRequestService.patch(`lists/${task._listID}/tasks/${task._id}`,
    {
      completed: !task.completed
    });
  }


}

 