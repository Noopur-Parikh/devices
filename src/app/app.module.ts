import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { RoutingComponentComponent } from './routing-component/routing-component.component';
import { DeviceGroupComponent } from './device-group/device-group.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceCrudComponent } from './device-crud/device-crud.component';
import { DeviceGroupCrudComponent } from './device-group-crud/device-group-crud.component';

const routes: Routes = [
  {path: 'device', component: DeviceComponent},
  {path: 'device/:id', component: DeviceCrudComponent},
  {path: 'device_group', component: DeviceGroupComponent},
  {path: 'device_group/:id', component: DeviceGroupCrudComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    RoutingComponentComponent,
    DeviceGroupComponent,
    DeviceCrudComponent,
    DeviceGroupCrudComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
