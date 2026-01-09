import type { Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import enGBMessages from '../messages/en-GB.json'
import React from 'react'
import '../src/app/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const withProviders = (Story: any, context: any) => (
  <NextIntlClientProvider locale="en-GB" messages={enGBMessages}>
    <QueryClientProvider client={queryClient}>
      <Story {...context} />
    </QueryClientProvider>
  </NextIntlClientProvider>
)

const queryClient = new QueryClient()

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
