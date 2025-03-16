import React, { useState, useEffect } from "react";

const ConsultAdvisor = () => {
  // State to store the list of advisors
  const [advisors, setAdvisors] = useState([]);

  // Fetch advisors from the backend
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch("/api/advisors");
        if (!response.ok) {
          throw new Error("Failed to fetch advisors");
        }
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setAdvisors(data.advisors);
        } else {
          console.error("Error fetching advisors:", data.message);
        }
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };

    fetchAdvisors();
  }, []);

  // Handle sending a message to an advisor
  const handleSendMessage = async (advisorId) => {
    try {
      const message = prompt("Enter your message:");
      if (!message) return;

      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        alert("User not logged in");
        return;
      }

      const response = await fetch("/api/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: advisorId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      if (data.success) {
        alert("Message sent successfully");
      } else {
        console.error("Error sending message:", data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle contacting an advisor
  const handleContact = async (advisorId) => {
    try {
      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        alert("User not logged in");
        return;
      }

      const response = await fetch("/api/request_consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: advisorId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to request consultation");
      }

      const data = await response.json();
      if (data.success) {
        alert("Consultation requested successfully");
      } else {
        console.error("Error requesting consultation:", data.message);
      }
    } catch (error) {
      console.error("Error requesting consultation:", error);
    }
  };

  // Handle setting an appointment with an advisor
  const handleSetAppointment = async (advisorId) => {
    try {
      const date = prompt("Enter appointment date (YYYY-MM-DD):");
      const time = prompt("Enter appointment time (HH:MM):");
      if (!date || !time) return;

      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        alert("User not logged in");
        return;
      }

      const response = await fetch("/api/set_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: advisorId,
          date: date,
          time: time,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to set appointment");
      }

      const data = await response.json();
      if (data.success) {
        alert("Appointment set successfully");
      } else {
        console.error("Error setting appointment:", data.message);
      }
    } catch (error) {
      console.error("Error setting appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Advisors</h1>

      {/* Advisors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <div key={advisor.uid} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{advisor.name}</h2>
            <p className="text-gray-600 mb-2">{advisor.specialization}</p>
            <p className="text-gray-500 text-sm mb-4">{advisor.bio}</p>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleSendMessage(advisor.uid)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
              <button
                onClick={() => handleContact(advisor.uid)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Contact
              </button>
              <button
                onClick={() => handleSetAppointment(advisor.uid)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Set Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultAdvisor;