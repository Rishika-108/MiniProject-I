# backend/routes/system.py
from fastapi import APIRouter, Depends, HTTPException
from utils.jwt_handler import get_current_user
import psutil, platform, os
from typing import Optional

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/osinfo")
async def os_info(user = Depends(get_current_user)):
    try:
        battery = psutil.sensors_battery()
        partitions = psutil.disk_partitions()
        disks = {p.mountpoint: psutil.disk_usage(p.mountpoint)._asdict() for p in partitions}
        mem = psutil.virtual_memory()._asdict()
        return {
            "platform": platform.system(),
            "platform_version": platform.version(),
            "architecture": platform.machine(),
            "cpu_count": psutil.cpu_count(),
            "memory": mem,
            "battery": battery._asdict() if battery else None,
            "disks": disks
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/files")
async def list_files(path: Optional[str] = None, user = Depends(get_current_user)):
    if not path:
        path = os.path.expanduser("~")
    if not os.path.exists(path):
        raise HTTPException(status_code=400, detail="Path does not exist")
    entries = []
    with os.scandir(path) as it:
        for entry in it:
            entries.append({
                "name": entry.name,
                "is_dir": entry.is_dir(),
                "size": entry.stat().st_size
            })
    return {"path": path, "entries": entries}
