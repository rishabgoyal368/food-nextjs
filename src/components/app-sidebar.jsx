'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"  // Import usePathname from next/navigation

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Inbox,
  },
  {
    title: "Manage Categories",
    url: "/admin/category ",
    icon: Search,
  },
  {
    title: "Manage products",
    url: "/admin/product",
    icon: Calendar,
  },
  
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()  // Get the current pathname using usePathname

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-4">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-md ${
                        pathname === item.url
                          ? "bg-blue-500 text-white" // Active link styles
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
