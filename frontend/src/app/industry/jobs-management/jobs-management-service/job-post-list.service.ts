import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobPostListService {
  constructor(private api: ApiService) {}

  getPostList() {
    let url = '/industry/industry-posts?status=&page=0';

    return this.api.ApiCallWithLocalization('', url, 'get');
  }
}
