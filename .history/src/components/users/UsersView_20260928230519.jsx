import { useState } from "react";
import Icon from "../common/Icons.jsx";

export default function UsersView({ users, onCreate, onStatus, onDelete }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const list = users.filter(
    (user) =>
      (!status || user.status === status) &&
      [user.name, user.company, user.email, user.position].some((text) =>
        text.toLowerCase().includes(search.toLowerCase()),
      ),
  );
  return (

    
    <>
    </>
  );
}
