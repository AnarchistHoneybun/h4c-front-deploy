"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';
import Security from './Security';
import { UserMetadata } from "@supabase/supabase-js";

interface UserProfileLayoutProps {
  user: UserMetadata;
}

export default function UserProfileLayout({ user }: UserProfileLayoutProps) {
  const [activeTab, setActiveTab] = useState('My Profile');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'My Profile':
        return <UserInfo user={user} />;
      case 'Security':
        return <Security />;
      default:
        return <div>Component for {activeTab} not implemented yet.</div>;
    }
  };

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '1000px', height: '600px' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow p-6 overflow-y-auto">
        {renderActiveComponent()}
      </div>
    </div>
  );
}