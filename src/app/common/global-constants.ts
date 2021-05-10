import { HttpHeaders } from '@angular/common/http';

export class GlobalConstants {
    public static apiURL: string = "http://localhost:8080";

    public static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
}