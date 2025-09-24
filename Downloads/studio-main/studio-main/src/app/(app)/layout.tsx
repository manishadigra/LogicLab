import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import { FilterProvider } from '@/contexts/filter-context';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FilterProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </FilterProvider>
  );
}
