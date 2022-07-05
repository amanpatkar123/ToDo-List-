import { Component, OnInit } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../model/task';
import { CrudService } from '../service/crud.service';
import { createPopper } from '@popperjs/core';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taskObj :Task = new Task();
  taskArr :Task[] =[] ;
  closeResult: string = '';
  addTaskvalue :string ='' ;
  editTaskValue :string = '';
  constructor( private crud:CrudService ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskvalue = '';
    this.taskObj = new Task();
    this.taskArr =[];
    this.getAllTask();
  }
  getAllTask() {
    this.crud.getAllTask().subscribe((res) =>{
      this.taskArr =res;
    }, err =>{
      alert("unable to get the list");
    })
  }

addTask(){
  this.taskObj.task_name = this.addTaskvalue;
  this.crud.addTask(this.taskObj).subscribe((res) =>{
    this.ngOnInit();
    this.addTaskvalue ='';
  }, err =>{
    alert(err);
  })
}
 editTask(){
  this.taskObj.task_name = this.editTaskValue;
  this.crud.editTask(this.taskObj).subscribe((res)=>{
   this.ngOnInit();
  }, err=>{
    alert("failed to update list")
  })
 }
  deleteTask(eTasks:Task){
    this.crud.deleteTask(eTasks).subscribe((res) =>{
    this.ngOnInit();
    }, err =>{
      alert("failed to delete task")
    })
  }

  call(eTask:Task){
    this.taskObj =eTask;
    this.editTaskValue = eTask.task_name;
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

