import { Component, OnInit } from '@angular/core';
import { Menu } from './models/menu.model';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appMenus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.findAll().subscribe(result => {
      this.appMenus = result;
    });
  }
}
