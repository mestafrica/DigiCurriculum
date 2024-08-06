import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="p-4 md:p-20 bg-[#A7D7C5]">
        <div className="grid grid-cols-1 md:grid-cols-3 text-foreground p-6">
          <div className="col-span-1 mb-6 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold">Litmus Test</h1>
            <p className="text-lg mt-2">simplifying how we teach and study</p>
            <p className="mt-4 pr-0 md:pr-9">
            Join over 6 thousand satisfied users!
              <br /> LitmusTest stands out as the  trusted
              <br /> digital curriculum provider in the nation.
            </p>
          </div>

          <div className="col-span-2">
            <h2 className="text-lg md:text-xl font-semibold mt-2">
              Get insights about your curriculum! <br />
              Once per month. No spam, ever!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t border-border pt-4">
              <div>
                <h3 className="font-semibold">Get in Touch</h3>
                <ul className="list-disc list-inside">
                  <li>Contact</li>
                  <li>Facebook</li>
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Quicklinks</h3>
                <ul className="list-disc list-inside">
                  <li>About Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>FAQs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">More</h3>
                <ul className="list-disc list-inside">
                  <li>API</li>
                  <li>Features</li>
                  <li>GES</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-left">
          <p>© Copyright 2024 - LitmusTest - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
