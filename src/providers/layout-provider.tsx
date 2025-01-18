import React from 'react';
import Header from '@/providers/layout-components/header';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return <div>
    <Header />
    {children}
  </div>
}

