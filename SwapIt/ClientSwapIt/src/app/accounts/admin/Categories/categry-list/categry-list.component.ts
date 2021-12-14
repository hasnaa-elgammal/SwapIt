import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/CategoryModel';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-categry-list',
  templateUrl: './categry-list.component.html',
  styleUrls: ['./categry-list.component.css']
})
export class CategryListComponent implements OnInit {

  constructor(
    private service:AdminService,
    private router:Router,
  ) { }

  categories:Category[];
  num:number;
  

  ngOnInit(): void {
    this.categories=null;
    this.num=0;
    this.getCategories();
  }

  getCategories(){
    this.service.GetAllCategories().subscribe(list=>{
      this.categories=list;
      console.log(this.categories);
    },ex=>console.log(ex));
  }

  EditCategory(id:number,catName:string){
    if(id){
      this.router.navigate(['/editcategory',id,catName]);
    }
  }
  AddCategory(){
    this.router.navigate(['category']);
  }

  IsDelete(){
    var checkboxes=document.getElementsByClassName('ckitem');
    if(checkboxes.length > 0){
       for (let i = 0; i < checkboxes.length; i++) {
          if($(checkboxes[i]).is(":checked")){
            return true;
          }
         
       }
    }
    return false;
  }
  DeleteCount(){
    var count=$(".ckitem:checked").length;
    this.num=count;
  }

  DeleteConfirm(){
    var checkboxes=document.getElementsByClassName('ckitem');
    if(checkboxes.length > 0){
      var ids = [];
       for (let i = 0; i < checkboxes.length; i++) {
          if($(checkboxes[i]).is(":checked")){
            var id= $(checkboxes[i]).val() as string;
            ids.push(id);
          }
         
       }
       this.service.DeleteAllCategory(ids).subscribe(s=>{
         this.getCategories();
         $("#btnClose").trigger("click");
       },ex=>console.log(ex));
    }
    
  }

  SelectAll(){
    var tbl=$('#tbl');
    var header=tbl.find('thead .ckheader');
    var item=tbl.find('tbody .ckitem');

    
    $(function(ready){
      item.on('change',function(){
        if($(this).is(':checked')){
          $(this).closest('tr').addClass('NewRowColor');
        }
        else{
          $(this).closest('tr').removeClass('NewRowColor');
        }
      });
      header.change(function(){
        
        // var c= this.checked;
        // item.prop("checked",c);
        item.trigger('check');
        if($(this).is(':checked')){
          $(item).closest('tr').addClass('NewRowColor');

        }
        else{
          $(item).closest('tr').removeClass('NewRowColor');

        }
      });
    });
  }

}
