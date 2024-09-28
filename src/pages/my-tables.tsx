import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const MyTablesPage = () => {
  // This needs an interface
  const [tables, setTables] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      router.push("/login");
    }

    const getMyTables = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables`, {
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      });
      const data = await res.json();
      setTables(data);
    };
    getMyTables();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Welcome to your Dashboard</h1>
      <div className="tables-view">
        {tables.map((table) => {
          return (
            <div key={table.name} className="table-block">
              <p>{table.name}</p>

              <QRCode
                className="qr-code"
                size={150}
                value={`${process.env.NEXT_PUBLIC_FE_URL}/dine/${table.id}`}
                viewBox={`0 0 256 256`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default MyTablesPage;

//Next step for this app is to create an admin panel
//After that it will be changing the colors, making it more professional
