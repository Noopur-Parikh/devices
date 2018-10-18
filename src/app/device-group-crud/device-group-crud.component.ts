import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-device-group-crud',
  templateUrl: './device-group-crud.component.html',
  styleUrls: ['./device-group-crud.component.css']
})
export class DeviceGroupCrudComponent implements OnInit {

  group: any;
  id: any;
  operation: string = '';
  form: FormGroup;
  devices: any[];
  itemRemoved = false;

  constructor(private groupService: GroupService, private route: ActivatedRoute, private _formBuilder: FormBuilder) { 
    this.route.params.subscribe(res => { 
      this.id = res.id;
      //For Debugging
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.groupService.getID(this.id).subscribe((data) =>{
      this.group = data;
      //For debugging
      console.log(this.group);
    },
    err => console.log(err),
    () => {
      this.form = this._formBuilder.group({
        name: [this.group.name, Validators.required],
        ip: [null],
        hostname: [null]
      });
      this.devices = this.group.devices;
    });
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

  setCRUD(op: string) {
    this.operation = op;
  }

  groupsString(groups: any[]) {
    return groups.join(", ")
  }

  
  showSubmitButton() {
    return this.itemRemoved || (this.form.controls['name'].valid && this.form.controls['name'].touched) || (this.form.controls['hostname'].valid && this.form.controls['hostname'].touched) || (this.form.controls['ip'].valid && this.form.controls['ip'].touched)
  }

  
  removeDevice(device: any) {
    var index = this.findDeviceByID(device.id);
    console.log(device);
    if (index > -1) {
      console.log("Removing: " + this.group[index]);
      this.group.devices.splice(index, 1);
      this.itemRemoved = true;
    }
  }

  findDeviceByID(id: string) {
    for (var i = 0; i < this.devices.length; i++) {
      if(this.devices[i].id == id) return i;
    }
    return -1
  }

  addDevice() {
    const item = {
      hostname: this.form.controls['hostname'].value,
      ip: this.form.controls['ip'].value,
      group: [this.group.name]
    };
    console.log(item);
    this.devices.push(item);
    this.form.controls['hostname'].setValue('');
    this.form.controls['ip'].setValue('');
  }
}
