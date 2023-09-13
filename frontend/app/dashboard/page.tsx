"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Dashboard() {
  const [tempMessage, setTempMessage] = useState<string>("");
  function sendToken() {
    const jwtToken = localStorage.getItem("jwt");
    console.log("AGyaaaaaa", jwtToken);

    const body = {
      jwtToken,
    };

    fetch("http://localhost:5001/testing-jwt", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((JsonResponse) => {
        console.log("I got jsonResponse from backend", JsonResponse);
        setTempMessage(JsonResponse.message);
      });
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Button onClick={sendToken}>Send Token Check</Button>
      <div>{tempMessage}</div>
    </div>
  );
}

export default Dashboard;
