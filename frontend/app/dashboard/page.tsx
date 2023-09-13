"use client";
import { Button } from "@/components/ui/button";

function Dashboard() {
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
      });
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Button onClick={sendToken}>Send Token Check</Button>
    </div>
  );
}

export default Dashboard;
