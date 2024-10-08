"use client";
import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  FaChartLine,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaderboardEntry {
  username: string;
  points: number;
}

interface FriendLeaderboardResponse {
  user: {
    username: string;
    position: number;
    points: number;
    stats: {
      Beginner: number;
      Intermediate: number;
      Advanced: number;
    };
  };
  friends: LeaderboardEntry[];
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [globalLeaderboard, setGlobalLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [friendLeaderboard, setFriendLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const fetchGlobalLeaderboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/leaderboard/global?username=thatonebipanda@gmail.com");
        const data: { position: number; leaderboard: LeaderboardEntry[] } = await response.json();
        setPosition(data.position);
        setGlobalLeaderboard(data.leaderboard.slice(0, 10)); // Limit to 10 entries
      } catch (error) {
        console.error('Error fetching global leaderboard:', error);
      }
    };

    const fetchFriendLeaderboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/leaderboard/friends?username=thatonebipanda@gmail.com");
        const data: FriendLeaderboardResponse = await response.json();
        setFriendLeaderboard(data.friends.slice(0, 10)); // Limit to 10 entries
      } catch (error) {
        console.error('Error fetching friend leaderboard:', error);
      }
    };

    fetchGlobalLeaderboard();
    fetchFriendLeaderboard();
  }, []);

  return (
    <Card className="mt-8 px-4 py-6">
      <h1 className="text-3xl font-black text-center mb-6">
        WEEKLY LEADERBOARD   
        <FaChartLine className="inline-block ml-2 text-green-500" />
      </h1>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>
          <TabsContent value="friends">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-2 text-left">Rank</th>
                  <th className="px-2 py-2 text-left">Username</th>
                  <th className="px-2 py-2 text-right">XP</th>
                </tr>
              </thead>
              <tbody>
                {friendLeaderboard.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{entry.username}</td>
                    <td className="px-2 py-2 text-right">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="global">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-2 py-2 text-left">Rank</th>
                  <th className="px-2 py-2 text-left">Username</th>
                  <th className="px-2 py-2 text-right">XP</th>
                </tr>
              </thead>
              <tbody>
                {globalLeaderboard.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{entry.username}</td>
                    <td className="px-2 py-2 text-right">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;