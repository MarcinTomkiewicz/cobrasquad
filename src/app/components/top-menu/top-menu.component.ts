import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { AuthService } from '../../services/authService';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css',
})
export class TopMenuComponent implements OnInit {
  currentPath: string = '';
  user: IUser | null | undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    const routeParams = of(this.route.snapshot.paramMap);
    const routeQueryParams = of(this.route.snapshot.queryParamMap);

    // forkJoin operator to get both URL parameters and query parameters
    forkJoin({
      params: routeParams,
      queryParams: routeQueryParams,
    }).subscribe((result: any) => {
      this.currentPath =
        result.params.get('id') + result.queryParams.get('category');
      // replace id and category with whatever parameters you want to retrieve
      console.log(result);;
    })
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
  
}
