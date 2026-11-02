
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const OpportunityContext = createContext();

export function OpportunityProvider({ children }) {
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("savedOpportunities");
      const applicationData = localStorage.getItem("applications");

      if (savedData) {
        setSavedOpportunities(JSON.parse(savedData));
      }

      if (applicationData) {
        setApplications(JSON.parse(applicationData));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }

    setIsLoaded(true);
  }, []);

  // Save data whenever bookmarks or applications change
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "savedOpportunities",
      JSON.stringify(savedOpportunities)
    );

    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [savedOpportunities, applications, isLoaded]);

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

  // Remove an opportunity from the application tracker
  const removeApplication = (id) => {
    setApplications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <OpportunityContext.Provider
      value={{
        savedOpportunities,
        applications,
        toggleSave,
        updateApplication,
        removeApplication,
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
