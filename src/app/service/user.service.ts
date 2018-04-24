import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JsonBean} from '../model/jsonbean';
import {User} from '../model/user';
import {Consts} from '../common/consts';
import {Router} from '@angular/router';

/**
 * 用户服务
 */
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  createUser(user: any): Observable<JsonBean> {
    const url = 'http://localhost:8080/api/register';
    return this.httpClient.post(url, user, Consts.JSON);
  }

  login(user: User): Observable<JsonBean> {
    return this.httpClient.post(Consts.URL + 'user/login', user, Consts.JSON);
  }
}
