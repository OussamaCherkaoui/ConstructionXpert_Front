import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {Project} from "../model/project";
import {MatNativeDateModule} from "@angular/material/core";
import {ProjectService} from "../service/project.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {Ressource} from "../model/ressource";
import {RessourceService} from "../service/ressource.service";
import {ListProjectComponent} from "../list-project/list-project.component";
import {RouterLink} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatButtonModule,
    NgIf,
    DatePipe,
    NgForOf,
    ListProjectComponent,
    RouterLink,
    MatPaginator,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  projectData: Project | null = null;
  projectForm!: FormGroup;
  isEditMode = false;
  message: string='';
  taskForm!: FormGroup;
  isEditTaskMode = false; // Pour la modification des tâches
  taskData: Task | null = null;
  resourceForm!: FormGroup;
  isEditResourceMode = false; // Pour la modification des ressources
  resourceData: Ressource | null = null;
  projects: Project[] = [];
  tasks: Task[] | null = null;
  ressources: Ressource[] | null = null;
  selectedProject:boolean=true;
  selectedTaskResources: boolean=false;
  selectedProjectTasks: boolean=false;
  isFormProject: boolean=false;
  isFormTask: boolean=false;
  isFormRessource: boolean=false;
  idProjectSelected:number | undefined=0;
  idTaskSelected:number| undefined=0;
  idRessourceSelected:number| undefined=0;
  pageIndex = 0;
  ascending = true;
  totalItems = 0;
  nameSearched: string="";
  statusSearched: string = "";
  typeSearched: string="";

  constructor(private fb: FormBuilder,private projectService:ProjectService,private taskService: TaskService,private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.isEditMode = !!this.projectData;

    this.projectForm = this.fb.group({
      name: [this.projectData?.name || '', [Validators.required]],
      description: [this.projectData?.description || '', [Validators.required]],
      startDate: [this.projectData?.startDate || '', [Validators.required]],
      endDate: [this.projectData?.endDate || '', [Validators.required]],
      budget: [this.projectData?.budget || null]
    });
    this.taskForm = this.fb.group({
      title: [this.taskData?.title || '', [Validators.required]],
      description: [this.taskData?.description || '', [Validators.required]],
      status: [this.taskData?.status || '', [Validators.required]],
    });
    this.resourceForm = this.fb.group({
      name: [this.resourceData?.name || '', [Validators.required]],
      type: [this.resourceData?.type || '', [Validators.required]],
      quantity: [this.resourceData?.quantity || '', [Validators.required]],
    });
      this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject(this.pageIndex,this.ascending).subscribe(data => {
      this.projects = data.content;
      console.log(data);
      this.totalItems = data.totalElements;
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;
      if (this.isEditMode) {
        project.id=this.idProjectSelected;
        console.log(project);
        this.projectService.updateProject(project).subscribe(data => {
          if (data)
          {
            this.message='Project Modifié avec succes';
          }
          else{
            this.message="Erreur lors de modification !! Ressayer "
          }
        });
        console.log('Projet mis à jour : ', project);
      } else {
        this.projectService.saveProject(project).subscribe(data => {
          if (data)
          {
            this.message='Project ajoutée avec succes';
          }
          else{
            this.message="Erreur lors d ajout !! Ressayer "
          }
        });
      }
      this.message='';
    }
  }

  onSubmitTask() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      task.projectId=this.idProjectSelected;
      if (this.isEditTaskMode) {
        // Mode modification
        console.log(task.projectId);
        task.id=this.idTaskSelected;
        this.taskService.updateTask(task).subscribe(data => {
          this.refreshTask(task.projectId);
          this.message = data ? 'Tâche mise à jour avec succès' : 'Erreur lors de la mise à jour de la tâche !';
        });
      } else {
        this.taskService.saveTask(task).subscribe(data => {
          this.refreshTask(task.projectId);
          this.message = data ? 'Tâche ajoutée avec succès' : 'Erreur lors de l\'ajout de la tâche !';
        });
      }
      this.message='';
    }
  }
  onSubmitResource() {
    if (this.resourceForm.valid) {
      const resource: Ressource = this.resourceForm.value;
      resource.taskId=this.idTaskSelected;
      if (this.isEditResourceMode) {
        resource.id=this.idRessourceSelected;
        this.ressourceService.updateRessource(resource).subscribe(data => {
          this.refreshRessource(resource.taskId);
          this.message = data ? 'Ressource mise à jour avec succès' : 'Erreur lors de la mise à jour de la ressource !';
          this.isEditResourceMode = false;
        });
      } else {
        this.ressourceService.saveRessource(resource).subscribe(data => {
          this.refreshRessource(resource.taskId);
          this.message = data ? 'Ressource ajoutée avec succès' : 'Erreur lors de l\'ajout de la ressource !';
        });
      }
      this.message='';
    }
  }

  refreshTask(id:number|undefined){
    this.taskService.getAllTaskByIdProject(id,this.pageIndex,this.ascending).subscribe(data => {
      this.tasks = data.content;
      this.totalItems = data.totalElements;
    });
  }
  refreshRessource(id:number|undefined){
    this.ressourceService.getAllRessourceByIdTask(id,this.pageIndex,this.ascending).subscribe(data => {
      this.ressources = data.content;
      this.totalItems = data.totalElements;
    });
  }
  showAddProjectForm() {
    this.selectedProject=false;
    this.isFormProject=true;
  }

  editProject(project:Project) {
    this.projectForm = this.fb.group({
      name: [project.name],
      description: [project.description],
      startDate: [project.startDate],
      endDate: [project.endDate],
      budget: [project.budget]
    });
    this.idProjectSelected=project.id;
    this.selectedProject=false;
    this.isFormProject=true;
    this.isEditMode=true;
  }

  deleteProject(id: number | undefined) {
        this.projectService.deleteProject(id).subscribe(data => {
            this.getAllProject();
        });
  }

  viewTasks(id: number | undefined) {
    this.pageIndex=0;
    this.ascending=true;
    this.taskService.getAllTaskByIdProject(id,this.pageIndex,this.ascending).subscribe(data => {
      this.selectedProject=false;
      this.selectedProjectTasks=true;
      this.idProjectSelected=id;
      console.log(data);
      this.tasks = data.content;
      this.totalItems = data.totalElements;
    });
  }
  editTask(task: Task) {
    this.taskForm = this.fb.group({
      status: [task.status],
      description: [task.description],
      title: [task.title]
    });
    this.idTaskSelected=task.id;
    this.idProjectSelected=task.projectId;
    this.selectedProjectTasks=false;
    this.isFormTask=true;
    this.isEditTaskMode=true;
  }

  deleteTask(taskId: number | undefined,idProject:number|undefined) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.viewTasks(idProject);
    });
  }

  viewResources(taskId: number | undefined) {
    this.pageIndex=0;
    this.ascending=true;
    this.ressourceService.getAllRessourceByIdTask(taskId,this.pageIndex,this.ascending).subscribe(data => {
      this.selectedProjectTasks=false;
      this.selectedTaskResources=true;
      this.idTaskSelected=taskId;
      this.ressources = data.content;
      console.log(this.ressources);
      this.totalItems = data.totalElements;
    });
  }

  editResource(resource: Ressource) {
    this.resourceForm = this.fb.group({
      type: [resource.type],
      name: [resource.name],
      quantity: [resource.quantity]
    });
    this.idRessourceSelected=resource.id;
    this.idTaskSelected=resource.taskId;
    console.log(this.idRessourceSelected);
    this.selectedTaskResources=false;
    this.isFormRessource=true;
    this.isEditResourceMode=true;
  }

  deleteResource(id: number | undefined,idTask:number|undefined) {
    this.ressourceService.deleteRessource(id).subscribe(() => {
      this.viewResources(idTask);
    });
  }

  showAddTaskForm() {
    this.selectedProjectTasks=false;
    this.isFormTask=true;
  }

  showAddRessourceForm() {
    this.selectedTaskResources=false;
    this.isFormRessource=true;
  }


  goBackToProjects() {
    this.message='';
    console.log(this.message);
    this.selectedProject=true;
    this.selectedProjectTasks=false;
    this.tasks=[];
  }

  goBackToTasks() {
    this.selectedTaskResources=false;
    this.selectedProjectTasks=true;
    this.ressources=[];
  }

  goBackInRessourceForm() {
    this.isFormRessource=false;
    this.selectedTaskResources=true;
    this.isFormRessource=false;
    this.resourceForm.reset();
  }

  goBackInTaskForm() {
    this.isEditTaskMode=false;
    this.selectedProjectTasks=true;
    this.isFormTask=false;
    this.taskForm.reset();
  }

  goBackInProjectForm() {
    this.message='';
    this.isEditMode=false;
    this.getAllProject();
    this.selectedProject=true;
    this.isFormProject=false;
    this.projectForm.reset();
  }

  onPageProjectChange(event: PageEvent) {
    this.pageIndex=event.pageIndex;
    this.getAllProject();
  }

  onPageTaskChange(event: PageEvent) {
    this.pageIndex=event.pageIndex;
    this.refreshTask(this.idProjectSelected);
  }

  onPageRessourceChange(event: PageEvent) {
    this.pageIndex=event.pageIndex;
    this.refreshRessource(this.idTaskSelected);
  }

  toggleSortProjectOrder() {
    this.ascending = !this.ascending;
    this.getAllProject();
  }


  toggleSortTaskOrder() {
    this.ascending = !this.ascending;
    this.refreshTask(this.idProjectSelected);
  }


  toggleSortRessourceOrder() {
    this.ascending = !this.ascending;
    this.refreshRessource(this.idTaskSelected);
  }

  searchProjectByName() {
    this.projectService.searchProjectsByName(this.nameSearched)
      .subscribe(response => {
        this.projects = response.content;
        this.totalItems = response.totalItems;
      }, error => {
        console.error("Erreur lors de la recherche du projet", error);
      });
  }

  searchTasksByStatus() {
    this.taskService.searchTasksByStatus(this.idProjectSelected,this.statusSearched)
      .subscribe(response => {
        this.tasks = response.content;
        this.totalItems = response.totalItems;
      })
  }

    searchRessourcesByType() {
    this.ressourceService.searchRessourcesByType(this.idTaskSelected,this.typeSearched)
      .subscribe(response => {
        this.ressources = response.content;
        this.totalItems = response.totalItems;
      })
  }
}
