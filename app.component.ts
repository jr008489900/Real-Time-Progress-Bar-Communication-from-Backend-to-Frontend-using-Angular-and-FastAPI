import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  progress = 0;

  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect('ws://127.0.0.1:8000/test/ws').subscribe(
      message => {
        const data = JSON.parse(message.data);
        console.log('Received message:', data);
        this.progress = data
        
        // Check if closebit is 1 and close the connection
        if (data.closebit === 1) {
          this.websocketService.sendMessage("close= True");
        }
      },
      error => {
        console.log('Error:', error);
      },
      () => {
        console.log('Connection closed');
      }
    );
  }
}
