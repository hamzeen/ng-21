import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ApiUser {
  fullName: string;
  avatar: string;
}

interface RandomUserResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    picture: {
      large: string;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class UserAvatarService {
  private readonly http = inject(HttpClient);

  getUsers(count: number) {
    return this.http
      .get<RandomUserResponse>(`https://randomuser.me/api/?results=${count}&seed=invoices`)
      .pipe(
        map((response) =>
          response.results.map((user) => ({
            fullName: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.large,
          })),
        ),
      );
  }
}
