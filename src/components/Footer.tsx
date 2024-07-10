import Link from "next/link";

const Footer = () => {
  return (
    <div className="footerContent">
      <p className="footerP">
        Made by caffeinated Brandon Lambertus
        {/* <Link
          className="LinkedIn"
          href="https://www.linkedin.com/in/brandon-lambertus-13491823a"
          target="_blank"
        >
          <img
            className="linkedin-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
            alt="LinkIn"
          />
        </Link> */}
      </p>
      <div className="footerLink">
        {/* <span>Powered by</span>
        <a className="sponsor" href="https://coolify.io/ ">
          Coolify
        </a> */}
      </div>
    </div>
  );
};
export default Footer;
