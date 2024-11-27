import React from 'react'
import NavbarComponent from '../../../components/admin/NavbarComponent';
import { SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar"
import { AppSidebar } from "../../../components/app-sidebar"

export default function RootLayout({ children }) {
  return (
      <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col w-full h-full">
            <NavbarComponent />
            <main className="flex-grow bg-gray-100 p-4">
              {children}
            </main>
          </div>
      </SidebarProvider>
  );
}

