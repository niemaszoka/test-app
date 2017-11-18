import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'yv-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {

  }

}
