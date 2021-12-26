import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/CategoryModel';
import { SubCategory } from 'src/app/models/SubCategory';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service:AdminService,
    private router:Router,
    private activateRoute:ActivatedRoute,
  ) { }

  title:string;
  btnTitle:string;
  subCatForm:FormGroup;
  subCategory:SubCategory;
  categories:Category[];
  message:string;
  id:number;

  ngOnInit(): void {

    this.subCategory={
      departmentId:0,
      categoryId:0,
      departmentName:'',
      category:{
        categoryId:0,
        categoryName:'',
        categoryImage:'',

      }
    }
    this.id=0;
    this.categories=[];
    this.btnTitle='ADD';
    this.title='Add new Category';

    this.subCatForm=this.fb.group({
      catName:['',Validators.required],
      catId:[0,[Validators.required]]
    })

    this.getCategories();

    this.activateRoute.paramMap.subscribe(param=>{
      var subId=+param.get('id');
      var subName=param.get('id1');
      var catId=param.get('id2');
      if(subId &&subName){
        this.title="Edit Category's information";
          this.btnTitle="Update Category";
          this.id=subId;
          this.subCatForm.patchValue({
            catName:subName,
            catId:catId
          });
      }
    })
  }
  getCategories(){
    this.service.GetAllCategories().subscribe(list=>{
      this.categories=list;
    },ex=>console.log(ex));
  }

  AddSubCategory(){
    var name=this.subCatForm.value.catName;
    var catId=this.subCatForm.value.catId;
    if(name && catId>0){
      if(this.id>0){

      this.subCategory.departmentId=this.id;
      this.subCategory.categoryId=catId;
      this.subCategory.departmentName=name;
      this.subCategory.category.categoryId=catId;
      this.subCategory.category.categoryName='hello';
      this.service.EditSubCategory(this.subCategory).subscribe(cat=>{
        this.GoToList();
        
      },ex=>{
        this.message='error';
        console.log(ex);
        
      })
        
      }else{
      this.subCategory.departmentId=0;
      this.subCategory.departmentName=name;
      this.subCategory.categoryId=catId;
      this.subCategory.category.categoryName='Hello';
      this.service.AddSubCategory(this.subCategory).subscribe(cat=>{
        this.message='Category is Added Successfully';
        this.subCatForm.reset();
      },ex=>{
        this.message='error';
        console.log(ex);
        
      })
      }
      
    }
  }


  GoToList(){
    sessionStorage.setItem('subcat','subcat');
    this.router.navigate(['/admin']);
  }
}
