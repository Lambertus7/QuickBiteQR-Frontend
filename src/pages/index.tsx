import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1 className="landing-header">Welcome to QuickBite</h1>
        <p className="landing-par">
          Thank you for choosing QuickBite! Created by Brandon Lambertus
        </p>
        <strong>
          <p className="landing-par3">☕️</p>
        </strong>
      </div>
    </div>
  );
};

export default HomePage;
