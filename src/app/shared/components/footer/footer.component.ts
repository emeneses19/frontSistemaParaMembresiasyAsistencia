import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'TikTok',
      icon: 'tiktok',
      url: 'https://tiktok.com/@emeneses19',
      color: '#000000'
    },    
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/in/fanymeneses',
      color: '#0A66C2'
    },
    {
      name: 'Email',
      icon: 'email',
      url: 'mailto:menesestaipe19@gmail.com',
      color: '#EA4335'
    }
  ];

  contactInfo = {
    email: 'menesestaipe19@gmail.com',
    phone: '+51 935 069 982'
  };

  openLink(url: string) {
    window.open(url, '_blank');
  }

}
