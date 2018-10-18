import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices: any;
  form: FormGroup;
  constructor(private deviceService: DeviceService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.deviceService.getAll().subscribe((data) =>{
      this.devices = data;
      //For debugging
      //console.log(this.devices);
    },
    err => console.log(err),
    () => {
      this.form = this._formBuilder.group({
        ip: [null],
        hostname: [null],
        group: [null]
      });
    });
  }

  groupsString(groups: any[]) {
    return groups.join(", ")
  }
  addDevice() {
    const device = {hostname: this.form.controls['hostname'].value , ip: this.form.controls['ip'].value, group: this.form.controls['group'].value.split(',')};
    console.log(device);
    this.devices.push(device);
  }
}
