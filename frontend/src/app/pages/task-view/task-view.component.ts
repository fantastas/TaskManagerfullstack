import { HttpClient } from '@angular/common/http';
import { TaskService } from './../../task.service';
import { Task } from 'src/models/task.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Emitters } from 'src/emitters/emitters';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  selectedListId: string | undefined;

  constructor(private taskService: TaskService, 
    private route: ActivatedRoute, private router: Router,
    private http: HttpClient) { }

    ngOnInit() {
      
      this.route.params.subscribe(
        (params: Params) => {
          if (params.listId) {
            this.selectedListId = params.listId;
            this.taskService.getTasks(params.listId).subscribe((tasks: any) => {
              this.tasks = tasks;
            })
          } else {
            this.tasks = undefined;
          }
        }
      )
  
      this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      })

      this.http.get('http://localhost:3000/users/login/user', {withCredentials: true}).subscribe(res =>{
        console.log(res);
        Emitters.authEmitter.emit(true);
      }, err => {
        
        Emitters.authEmitter.emit(false);
        this.router.navigate(['login']);
  
      });
    
  }
    onTaskClick(task: any){
      this.taskService.complete(task).subscribe(() =>{
        console.log("Task completed");
        task.completed = !task.completed;
      })
    }


}
