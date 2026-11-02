
"use client";

import { createContext, useContext, useState } from "react";

const OpportunityContext = createContext();

export function OpportunityProvider({ children }) {
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  // Add or remove an opportunity from bookmarks
  const toggleSave = (id) => {
    setSavedOpportunities((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Add or update application status
  const updateApplication = (id, status) => {
    setApplications((prev) => {
      const exists = prev.find((item) => item.id === id);

      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, status } : item
        );
      }

      return [...prev, { id, status }];
    });
  };

  return (
    <OpportunityContext.Provider
      value={{
        savedOpportunities,
        applications,
        toggleSave,
        updateApplication,
      }}
    >
      {children}
    </OpportunityContext.Provider>
  );
}

// Custom hook to access Opportunity Context
export function useOpportunities() {
  return useContext(OpportunityContext);
}
