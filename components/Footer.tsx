import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import ModeToggle from "./ModeToggle";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-foreground py-20 relative"
      style={{ background: "hsl(178, 74%, 9%)" }}
    >
      <div className="container mx-auto px-20 sm:px-6 lg:px-8 flex justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <div className="text-left">
            <div className="text-5xl font-black mb-4 text-green-500">
              SkillJourney
            </div>
            <div
              className="flex space-x-4 text-3xl"
              style={{ color: "hsl(125, 38%, 94%)" }}
            >
              <a href="#" className="hover:text-orange-600">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-orange-600">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-orange-600">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-600">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-orange-600">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3
              className="text-lg font-black mb-4"
              style={{ color: "hsl(125, 38%, 94%)" }}
            >
              FAQ's
            </h3>
            <ul className="space-y-2 text-background">
              <li>
                <a href="#" className="hover:underline">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Link 3
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="text-lg font-black mb-4"
              style={{ color: "hsl(125, 38%, 94%)" }}
            >
              More Info
            </h3>
            <ul className="space-y-2 text-background">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <ModeToggle />
      </div>
    </footer>
  );
};

export default Footer;
