import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { SearchPage } from '@/pages/SearchPage'
import { DirectoryPage } from '@/pages/DirectoryPage'
import { NetworkPage } from '@/pages/NetworkPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { MessagesPage } from '@/pages/MessagesPage'
import { ActivityPage } from '@/pages/ActivityPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { CommunityPage } from '@/pages/CommunityPage'
import { AIAssistPage } from '@/pages/AIAssistPage'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Section 2 Primary Navigation Architecture */}
          <Route index element={<HomePage />} />
          <Route path="discover" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="directory" element={<DirectoryPage />} />
          <Route path="network" element={<NetworkPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="profile/ai-assist" element={<AIAssistPage />} />
          <Route path="*" element={<Navigate to="/discover" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
