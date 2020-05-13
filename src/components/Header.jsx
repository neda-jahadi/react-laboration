import React from 'react';
const Header = ({ setView, menu }) => (
    <header>
        <h1>Star Wars</h1>
        <nav className="nav">
            <button onClick={() => setView(menu.SHOW_DATA)}>
                People
            </button>
            
            <button onClick={() => setView(menu.PLANET)}>
             Planet
            </button>

            <button onClick={() => setView(menu.FORM)}>
             Form
            </button>

            <button onClick={() => setView(menu.SHOW_FAVORITES)}>
             The list of favorites
            </button>
        </nav>
    </header>
)

export default Header;