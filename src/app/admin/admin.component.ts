import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
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
    NgForOf
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
      projectId: [this.taskData?.projectId || null, [Validators.required]]
    });
    this.resourceForm = this.fb.group({
      name: [this.resourceData?.name || '', [Validators.required]],
      type: [this.resourceData?.type || '', [Validators.required]],
      quantity: [this.resourceData?.quantity || '', [Validators.required]],
      taskId: [this.resourceData?.taskId || null, [Validators.required]]
    });
      this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe((projects: Project[]) => {
      this.projects = projects;
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
    }
  }

  onSubmitTask() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.isEditTaskMode) {
        // Mode modification
        task.projectId=this.idProjectSelected;
        console.log(task.projectId);
        task.id=this.idTaskSelected;
        this.taskService.updateTask(task).subscribe(data => {
          this.message = data ? 'Tâche mise à jour avec succès' : 'Erreur lors de la mise à jour de la tâche !';
        });
      } else {
        this.taskService.saveTask(task).subscribe(data => {
          this.message = data ? 'Tâche ajoutée avec succès' : 'Erreur lors de l\'ajout de la tâche !';
        });
      }
    }
  }
  onSubmitResource() {
    if (this.resourceForm.valid) {
      const resource: Ressource = this.resourceForm.value;
      if (this.isEditResourceMode) {
        resource.id=this.idRessourceSelected;
        resource.taskId=this.idTaskSelected;
        this.ressourceService.updateRessource(resource).subscribe(data => {
          this.message = data ? 'Ressource mise à jour avec succès' : 'Erreur lors de la mise à jour de la ressource !';
          this.isEditResourceMode = false;
        });
      } else {
        this.ressourceService.saveRessource(resource).subscribe(data => {
          this.message = data ? 'Ressource ajoutée avec succès' : 'Erreur lors de l\'ajout de la ressource !';
        });
      }
    }
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
    this.taskService.getAllTaskByIdProject(id).subscribe((tasks: Task[]) => {
      this.selectedProject=false;
      this.selectedProjectTasks=true;
      console.log(tasks);
      this.tasks = tasks;
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

  deleteTask(taskId: number | undefined) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.viewTasks(this.idProjectSelected);
    });
  }

  viewResources(taskId: number | undefined) {
    this.ressourceService.getAllRessourceByIdTask(taskId).subscribe((resources: Ressource[]) => {
      this.selectedProjectTasks=false;
      this.selectedTaskResources=true;
      this.ressources = resources;
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

  deleteResource(id: number | undefined) {
    this.ressourceService.deleteRessource(id).subscribe(() => {
      this.viewResources(this.idTaskSelected);
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
}
