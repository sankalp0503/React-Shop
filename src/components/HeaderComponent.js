import React from 'react';

const HeaderComponent  = () => {
    
        return (
            <div>
               <header>
                   <nav className="navBar navBar-expand-md navbar-black bg-white" >
                   <div>
                    <a href="http://localhost:3000/" className="navBar-brand">
                    E-Commerce App
                    </a>
                    </div>
                  </nav>
                </header> 
            </div>
        );
    
}

export default HeaderComponent;