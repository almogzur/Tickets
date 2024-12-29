"use client"
import { ReactNode } from "react"

export default function CPSLayout({ children }: {children:ReactNode}) {
    return (
        <>
        {children}
          
        </>
    )
}

export const dynamic = "force-dynamic"
