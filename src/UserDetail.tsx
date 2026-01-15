import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  users: User[];
};

const UserDetail: React.FC<Props> = ({ users }) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;
    const foundUser = users.find((u) => u.id === Number(id));
    setUser(foundUser || null);
  }, [id, users]);

  if (!user)
    return (
      <p className="text-center mt-10 text-white text-sm sm:text-base">
        User not found or loading...
      </p>
    );

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/3e/35/86/3e3586cf8e6ead929a97c5e3690fedd0.jpg')",
      }}
    >
      <div
        className="
          w-full max-w-sm sm:max-w-md
          bg-white/55 backdrop-blur-lg
          border border-white/30 shadow-lg
          rounded-xl
          px-6 sm:px-8 py-6 sm:py-8
          text-gray-600 font-bold
          bg-gradient-to-r from-blue-500 via-white to-blue-500
          animate-gradient
          transition-transform duration-300
          lg:hover:scale-105
        "
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-blue-950 object-cover"
            src="https://i.pravatar.cc/150?img=3"
            alt={user.name}
          />
        </div>

        {/* User Info */}
        <div className="text-center space-y-1 sm:space-y-2 text-blue-950">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {user.name}
          </h2>
          <p className="text-xs sm:text-sm opacity-90">
            {user.email}
          </p>
          <p className="text-xs sm:text-sm opacity-90">
            {user.phone}
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="
              px-4 py-2 rounded-xl
              text-gray-600 font-bold
              bg-gradient-to-r from-blue-500 via-white to-blue-500
              animate-gradient
              transition-transform duration-300
              hover:scale-105
            "
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
