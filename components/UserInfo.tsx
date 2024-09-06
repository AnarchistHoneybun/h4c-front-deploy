import Image from "next/image";
import { UserMetadata } from "@supabase/supabase-js";

interface UserInfoProps {
    user: UserMetadata;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <div className="flex items-center space-x-8 mb-8">
            <div className="flex-shrink-0">
                <div className="rounded-full overflow-hidden" style={{ width: '150px', height: '150px' }}>
                    <Image
                        src={user.avatar_url}
                        alt="User profile picture"
                        width={150}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-xl font-semibold">Name: {user.user_name}</p>
                <p className="text-lg">Email: {user.email}</p>
            </div>
        </div>
    );
};

export default UserInfo;