import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; {new Date().getFullYear()} Mohammad Adnan Aditya Rachmadi. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
