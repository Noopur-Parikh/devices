import { Injectable } from '@angular/core';
//No needed after API is implemented
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groups: any[] = [
    {name: 'Group 1', id: 1, devices: [{hostname: 'Host 1', ip: '255.123.123.255', group: ['Group 1', 'Group 2'], id: '1'}, {hostname: 'Host 4', ip: '205.126.173.225', group: ['Group 1', 'Group 3'],  id: '4'}]},
    {name: 'Group 2', id: 2, devices: [{hostname: 'Host 1', ip: '255.123.123.255', group: ['Group 1', 'Group 2'], id: '1'}, {hostname: 'Host 3', ip: '235.125.113.115', group: ['Group 3', 'Group 2'],  id: '3'}]},
    {name: 'Group 3', id: 3, devices: [{hostname: 'Host 2', ip: '215.124.103.155', group: ['Group 3'],  id: '2'}, {hostname: 'Host 3', ip: '235.125.113.115', group: ['Group 3', 'Group 2'],  id: '3'}, {hostname: 'Host 4', ip: '205.126.173.225', group: ['Group 1', 'Group 3'],  id: '4'}]},
  ];

  constructor() { }

  //Remove Observable<any[]> After API is implemented
  getAll(): Observable<any[]> {
    //Replace with actual API request
    return of(this.groups);
  }

  getID(id: any): Observable<any> {
    const index = this.findGroupByID(id);
    if (index >= 0) { return of(this.groups[index]) }
  }

  //This function is not required after API is implemented
  findGroupByID(id: any) {
    for(let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id == id) { return i }
    }
    return -1;
  }
}
