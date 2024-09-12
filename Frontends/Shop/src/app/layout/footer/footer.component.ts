import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  copyNumber() {
    const phoneNumber = '+27 82 828 9723';
    navigator.clipboard.writeText(phoneNumber)
        .then(() => {
            console.log('Phone number copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy phone number: ', err);
        });
  }

  onCvClick() {
    window.open('assets/HenruOlivier-CV.pdf', '_blank');
  }

}
