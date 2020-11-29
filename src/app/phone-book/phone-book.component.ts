import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { PhoneService } from '../phone.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {
  users = {};
  usersArra = [];
  isEmailExist = true;
  isUpdateButtonEnabled = false;
  user = new User();

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    this.GetAllUsers();
  }

  //function to get all the users
  GetAllUsers(): any {
    this.phoneService.GetAllUsers().subscribe(res => {
      this.users = res;
      this.usersArra = this.users["data"];
      console.log(this.usersArra);
      console.log(res);
    });
  }

  //function to check whether Email already exist if not then add the user object
  PostUser(user,form: NgForm) {
    this.usersArra.map(element => {
      if (element.email === user.email) {
        alert('Email already exist in the PhoneBook');
        this.isEmailExist = false;
      }
    })
    if (this.isEmailExist) {
      this.usersArra.push(this.user);
      console.log(this.user);
      console.log(this.users);
      alert('Email registered Successfully');
    }
    this.isEmailExist = true;
    this.phoneService.PostUser(this.users);
    this.resetForm(form);
  }

  //function to UpdateUser object 
  UpdateUser(email, user) {
    this.phoneService.UpdateUser(email, user).subscribe(data => {
      alert('Updated Successfully');
    });
  }

  //function to populate Data To Form after clicking Update Button in table
  populateDataToForm(email) {
    var filteredObj: User;
    filteredObj = new User();
    filteredObj = this.usersArra.find(function (item, i) {
      if (item.email === email) {
        return item;
      }
    });
    this.user = new User();
    this.user.firstName = filteredObj.firstName;
    this.user.lastName = filteredObj.lastName;
    this.user.email = filteredObj.email;
    this.isUpdateButtonEnabled = true;
  }

  //function to reset the form
  resetForm(contactForm: NgForm) {
    contactForm.resetForm();
  }
}
