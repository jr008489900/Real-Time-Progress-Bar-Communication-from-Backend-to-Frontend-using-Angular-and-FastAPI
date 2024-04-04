import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: WebSocket | null = null;
  private listener: Observer<MessageEvent> | null = null;

  public connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);

    return new Observable(observer => {
      this.listener = observer;
      this.socket!.onmessage = event => {
        const data = JSON.parse(event.data);
        this.listener!.next(data);

        // Check if the message contains "closebit=1" and close the connection if true
        if (data.closebit === 1) {
          this.socket!.close();
        }
      };

      this.socket!.onerror = event => this.listener!.error(event);
      this.socket!.onclose = event => this.listener!.complete();

      return () => this.socket!.close();
    });
  }

  public sendMessage(message: string): void {
    if (this.socket!.readyState === WebSocket.OPEN) {
      this.socket!.send(message);
    }
  }
}
