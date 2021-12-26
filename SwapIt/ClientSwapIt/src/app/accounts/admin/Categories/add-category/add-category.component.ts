import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/CategoryModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service:AdminService,
    private router:Router,
    private activateRoute:ActivatedRoute,
  ) { }

  title:string;
  btnTitle:string;
  catForm:FormGroup;
  category:Category;
  message:string;
  id:number;


  ngOnInit(): void {

    this.category={
      categoryId:0,
      categoryName:'',
      categoryImage: ''
    }
    this.id=0;
    this.btnTitle='ADD';
    this.title='Add new Category';

    this.catForm=this.fb.group({
      catName:['',Validators.required]
    })

    this.activateRoute.paramMap.subscribe(param=>{
      var id=+param.get('id');
      var name=param.get('id1');
      if(id &&name){
        this.title="Edit Category's information";
          this.btnTitle="Update Category";
          this.id=id;
          this.catForm.patchValue({
            catName:name
          });
      }
    })
  }

  AddCategory(){
    var name=this.catForm.value.catName;
    if(name){
      if(this.id>0){

      this.category.categoryId=this.id;
      this.category.categoryName=name;
      this.service.EditCategory(this.category).subscribe(cat=>{
        this.GoToList();
        
      },ex=>{
        this.message='error';
        console.log(ex);
        
      })
        
      }else{
      this.category.categoryId=0;
      this.category.categoryName=name;
      this.service.AddCategory(this.category).subscribe(cat=>{
        this.message='Category is Added Successfully';
        this.catForm.reset();
      },ex=>{
        this.message='error';
        console.log(ex);
        
      })
      }
      
    }
  }


  GoToList(){
    sessionStorage.setItem('cat','cat');
    this.router.navigate(['/admin']);
  }
}
