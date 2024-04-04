from fastapi import APIRouter, WebSocket
import asyncio
import json
# 創建一個新的 Router
router = APIRouter()

# 在 Router 上添加一個路由
@router.get("/")
async def hello_world():
    return {"message": "Hello, World!"}

@router.get("/hello")
async def greet_name(name: str):
    return {"message": f"Hello, {name}!"}

# WebSocket 路由
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    closebit=0
    for i in range(1, 101):
        
        if i == 100:
            closebit=1
        await websocket.send_text(json.dumps({'data': i, 'closebit': closebit}))
        await asyncio.sleep(0.5)