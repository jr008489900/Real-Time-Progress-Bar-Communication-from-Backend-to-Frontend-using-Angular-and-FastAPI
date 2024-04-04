# Real-Time-Progress-Bar-Communication-from-Backend-to-Frontend-using-Angular-and-FastAPI
"使用Angular和FastAPI實現從後端到前端的實時進度條通訊"
Real-Time Progress Bar Communication from Backend to Frontend using Angular and FastAPI
簡介
這個項目展示了如何使用 Angular 和 FastAPI 來實現從後端到前端的實時進度條通信。當後端進行某些操作並更新進度時，前端將即時接收並更新進度條。

技術架構
後端 (FastAPI)
使用 FastAPI 框架建立 WebSocket 連接。
後端在某些事件（例如進度更新）時向前端發送進度信息。
代碼範例：
python code
```
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import asyncio
import json

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    for i in range(1, 101):
        await websocket.send_text(json.dumps({'progress': i}))
        await asyncio.sleep(0.5)
```
前端 (Angular)
使用 Angular 框架初始化 WebSocket 連接。
前端接收到後端發送的進度信息後，更新進度條的顯示。
代碼範例：
typescript code
```
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  progress = 0;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect('ws://127.0.0.1:8000/ws').subscribe(
      message => {
        const data = JSON.parse(message.data);
        this.progress = data.progress;
      },
      error => {
        console.error('Error:', error);
      },
      () => {
        console.log('Connection closed');
      }
    );
  }
}
```

使用步驟
克隆此項目到您的本地機器。
進入到 backend 目錄，運行 uvicorn main:app --reload 啟動後端服務。
進入到 frontend 目錄，運行 npm install 安裝依賴，然後運行 ng serve 啟動前端應用。
打開瀏覽器並訪問 http://localhost:4200 查看效果。
注意事項
請確保您已經安裝了 Python、Node.js 和 Angular CLI。
確保後端和前端的 WebSocket 連接地址是正確的。
