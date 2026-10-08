import { Service } from '@angular/core';

import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// L'objet User que notre application manipulera
export interface User {
  name: string;
  firstName: string;
  email: string;
}

// Type interne pour notre fausse BDD, qui inclut le mot de passe
type StoredUser = User & { password: string };

@Service()
export class AuthApiService {
  // Notre "base de données" avec des utilisateurs en dur
  private mockUsers: StoredUser[] = [
    {
      name: 'Doe',
      firstName: 'Jane',
      email: 'jane.doe@test.com',
      password: 'password123',
    },
    {
      name: 'Smith',
      firstName: 'John',
      email: 'john.smith@test.com',
      password: 'password456',
    },
    {
      name: 'q',
      firstName: 'a',
      email: 'a@test.com',
      password: 'a',
    },
  ];

  login(email: string, password: string): Observable<{ user: User }> {
    return timer(500).pipe(
      // Simule une latence réseau
      switchMap(() => {
        const foundUser = this.mockUsers.find((u) => u.email === email);

        if (foundUser && foundUser.password === password) {
          const { password, ...publicUser } = foundUser;
          return of({ user: publicUser });
        }
        return throwError(() => new Error('Email ou mot de passe invalide.'));
      }),
    );
  }
}
