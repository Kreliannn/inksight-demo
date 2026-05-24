"use client"

import { SetTattoo3DModal } from "./3d/3dTattooModal"
import { TattooDataInterface } from "./types/threejs.type"
import { useState } from "react"

export default function Page() {

   const [tattooData, setTatooData] = useState<TattooDataInterface | null>(null)

  return (
    <div className="min-h-screen bg-primary relative overflow-x-hidden">
    

        <SetTattoo3DModal key={"/tat9.jpg"} tattooData={null} setTatooData={setTatooData} img={"/tat9.jpg"} fixSize={null} />

    </div>
  )
}