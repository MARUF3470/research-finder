"use client"

import { Home, Settings, Users, FileText, BarChart, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContentAreaProps {
  activeItem: string
}

export function ContentArea({ activeItem }: ContentAreaProps) {
  const content: Record<string, { title: string; description: string; icon: React.ElementType }> = {
    home: {
      title: "Welcome Home",
      description: "This is your home dashboard. Get started by exploring the navigation menu.",
      icon: Home,
    },
    dashboard: {
      title: "Dashboard",
      description: "View your analytics, metrics, and performance data here.",
      icon: BarChart,
    },
    users: {
      title: "Users",
      description: "Manage your team members, permissions, and user accounts.",
      icon: Users,
    },
    documents: {
      title: "Documents",
      description: "Access and manage all your documents and files in one place.",
      icon: FileText,
    },
    messages: {
      title: "Messages",
      description: "View and respond to messages from your team and clients.",
      icon: Mail,
    },
    settings: {
      title: "Settings",
      description: "Configure your application preferences and account settings.",
      icon: Settings,
    },
  }

  const currentContent = content[activeItem] || content.home
  const Icon = currentContent.icon

  return (
    <main className="flex-1 p-6">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{currentContent.title}</CardTitle>
              <CardDescription>{currentContent.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You are currently viewing the <strong>{currentContent.title}</strong> section. 
            Click the menu button in the navbar to navigate to other sections.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
