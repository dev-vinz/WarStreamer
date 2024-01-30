import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../authentication/auth.service';

export class DependencyHelper {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private static _authService: AuthService | null = null;
  private static _httpClient: HttpClient | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public static get authService(): AuthService {
    if (!DependencyHelper._authService) {
      throw new Error('AuthService not set. Call setAuthService method first.');
    } else {
      return DependencyHelper._authService;
    }
  }

  public static get httpClient(): HttpClient {
    if (!DependencyHelper._httpClient) {
      throw new Error('HttpClient not set. Call setHttpClient method first.');
    } else {
      return DependencyHelper._httpClient;
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public static set authService(authService: AuthService) {
    DependencyHelper._authService = authService;
  }

  public static set httpClient(httpClient: HttpClient) {
    DependencyHelper._httpClient = httpClient;
  }
}
