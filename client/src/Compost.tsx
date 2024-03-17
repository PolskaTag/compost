import React, { useState } from "react";
import compostLogo from "./resources/compostLogo.svg";
import { Field, Form, Formik, FormikProps } from "formik";
import "./Compost.css";

/**
 * Compost
 * @param param0
 * @returns
 */
const Compost = ({}) => {
  const [search, setSearch] = useState<string>("search");
  const updateSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <div className="compost">
      <header className="compost-header">
        <img src={compostLogo} className="compost-logo" alt="logo" />
      </header>
      <div className="compost-main">
        <h2 className="search-directive">
          Search any compostable item to find information.
        </h2>
        <div className="compost-search-container">
          <div className="compost-search">
            <div className="compost-search-input-container">
              <input
                type="text"
                defaultValue="apples"
                onChange={(e: any) => {
                  e.preventDefault();
                  updateSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>
      <footer className="compost-footer">
        {/* <div className='linear-gradient-to-footer'/> */}
        <div className="footer-content">
          <p>
            Owned and maintained by: <b>Philip Lapinski</b>
          </p>
          <p>Business email: PhilipLapinski.PL@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Compost;
