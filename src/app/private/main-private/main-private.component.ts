import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-main-private',
  templateUrl: './main-private.component.html',
  styleUrls: ['./main-private.component.scss']
})
export class MainPrivateComponent implements OnInit {
  fullName: string|null = 'Loading...';
  initial: string|null = '';
  items: NbMenuItem[] = [
    {
      title: 'Accueil',
      icon: 'home',
      link: '/home',
      group: false
    },
    {
      title: 'Boîte à outils',
      icon: 'edit-2-outline',
      children: [
        {
          title: 'Articles',
          icon: 'book-open-outline',
          link: '/links',
        },
        {
          title: 'Catégories',
          icon: 'bookmark-outline',
          link: '/category',
        }
      ]
    }
  ];
  profileItems = [
    {
      title: 'Profil',
      link:'/profile'
    },
    {
      title: 'Se déconnecter',
      link:'/logout'
    }
  ];

  constructor(
    private authService: AuthService
  ) {
    this.fullName = this.authService.getFullName();
    this.initial = this.authService.getInitial();
  }

  ngOnInit(): void { }
}
