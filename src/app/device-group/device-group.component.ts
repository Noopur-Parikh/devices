import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-device-group',
  templateUrl: './device-group.component.html',
  styleUrls: ['./device-group.component.css']
})
export class DeviceGroupComponent implements OnInit {

  groups: any[];
  form: FormGroup;
  constructor(private groupService: GroupService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.groupService.getAll().subscribe((data) =>{
      this.groups = data;
      //For debugging
      //console.log(this.groups);
    },
    err => console.log(err),
    () => {
      this.form = this._formBuilder.group({
        name: [null, Validators.required]
      });
    });
  }

  addGroup() {
    const group = {
      name: this.form.controls['name'].value,
      devices: []
    }
    this.groups.push(group);
    //Remember to actually add the group to the database
  }
}
