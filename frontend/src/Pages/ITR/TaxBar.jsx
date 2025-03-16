import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function TaxBar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 p-3 shadow-md z-50 flex justify-center space-x-4">
      <Button variant="outline" onClick={() => navigate("/tax/info")}>
        What are Taxes?
      </Button>
      <Button variant="outline" onClick={() => navigate("/tax/types")}>
        Types of Tax
      </Button>
      <Button variant="outline" onClick={() => navigate("/tax/planning")}>
        Tax Planning
      </Button>
      <Button variant="outline" onClick={() => navigate("/tax/savetax")}>
        Save Tax
      </Button>
      <Button variant="outline" onClick={() => navigate("/tax/itrfiling")}>
        ITR Filing
      </Button>
      <Button variant="outline" onClick={() => navigate("/tax/notice")}>
        Income Tax
      </Button>
    </nav>
  );
}

export default TaxBar;
