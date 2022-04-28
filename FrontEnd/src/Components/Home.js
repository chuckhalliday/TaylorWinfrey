import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = ({ setAuth }) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/dashboard/", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseData = await res.json();
        setName(parseData.first_name);
      } catch (err) {
        console.error(err.message);
      }
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        getProfile();
      }, []);
    

    const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
        <Fragment>
            <Router>
           <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <a id="title" href="sitemap.html">The Official Taylor Winfrey Payment Experience!!!!!!</a>
            </div>
            <div className="header-links">
                <a id="cart" href="cart.html">Cart</a>
                <button className="btn btn-success" onClick={e => logout(e)}>Logout</ button>
            </div>
        </header>
        <aside className="sidebar">
            <h3>The Goods</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="./singles">Singles</a>
                </li>
                <li>
                    <a href="./tour">Tickets</a>
                </li>
                <li>
                    <a href="./merch">Merch</a>
                </li>
            </ul>
        </aside>
        <main className="main">
        <div className="welcome"><h2>You belong to us now, {name}</h2></div>
            <div className="content">
                <ul className="products">
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/BetterCoffee.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href=""></a>
                                Better Coffee</div>
                            <div className="product-price">$405,701.99</div>
                            <div className="product-rating">5 Stars(105k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/Canada.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                EZ N THA BC</div>
                            <div className="product-price">$720,053.99</div>
                            <div className="product-rating">5 Stars(374k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/SexyForces.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Sexy Nato Forces</div>
                            <div className="product-price">₽100,000,000.00</div>
                            <div className="product-rating">5 Stars(214k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/Jack.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Chill Out Jack</div>
                            <div className="product-price">(Sorry, you can't afford it) 😔</div>
                            <div className="product-rating">5 Stars(756k reviews)</div>
                        </div>
                    </li>
            </ul>
            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
    </Router>
        </Fragment>
    );
};

export default Home;