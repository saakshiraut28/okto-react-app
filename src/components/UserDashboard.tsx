import { useOkto, getAccount, getPortfolio } from "@okto_web3/react-sdk";
import { useEffect, useState } from "react";

// Define interfaces for the types (you may need to adjust these based on actual types)
interface Account {
  caipId: string;
  networkName: string;
  address: string;
}

interface Portfolio {
  // Add portfolio properties here based on actual structure
  [key: string]: any;
}

export function UserDashboard() {
  const oktoClient = useOkto();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get user's accounts/wallets
        const userAccounts = await getAccount(oktoClient);
        setAccounts(userAccounts);

        // Get user's portfolio
        const userPortfolio = await getPortfolio(oktoClient);
        setPortfolio(userPortfolio);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [oktoClient]); // Add oktoClient to dependency array

  return (
    <div>
      <h2>Welcome {oktoClient?.userSWA}</h2>
      <h3>Your Accounts:</h3>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <div key={account.caipId}>
            <p>Network: {account.networkName}</p>
            <p>Address: {account.address}</p>
          </div>
        ))
      ) : (
        <p>No accounts found</p>
      )}

      <h3>Portfolio:</h3>
      {portfolio ? (
        <pre>{JSON.stringify(portfolio, null, 2)}</pre>
      ) : (
        <p>Loading portfolio data...</p>
      )}
    </div>
  );
}