import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JsonBean} from '../model/jsonbean';
import {User} from '../model/user';
import {Consts} from '../common/consts';
import { environment } from '../../environments/environment';

/**
 * 用户服务
 */
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  findUserbyId(username: string) {
    const url = environment.baseUrl + '/api/user/' + username;
    return this.httpClient.get(url);
  }

  createUser(user: any): Observable<JsonBean> {
    const url = environment.baseUrl + '/api/user';
    return this.httpClient.post(url, user);
  }

  login(user: any): Observable<JsonBean> {
    const url = environment.baseUrl + '/api/login';
    return this.httpClient.post(Consts.URL + 'user/login', user, Consts.JSON);
  }

  getRecommendsByUser(username: string) {
    const url = environment.baseUrl + '/api/user/' + username + '/recommend';
    return this.httpClient.get(url);
  }

  saveImage(username: string, imageId: string) {
    const url = environment.baseUrl + '/api/user/' + username + '/image/' + imageId;
  }
}
