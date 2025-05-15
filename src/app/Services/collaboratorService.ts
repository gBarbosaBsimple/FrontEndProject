import { Injectable } from '@angular/core';
import { Collaborator } from '../collaboratorInterface';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private collaboratortList: Collaborator[] = [
    {
        id: 1,
        userId: 101,
        initDate: new Date('2023-01-01T00:00:00'),  
        finalDate: new Date('2023-12-31T23:59:59') 
      },
      {
        id: 2,
        userId: 102,
        initDate: new Date('2024-02-01T08:00:00'), 
        finalDate: new Date('2024-11-30T18:00:00') 
      },
      {
        id: 3,
        userId: 103,
        initDate: new Date('2025-05-10T09:00:00'), 
        finalDate: new Date('2025-12-10T17:00:00') 
      }
  ];

  getCollaborator(): Collaborator[] {
    return this.collaboratortList;
  }
}