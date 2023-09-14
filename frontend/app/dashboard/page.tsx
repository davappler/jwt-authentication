"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { userAuthorize } from "../_authorisation/authorisation";
import ProtectedPage from "../_authorisation/protectedPage";

function Dashboard() {
  const [userName, setUserName] = useState<string>("");
  const [books, setBooks] = useState<Array<string>>();
  const [isBooksError, setIsBooksError] = useState<boolean>();

  // We are fetching username from backend with the help of the JWT token that is in localStorage.
  useEffect(() => {
    (async () => {
      const jsonResponse = await userAuthorize();
      setUserName(jsonResponse.username);
    })();
  }, []);

  function getBooksList() {
    const jwtToken = localStorage.getItem("jwt");
    fetch("http://localhost:5001/books", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setBooks(jsonResponse.books);
      });
  }
  return (
    <ProtectedPage>
      <div className="mt-20 flex flex-col justify-center items-center">
        <h2 className="mt-20 text-xl">
          Welcome <span className="text-indigo-600">{userName}</span>
        </h2>
        <h3 className="p-10">
          This button will send a request to backend with a JWT token, if JWT
          token is valid it will fetch a list of books, otherwise it will
          display access denied.
        </h3>
        <Button onClick={getBooksList}>Get a list of Books to read</Button>
        <ul className="mt-4">
          {books?.map((book, index) => <li key={index}>{book}</li>)}
        </ul>
        <div>
          {isBooksError && (
            <span className="text-red-500">Access denied!!</span>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}

export default Dashboard;
