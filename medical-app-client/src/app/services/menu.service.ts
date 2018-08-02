import { Injectable } from '@angular/core';
import { HOST } from '../shared/variables.constant';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private serverUrl = `${HOST}/menus`;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Menu[]>(this.serverUrl);
  }
}
