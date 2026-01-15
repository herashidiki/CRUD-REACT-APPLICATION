import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateUser: React.FC<Props> = ({ users, setUsers }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const userToEdit = users.find((u) => u.id === Number(id));
    if (userToEdit) {
      setEditingUser(userToEdit);
    } else {
      alert("User not found!");
      navigate("/");
    }
    setLoading(false);
  }, [id, users, navigate]);

  const handleSave = (user: Partial<User> & { id?: number }) => {
    if (!user.id) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...user } : u))
    );

    navigate("/");
  };

  if (loading)
    return (
      <p className="text-white text-center mt-10 text-sm sm:text-base">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-90 px-4 sm:px-6">
      <div
        className="
          relative z-10 w-full max-w-sm sm:max-w-md
          rounded-2xl border border-white/30
          bg-white/20 backdrop-blur-xl shadow-2xl
          px-6 sm:px-8 py-8 sm:py-10
          transition-transform duration-300
          lg:hover:scale-105
        "
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
          Edit User
        </h1>

        {editingUser && (
          <UserForm onSave={handleSave} editingUser={editingUser} />
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full text-sm sm:text-base text-white/80 hover:text-white transition"
        >
          ← Back to Employees
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
