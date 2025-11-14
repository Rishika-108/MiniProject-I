import { NextResponse } from "next/server"
import si from "systeminformation"

export async function GET() {
  const cpu = await si.currentLoad()
  const mem = await si.mem()
  const disk = await si.fsSize()
  const battery = await si.battery()
  const temp = await si.cpuTemperature()

  const data = {
    cpu: cpu.currentLoad.toFixed(1),
    memory: ((mem.active / mem.total) * 100).toFixed(1),
    storage: ((disk[0].used / disk[0].size) * 100).toFixed(1),
    temperature: temp.main || 0,
    battery: battery.percent || 0,
  }

  return NextResponse.json(data)
}
