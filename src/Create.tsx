import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const FormSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-11 bg-white/50 rounded-md" />
    <div className="h-11 bg-white/50 rounded-md" />
    <div className="h-11 bg-white/50 rounded-md" />
    <div className="h-11 bg-blue-500/50 rounded-md mt-6" />
  </div>
);

const CreateUser: React.FC<Props> = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (user: Partial<User>) => {
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    };

    setUsers((prev) => [...prev, newUser]);
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center lg:justify-end bg-cover bg-center relative px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/c6/0e/3f/c60e3fbf89275ca031d5774e5e1a057d.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Card */}
      <div
        className="
          relative z-10 w-full max-w-sm sm:max-w-md
          rounded-2xl border border-white/30
          bg-white/20 backdrop-blur-xl shadow-2xl
          px-6 sm:px-8 py-6 sm:py-8
          lg:mr-8
          bg-gradient-to-r via-gray-600 to-blue-950
          animate-gradient
          transition-transform duration-300
          hover:scale-105 lg:hover:scale-105
        "
      >
        {/* Avatar */}
        <div className="flex justify-center mb-2">
          <img
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover"
            src="https://i.pinimg.com/1200x/c3/17/d9/c317d95baca41ceda6d44869b3769818.jpg"
            alt="avatar"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
          Create User
        </h1>

        {/* Form */}
        {loading ? (
          <FormSkeleton />
        ) : (
          <UserForm onSave={handleSave} editingUser={null} />
        )}

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full text-sm text-white/80 hover:text-white transition"
        >
          ← Back to Employees
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
