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
            Join more than 1,600,000 happy users!<br /> UptimeRobot is one of the
            most popular<br /> website monitoring services in the world.
          </p>
        </div>
        
        <div className="col-span-2">
          <h2 className="text-lg md:text-xl font-semibold mt-2">
            Get insights about estac! <br />Once per month. No spam, ever!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t border-border pt-4">
            <div>
              <h3 className="font-semibold">Monitoring.</h3>
              <ul className="list-disc list-inside">
                <li>Website monitoring</li>
                <li>SSL monitoring</li>
                <li>Ping monitoring</li>
                <li>Port monitoring</li>
                <li>Cron job monitoring</li>
                <li>Keyword monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Monitoring.</h3>
              <ul className="list-disc list-inside">
                <li>Website monitoring</li>
                <li>SSL monitoring</li>
                <li>Ping monitoring</li>
                <li>Port monitoring</li>
                <li>Cron job monitoring</li>
                <li>Keyword monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Monitoring.</h3>
              <ul className="list-disc list-inside">
                <li>Website monitoring</li>
                <li>SSL monitoring</li>
                <li>Ping monitoring</li>
                <li>Port monitoring</li>
                <li>Cron job monitoring</li>
                <li>Keyword monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-4 text-left">
        <p>© Copyright 2022 - estac - All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer;
