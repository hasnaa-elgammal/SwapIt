import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactModel } from 'src/app/models/ContactModel';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  constructor(
    private service:AdminService,
    private router:Router,
  ) { }

  contacts:ContactModel[];
  num:number;
  ngOnInit(): void {
    this.num=0;
    this.contacts=null;
    this.getContacts();
  }

  getContacts(){
    this.service.GetAllContacts().subscribe(list=>{
     this.contacts=list;
      console.log(list);
    },ex=>console.log(ex));
  }

  AddProduct(){
    this.router.navigate(['addproduct']);
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
         this.getContacts();
         $("#btnClose").trigger("click");
       },ex=>console.log(ex));
    }

  }
  DeleteCount(){
    var count=$(".ckitem:checked").length;
    this.num=count;
  }

}
