'use client';
import React from 'react';
import Header from '@/providers/layout-components/header';
import Content from '@/providers/layout-components/content';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  )
}

