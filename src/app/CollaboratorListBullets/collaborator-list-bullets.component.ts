import { Component, Signal } from '@angular/core';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { CollaboratorService } from '../Services/collaboratorService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-collaborator-list-bullets',
  imports: [CommonModule],
  templateUrl: './collaborator-list-bullets.component.html',
  styleUrl: './collaborator-list-bullets.component.css'
})
export class CollaboratorListBulletsComponent {
  collaboratorList: Signal<Collaborator[]>;

  constructor(private collaboratorService: CollaboratorService) {
    this.collaboratorList = this.collaboratorService.getCollaboratorSignal();
  }

  Details(collaborator:Collaborator){
    this.collaboratorService.selectCollaborator(collaborator); // Atualiza o Signal
  }
}
