import React from 'react';

export default function Header(props) {
  return (
    <header className="mb-5">
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <div className="col px-0">
            <a href="/items" className="navbar-brand">
              <i>Unload</i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
