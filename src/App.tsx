import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import CreateUser from "./Create";
import UpdateUser from "./Update";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<UserList users={users} setUsers={setUsers} />}
        />
<Route path="user/:id" element={<UserDetail users={users} />} />

        {/* Create User */}
        <Route
          path="/create-user"
          element={<CreateUser users={users} setUsers={setUsers} />}
        />

        {/* Update User */}
        <Route
          path="/edit-user/:id"
          element={<UpdateUser users={users} setUsers={setUsers} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
