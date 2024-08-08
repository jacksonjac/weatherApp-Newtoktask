import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
 locationForm!: FormGroup;

  constructor(private fb: FormBuilder, private locationService: LocationService, private toastr: ToastrService,) {}

  ngOnInit() {
    this.locationForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required]
    });
    console.log("location page")
  }

  onSubmit() {
    if (this.locationForm.valid) {
      console.log("passing submited data",this.locationForm.value)
      this.locationService.addLocation(this.locationForm.value).subscribe(
        response => {
          console.log('Location added successfully', response);
          this.toastr.success('Location Added successfully!', 'Success');
          this.locationForm.reset();
        },
        error => {
          console.error('Error adding location', error);
        }
      );
    } else {
     this.toastr.error('Invalid Form')
    }
  }
}
