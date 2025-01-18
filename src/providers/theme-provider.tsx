'use client';
import React from 'react';
import { ConfigProvider } from 'antd'

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={{
      token: {
        colorPrimary: '#31304D',
        borderRadius: 2,
      },
      components: {
        Button: {
          controlHeight: 35,
          boxShadow: 'none',
          colorPrimaryBgHover: '#31304D',
          colorPrimaryHover: '#31304D',
          controlOutline: 'none',
          colorBorder: '#31304D'
        }
      }
    }}>
      {children}
    </ConfigProvider>
}

export default ThemeProvider;
