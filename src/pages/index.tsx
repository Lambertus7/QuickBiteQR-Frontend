import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1 className="landing-header">Welcome to QuickBite</h1>
        <p className="landing-par">
          Simplifying restaurant management for busy owners
        </p>
        <strong>
          <p className="landing-par3"></p>
        </strong>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

//Get rid of the navbar and the homepage itself willl have all of the links. Maybe even a button that says "Get Started" that takes the user to the registering page.
