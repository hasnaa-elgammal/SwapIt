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
  closeResult: string | undefined;
  image: File;
  urlimage: string
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
    this.urlimage='assets/default.jpg';
    this.image = null;
    this.successMessage = '';
    this.editmodel = {
      image: '',
      email:'',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      zipCode: '',
      phoneNumber: ''
    }
    this.userForm = this.fb.group({
      image: null,
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
        this.userForm.patchValue({
            firstName: u.firstName,
            lastName: u.lastName,
            country: u.county,
            city: u.city,
            zipCode: u.zipcode,
            phoneNumber: u.phoneNumber
        });

        if(u.userImage!= '' && u.userImage != null){
          this.urlimage = 'assets/images/users/'+ u.userImage;
        }

      }

    },err=>console.log(err));
  }

  imageprocess(event: any){
    if(event.target.files!== null && event.target.files.length >0){
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        $('#userimage').attr('src', reader.result.toString());
      }
      reader.readAsDataURL(this.image);
    } 
  }

  edit(){
      if (this.userForm.valid){
        this.validateEditModel();
        const formdata = new FormData();
        formdata.append('image', this.image);
        formdata.append('firstName', this.editmodel.firstName);
        formdata.append('lastName', this.editmodel.lastName);
        formdata.append('email', this.editmodel.email);
        formdata.append('country', this.editmodel.country);
        formdata.append('city', this.editmodel.city);
        formdata.append('zipCode', this.editmodel.zipCode);
        formdata.append('phoneNumber', this.editmodel.phoneNumber);
        this.auth.EditProfile(formdata).subscribe(success => {
          this.successMessage = 'Edited successfully!';
        }, err => {
          console.log(err);
          this.successMessage=''});        
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
