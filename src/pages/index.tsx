import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1>Welcome to QuickBite</h1>
        <p className="landing-par1">
          Thank you for choosing QuickBite have fun spreading joy with food!
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
