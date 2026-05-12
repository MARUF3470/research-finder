"use client"

import { Home, Settings, Users, FileText, BarChart, Mail } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "dashboard", label: "Dashboard", icon: BarChart },
  { id: "users", label: "Users", icon: Users },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
]

interface AppSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeItem: string
  onItemSelect: (id: string) => void
}

export function AppSidebar({
  open,
  onOpenChange,
  activeItem,
  onItemSelect,
}: AppSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link href='/research'>
              research
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { navItems }
