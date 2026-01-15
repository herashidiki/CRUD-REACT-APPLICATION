import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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

/* ================= Skeleton Components ================= */

const MobileSkeleton = () => (
  <div className="space-y-4 md:hidden">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="bg-white/60 rounded-xl p-4 shadow border border-white/30 animate-pulse"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-300 rounded" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-3 w-full bg-gray-300 rounded mb-2" />
        <div className="h-3 w-2/3 bg-gray-300 rounded" />
      </div>
    ))}
  </div>
);

const TableSkeleton = () => (
  <div className="hidden md:block animate-pulse">
    <table className="w-full">
      <tbody>
        {[...Array(6)].map((_, i) => (
          <tr key={i} className="border-b border-white/20">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div className="h-3 w-32 bg-gray-300 rounded" />
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="h-3 w-40 bg-gray-300 rounded" />
            </td>
            <td className="py-4 px-4">
              <div className="h-3 w-28 bg-gray-300 rounded" />
            </td>
            <td className="py-4 px-4">
              <div className="h-8 w-24 bg-gray-300 rounded mx-auto" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ================= UserList ================= */

const UserList: React.FC<Props> = ({ users, setUsers }) => {
  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [users.length, setUsers]);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const isLoading = users.length === 0;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex justify-center py-8 px-4"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/3e/35/86/3e3586cf8e6ead929a97c5e3690fedd0.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-6xl bg-white/55 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Employees
          </h1>

          <Link
            to="/create-user"
            className="
              px-4 py-2 rounded-xl text-white font-medium
              bg-gradient-to-r from-blue-500 via-blue-900 to-blue-500
              animate-gradient
              transition-transform duration-300
              hover:scale-105
            "
          >
            + Create User
          </Link>
        </div>

        {/* ================= Skeleton ================= */}
        {isLoading && (
          <>
            <MobileSkeleton />
            <TableSkeleton />
          </>
        )}

        {/* ================= MOBILE CARDS ================= */}
        {!isLoading && (
          <div className="space-y-4 md:hidden">
            {users.map((u) => (
              <div
                key={u.id}
                className="bg-white/60 rounded-xl p-4 shadow border border-white/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${u.id}`}
                    alt={u.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-xs text-green-600">● Online</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700">{u.email}</p>
                <p className="text-sm text-gray-700">{u.phone}</p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <Link
                    to={`/edit-user/${u.id}`}
                    className="px-3 py-1 text-white rounded-lg bg-gray-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="px-3 py-1 text-red-600 rounded-lg border border-red-600"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/user/${u.id}`}
                    className="px-3 py-1 text-white rounded-lg bg-blue-950"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= DESKTOP TABLE ================= */}
        {!isLoading && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-black">
              <thead className="border-b border-white text-gray-600">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?img=${u.id}`}
                        alt={u.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-green-500">● Online</p>
                      </div>
                    </td>

                    <td className="py-4 px-4">{u.email}</td>
                    <td className="py-4 px-4">{u.phone}</td>

                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/edit-user/${u.id}`}
                          className="px-3 py-1 text-white rounded-lg bg-gray-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(u.id)}
                          className="px-3 py-1 text-red-600 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>

                        <Link
                          to={`/user/${u.id}`}
                          className="px-3 py-1 text-white rounded-lg bg-blue-950"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
