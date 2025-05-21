// utils/addTransaction.js or api/addTransaction.js

export const addTransaction = async (transactionData) => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // ensure you're storing token after login
        },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add transaction");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Add transaction error:", error);
      throw error;
    }
  };
  