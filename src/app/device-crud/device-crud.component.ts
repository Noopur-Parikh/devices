import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';



@Component({
  selector: 'app-device-crud',
  templateUrl: './device-crud.component.html',
  styleUrls: ['./device-crud.component.css']
})
export class DeviceCrudComponent implements OnInit {

  id: any;
  device: any;
  form: FormGroup;
  groups: any[];
  operation: string;
  itemRemoved: boolean = false;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.route.params.subscribe(res => { 
      this.id = res.id;
      //For Debugging
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.deviceService.getID(this.id).subscribe(
      data =>  {
        this.device = data;
        console.log(this.device);
      },
      err => console.log(err),
      () => {
        this.form = this._formBuilder.group({
          ip: [this.device.ip, Validators.required],
          hostname: [this.device.hostname, Validators.required],
          group: [null]
        });
        this.groups = this.device.group;
      }
    );
  }

  setCRUD(op: string) {
    this.operation = op;
  }

  removeGroup(name: string) {
    var index = this.findGroupByIndex(name);
    if (index > -1) {
      console.log("Removing: " + this.groups[index]);
      this.groups.splice(index, 1);
      this.itemRemoved = true;
    }
  }

  findGroupByIndex(group: string) {
    for (var i = 0; i < this.groups.length; i++) {
      if(this.groups[i] == group) return i;
    }
    return -1
  }
  
  onSubmit() {
    console.log('Submiting data');
    switch(this.operation) {
      case "update": {
        console.log('Updating');
        break;
      }
      case "delete": {
        console.log('Deleting');
        break;
      }
    }
  }

  showSubmitButton() {
    return this.itemRemoved || (this.form.controls['hostname'].valid && this.form.controls['hostname'].touched) || (this.form.controls['ip'].valid && this.form.controls['ip'].touched)
  }

  groupsString(groups: any[]) {
    return groups.join(", ")
  }

  addGroup(group: string) {
    this.groups.push(group);
    this.form.controls['group'].setValue('');
    this.itemRemoved = true;
  }
}
