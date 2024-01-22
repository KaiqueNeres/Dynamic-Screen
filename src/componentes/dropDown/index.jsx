import React, { useState } from "react";
import { AiOutlineTablet, AiOutlineMobile } from "react-icons/ai";
import "./styles.css";
import Separator from "../separator";

export default function Dropdown({ list, screenSize, icon }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [outherDropDown, setOutherDropDown] = useState(false);

  const handleClickNav = () => {
    setDropDownOpen(!dropDownOpen);
    setOutherDropDown(!outherDropDown);
    
  };

  const handleClickItem = (item) => {
    setDropDownOpen(false);

    screenSize(item);
  };

  const DropdownList = () => {
    if (dropDownOpen) {
      return (
        <div className="Dropdown">
          <ul>
            {list.map((item, index) => (
              <li  key={index} onClick={() => handleClickItem(item)}>
                <h1>{item.title}</h1>
                <p>
                  {item.largura} x {item.altura}{" "}
                </p>
                <Separator/>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
    
  };

  return (
    <div onClick={() => handleClickNav()}>
      <div className="container">
      <p style={{textAlign: 'center'}}>{icon == "tablet" ? "TABLET" : icon == "mobile" ? "MOBILE" : null}</p>
      {icon == "tablet" ? (
        <AiOutlineTablet title="TABLET" size={50} />
      ) : (
        <AiOutlineMobile title="MOBILE" size={50} />
      )}
      </div>

      {DropdownList()}
    </div>
  );
}
