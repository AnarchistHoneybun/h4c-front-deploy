import Image from "next/image";
import { UserMetadata } from "@supabase/supabase-js";

interface UserInfoProps {
    user: UserMetadata;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>
            <div className="flex items-center mb-6">
                <div className="w-24 h-24 rounded-full mr-6 overflow-hidden">
                    <Image
                        src={user.avatar_url}
                        alt="User profile picture"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{user.user_name}</h2>
                    <p className="text-gray-600">{user.location || 'Not set yet'}</p>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">First Name</p>
                        <p>{user.first_name || 'Not set'}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Last Name</p>
                        <p>{user.last_name || 'Not Set'}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Phone Number</p>
                        <p>{user.phone_number || 'Not Set'}</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-600">
                    {user.bio || 'No bio available'}
                </p>
            </div>
        </div>
    );
};

export default UserInfo;