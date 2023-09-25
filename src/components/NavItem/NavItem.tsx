import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { INavItemProps } from "../../types/interfaces";
import { closeNav } from "../../lib/utils";


const NavItem = (props: INavItemProps) => {
  const {
    text,
    path,
  } = props;

  const { setIsNavVisible, setHeaderText } = useContext(AppContext);

  const onClick = () => {
    setHeaderText(text);
    closeNav(setIsNavVisible)
  }

  return (
    <NavLink onClick={onClick} to={path} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      {text}
    </NavLink>

  )
}

export default NavItem;