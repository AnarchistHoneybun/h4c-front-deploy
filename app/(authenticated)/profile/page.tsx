"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import UserInfo from "@/components/UserInfo";
import ClientSkillsList from "@/components/ClientSkillsList";
import ClientExperienceList from "@/components/ClientExperienceList";
import ClientLearningList from "@/components/ClientLearningList";
import ClientEducationList from "@/components/ClientEducationList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserMetadata } from "@supabase/supabase-js";

interface ProfileData {
  skills: string[];
  experience: string[];
  learning_style: string[];
  education: string[];
  rec_profiles: { user: string }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState('My Profile');

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && user.email) {
        setUser(user.user_metadata);
        
        try {
          const [skills, experience, learning_style, education, rec_profiles] = await Promise.all([
            fetch(`http://localhost:8000/get_skills?username=${encodeURIComponent(user.email)}`).then(res => res.json()),
            fetch(`http://localhost:8000/get_experience?username=${encodeURIComponent(user.email)}`).then(res => res.json()),
            fetch(`http://localhost:8000/get_learning_styles?username=${encodeURIComponent(user.email)}`).then(res => res.json()),
            fetch(`http://localhost:8000/get_education?username=${encodeURIComponent(user.email)}`).then(res => res.json()),
            fetch(`http://localhost:8000/linkedin/recommend?username=${encodeURIComponent(user.email)}`).then(res => res.json()),
          ]);


        setProfileData({ skills, experience, learning_style, education, rec_profiles });
      }
      catch (error) {
        console.error("Error fetching profile data:", error);
      }
    } else {
      console.error("User or user email not available");
    }
  };

    fetchData();
  }, []);

  const renderActiveComponent = () => {
    if (!user || !profileData) return <div>Loading...</div>;

    switch (activeTab) {
      case 'My Profile':
        return (
          <>
            <div className="my-8">
              <UserInfo user={user} />
              <div className="flex justify-center mt-4">
                <Dialog>
                  <DialogTrigger>
                    <div className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer">
                      Recommended LinkedIn Profiles
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Recommended LinkedIn Profiles</DialogHeader>
                    {profileData.rec_profiles.map((profile, index) => (
                      <div key={index} className="">{profile.user}</div>
                    ))}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Skills:</h2>
              <ClientSkillsList skills={profileData.skills} user={user} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Experience:</h2>
              <ClientExperienceList skills={profileData.experience} user={user} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Education:</h2>
              <ClientEducationList skills={profileData.education} user={user} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Learning style:</h2>
              <ClientLearningList skills={profileData.learning_style} user={user} />
            </div>
          </>
        );
      case 'Security':
        return <div>Security settings component (to be implemented)</div>;
      case 'My Journey':
        return <div>My Journey component (to be implemented)</div>;
      case 'Billing':
        return <div>Billing component (to be implemented)</div>;
      case 'Delete Account':
        return <div>Delete Account component (to be implemented)</div>;
      default:
        return <div>Component for {activeTab} not implemented yet.</div>;
    }
  };

  const Sidebar = () => {
    const tabs = ['My Profile', 'Security', 'My Journey', 'Billing', 'Delete Account'];

    return (
      <div className="w-48 flex flex-col" style={{ minWidth: '200px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-left py-4 px-6 ${
              activeTab === tab ? 'bg-green-100 text-green-800' : 'hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto my-8" style={{ width: '95%', height: '80vh' }}>
      <Sidebar />
      <div className="flex-grow p-6 overflow-y-auto">
        {renderActiveComponent()}
      </div>
    </div>
  );
}