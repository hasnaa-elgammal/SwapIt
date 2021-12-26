import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ProductModel } from 'src/app/models/ProductModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private service:AdminService,
    private router:Router,
  ) { }

  products:ProductModel[];
  num:number;
  ngOnInit(): void {
    this.num=0;
    this.products=null;
    this.getProducts();
  }
  getProducts(){
    this.service.GetAllProducts().subscribe(list=>{
      this.products=list;
      console.log(list);
    },ex=>console.log(ex));
  }

  EditProduct(id:number){
    if(id){
      this.router.navigate(['editproduct/',id]);
    }
  }
  AddProduct(){
    this.router.navigate(['addproduct']);
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
       this.service.DeleteAllProducts(ids).subscribe(s=>{
         this.getProducts();
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



