import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { navigationNames } from "./CustomerPage";

const heightNavigation = {
  MIN: 0,
  MAX: 140,
};

const Header = ({ setView, children }) => {
  const [heigth, setHeigth] = useState(heightNavigation.MIN);

  const toggle = () => {
    if (heigth === 0) {
      setHeigth(heightNavigation.MAX);
    } else {
      setHeigth(heightNavigation.MIN);
    }
  };

  const handleChangeView = (view) => {
    setView(view);
    setHeigth(heightNavigation.MIN);
  };

  return (
    <>
      <header className="header-customer">
        <div className="header-customer__content contenedor">
          <FaBars style={{ color: "#ffffff" }} onClick={toggle} />
          <p>username</p>
        </div>
        <div style={{ height: `${heigth}px` }}>
          <ul className={heigth === 0 ? "header-navigation" : "header-navigation-visible"}>
            <li onClick={() => handleChangeView(navigationNames.HOME)}>Home</li>
            {/*     <li onClick={() => handleChangeView(navigationNames.RESERVAR)}>Reservar</li> */}
            <li onClick={() => handleChangeView(navigationNames.INFORMACION)}>Informacion</li>
            <li onClick={() => handleChangeView(navigationNames.SUGERENCIAS)}>Sugerencias</li>
          </ul>
        </div>
      </header>
      {children}
    </>
  );
};
export default Header;
