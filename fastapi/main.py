from fastapi import FastAPI, APIRouter
from routers import progress
# 創建 FastAPI 應用程式實例
app = FastAPI()

# 將 Router 加入到 FastAPI 應用程式中
app.include_router(progress.router, prefix="/test")
