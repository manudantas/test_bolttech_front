import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectComponent } from './project.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [ProjectComponent, ProjectCardComponent, ProjectFormComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class ProjectModule {}
