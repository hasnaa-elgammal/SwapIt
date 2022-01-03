import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactModel } from 'src/app/models/ContactModel';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private service:AdminService,
    private router:Router,
  ) { }

  
  ngOnInit(): void {
    
  }

  
}
