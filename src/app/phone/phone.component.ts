import { Component } from '@angular/core';

interface Users {
    userName : string;
    phoneNumber : string;
    email : string;
    file : string|null|ArrayBuffer;
}

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})

export class PhoneComponent {
    formClass : string = 'my-3';
    inputClass : string = 'form-control';
    labelClass : string = 'form-label text-primary'
    
    userName : string = '';
    phoneNumber : string = '';
    email : string = '';
    file : string|null|ArrayBuffer = '';
    allUsers : Users[] = [];
    gottenUsers : Users[] = [];
    errormsg : string = ''
    
    ngOnInit() {
        // console.log("loaded");
        if(localStorage['allContacts']) {
            this.gottenUsers = JSON.parse(localStorage['allContacts'])
            console.log(this.gottenUsers);
            
        } else {
            this.gottenUsers = []
        }
    }

    onFileSelected(event: any) {
        let selectedFile = event.target.files[0];
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = () => {
            console.log(reader.result)
            this.file = reader.result
            console.log(this.file);
        }
    }

    addContact() {
        // console.log('working');
        if (this.userName != '' && this.phoneNumber != '' && this.email != '' && this.file != '') {
            let users = {
                userName : this.userName,
                phoneNumber : this.phoneNumber,
                email : this.email,
                file : this.file
            }
            // console.log(users);
            this.allUsers.push(users)
            this.save()
            console.log(this.allUsers);

            this.userName = '';
            this.phoneNumber = '';
            this.email = '';
            this.file = '';

        } else {
            // alert('You dey whine? Alaye, fill the inputs')
            this.errormsg = "Alaye, shey you dey whine me ni"
        }   
    }
    
    save() {
        localStorage['allContacts'] = JSON.stringify(this.allUsers)
    }
}
