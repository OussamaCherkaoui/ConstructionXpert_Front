import {Component, OnInit} from '@angular/core';
import {Project} from "../model/project";
import {ProjectService} from "../service/project.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css'
})
export class ListProjectComponent  implements OnInit{

  ListProject : Project[]=[];
  ngOnInit(): void {
   this.getAllProject();
  }


constructor(private  projetService :ProjectService) {

}

   getAllProject(){
 this.projetService.getAllProject().subscribe((data :Project[]) =>{
   this.ListProject = data;
 })
}



}
