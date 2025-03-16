import React, { useState, useEffect } from "react";

const FinancialAdvisorDashboard = () => {
  // const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);

  // Get advisor UID from session storage
  const advisorUid = typeof window !== "undefined" ? sessionStorage.getItem("uid") : null;

  useEffect(() => {
    if (!advisorUid) {
      console.log("not logged in")
      // router.push("/login"); // Redirect to login if no UID is found
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/get_messages/${advisorUid}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        if (data.success) setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchConsultationRequests = async () => {
      try {
        const response = await fetch(`/api/get_consultations/${advisorUid}`);
        if (!response.ok) throw new Error("Failed to fetch consultations");
        const data = await response.json();
        if (data.success) setConsultationRequests(data.consultations);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchMessages();
    fetchConsultationRequests();
  }, [advisorUid  ]);

  const handleConsultationAction = async (requestId, action) => {
    try {
      const response = await fetch("/api/update_consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      if (!response.ok) throw new Error("Failed to update consultation request");
      const data = await response.json();
      if (data.success) {
        setConsultationRequests((prev) =>
          prev.map((req) => (req.id === requestId ? { ...req, status: action } : req))
        );
      }
    } catch (error) {
      console.error("Error updating consultation request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Advisor Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        {messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className="border-b pb-4">
                <p className="text-gray-700">{msg.message}</p>
                <p className="text-sm text-gray-500 mt-2">From: {msg.sender_uid} | {new Date(msg.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new messages.</p>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Consultation Requests</h2>
        {consultationRequests.length > 0 ? (
          <ul className="space-y-4">
            {consultationRequests.map((req) => (
              <li key={req.id} className="border-b pb-4">
                <p className="text-gray-700"><span className="font-semibold">{req.sender_uid}</span> requested a consultation.</p>
                <p className="text-sm text-gray-500 mt-2">Requested on: {new Date(req.timestamp).toLocaleString()}</p>
                <div className="flex space-x-4 mt-4">
                  <button onClick={() => handleConsultationAction(req.id, "accepted")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Accept</button>
                  <button onClick={() => handleConsultationAction(req.id, "rejected")} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new consultation requests.</p>
        )}
      </div>
    </div>
  );
};

export default FinancialAdvisorDashboard;
