"use client"

import { SetTattoo3DModal } from "./3d/3dTattooModal"
import { TattooDataInterface } from "./types/threejs.type"
import { useState } from "react"
import Link from "next/link"

export default function Page() {

   const [tattooData, setTatooData] = useState<TattooDataInterface | null>(null)

  return (
    <div className="min-h-screen bg-primary relative overflow-x-hidden">
    

      
        <SetTattoo3DModal key={"/tat9.jpg"} tattooData={null} setTatooData={setTatooData} img={"/tat9.jpg"} fixSize={null} />

        <Link href={"/canva/new"}>
         <button
            className={`
              flex items-center justify-between gap-3
              px-5 py-4 transition-all duration-300 text-left border
              ${
                tattooData
                  ? "bg-surface-alt border-border-gold text-text"
                  : "bg-surface border-border text-text-muted hover:border-border-gold hover:text-text"
              }
            `}
          >
              Canva Demo
          </button>
        </Link>
    </div>
  )
}