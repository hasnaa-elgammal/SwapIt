import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModel } from 'src/app/models/edit-model';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import { createUnparsedSourceFile } from 'typescript';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  userForm!: FormGroup;
  email:string;
  successMessage : string;
  editmodel: EditModel
  user: Users;
  closeResult: string | undefined;
  constructor(
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private registerservice: RegisterService,
    private modalService: NgbModal,
    private route: Router,
  ) { 
    _activatedRoute.params.subscribe(params =>
      this.email = params['email'])

  };



  ngOnInit(): void {
    this.user = new Users();
    this.successMessage = '';
    this.editmodel = {
      email:'',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      zipCode: '',
      phoneNumber: ''
    }
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: '',
      zipCode: '',
      phoneNumber: ''
    });
    this.GetProfile();

  }

  GetProfile(){
    this.auth.GetProfile(this.email).subscribe(success=> {
      var u = success;
      if (u != null){
        this.user.firstName = u.firstName;
        this.user.lastName = u.lastName;
        this.user.email = u.email;
        this.user.county = u.county;
        this.user.city = u.city;
        this.user.userImage = u.userImage;
        this.user.phoneNumber= u.phoneNumber;

        this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            country: this.user.county,
            city: this.user.city,
            zipCode: this.user.zipcode,
            phoneNumber: this.user.phoneNumber
        });
      }

    },err=>console.log(err));
  }

  edit(){
      if (this.userForm.valid){
        this.validateEditModel();
        this.edit
        this.auth.EditProfile(this.editmodel).subscribe(success => {
          this.successMessage = 'Edited successfully!';
        }, err => console.log(err));        
      } 
  }

  delete(){
    this.registerservice.Logout().subscribe( success => {
      localStorage.clear();
      this.route.navigate([''])
    }, err => console.log(err));
    this.auth.DeleteProfile(this.email).subscribe( success => {
        console.log(success)
    }, err => console.log(err));

}

  validateEditModel() {
      this.editmodel.firstName = this.userForm.value.firstName;
      this.editmodel.lastName = this.userForm.value.lastName;
      this.editmodel.email = this.email;
      this.editmodel.country = this.userForm.value.country;
      this.editmodel.city = this.userForm.value.city;
      this.editmodel.zipCode = this.userForm.value.zipCode;
      this.editmodel.phoneNumber = this.userForm.value.phoneNumber;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
