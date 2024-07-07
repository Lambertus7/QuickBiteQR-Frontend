import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1 className="landing-header">Welcome to QuickBite</h1>
        <p className="landing-par1">
          Thank you for choosing QuickBite. Have fun spreading joy with food!
        </p>
        <p className="landing-par2">Created by Brandon Lambertus</p>
        <strong>
          <p className="landing-par3">☕️</p>
        </strong>
      </div>
    </div>
  );
};

export default HomePage;
