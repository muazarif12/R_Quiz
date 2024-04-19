import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    admin: false,
  });
  const [user, setUser] = useState({ loggedIn: false, token: "" });
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({});

  const handleForm = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const signupSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/auth/signUp",
        method: "post",
        data: data,
      });
      window.alert(res.data.msg);
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/auth/login",
        method: "post",
        data: data,
      });
      window.alert(res.data.msg);
      if (res.data.token) setUser({ loggedIn: true, token: res.data.token });
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  useEffect(() => {
    if (user.loggedIn && user.token !== "") getMybooks();
  }, [user]);

  const getMybooks = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5600/books/getMyBooks",
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(res.data.data);
    } catch (e) {
      console.error(e);
      window.alert("ERROR");
    }
  };

  const handleAddBookForm = (e) =>
    setBookForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addBook = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/books/addBook",
        method: "post",
        data: { ...bookForm, email: data.email },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.data.msg === "BOOK ADDED") getMybooks();
    } catch (e) {
      console.error(e);
      window.alert("ERROR");
    }
  };

  return (
    <div className="mera-dabba">
      {user.loggedIn ? (
        <div style={{ margin: 50, display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            {books.length > 0 ? (
              <div>
                <h1>Your books. Click to delete</h1>
                <ul>
                  {books.map((i) => (
                    <li
                      onClick={async () => {
                        try {
                          const res = await axios({
                            url: "http://localhost:5600/books/deleteByIsbn",
                            method: "post",
                            data: { isbn: i.isbn },
                            headers: { Authorization: `Bearer ${user.token}` },
                          });
                          if (res.data.msg) getMybooks();
                        } catch (e) {
                          console.error(e);
                          window.alert("ERROR");
                        }
                      }}
                    >
                      {i.name} - {i.isbn}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h1>NO BOOKS FOUND</h1>
            )}
          </div>
          <div>
            <form
              onSubmit={addBook}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Add Book</h1>
              <input
                type="text"
                name="isbn"
                value={data.isbn}
                onChange={handleAddBookForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleAddBookForm}
                style={{ margin: 5 }}
              />

              <input
                type="text"
                name="year"
                value={data.year}
                onChange={handleAddBookForm}
                style={{ margin: 5 }}
              />

              <input
                type="text"
                name="genere"
                value={data.genre}
                onChange={handleAddBookForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div style={{ margin: 50 }}>
            <form
              onSubmit={signupSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Signup</h1>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="name"
                data={data.name}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="role"
                value={data.role}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="checkbox"
                name="admin"
                value={data.admin}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            <form
              onSubmit={loginSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Login</h1>
              <input
                type="text"
                name="email"
                data={data.email}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="role"
                value={data.role}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
