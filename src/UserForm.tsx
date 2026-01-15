import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

interface UserFormProps {
  onSave: (user: Partial<User> & { id?: number }) => void;
  editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ onSave, editingUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: editingUser?.id, name, email, phone });

    if (!editingUser) {
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="
          w-full px-4 py-2.5 sm:py-3
          rounded-lg
          bg-white/30 text-gray-900
          placeholder-gray-700
          text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="
          w-full px-4 py-2.5 sm:py-3
          rounded-lg
          bg-white/30 text-gray-900
          placeholder-gray-700
          text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="
          w-full px-4 py-2.5 sm:py-3
          rounded-lg
          bg-white/30 text-gray-900
          placeholder-gray-700
          text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <button
        type="submit"
        className="
          w-full py-2.5 sm:py-3
          rounded-lg
          bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
          text-white font-semibold
          text-sm sm:text-base
          transition hover:opacity-90
        "
      >
        {editingUser ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserForm;
