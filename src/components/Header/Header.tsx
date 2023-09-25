import { useContext } from "react";
import { HamburgerIcon } from "../icons/HamburgerIcon/HamburgerIcon";
import NavItem from "../NavItem/NavItem";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../contexts/AppContext";
import { IHeaderProps, INavItemProps } from "../../types/interfaces";


const Header = (props: IHeaderProps) => {
  const { navItems } = props;

  const { isNavVisible, setIsNavVisible, headerText } = useContext(AppContext);

  const toggleNav = () => {
    setIsNavVisible((prevValue: boolean) => {
      document.body.style.overflow = prevValue ? 'unset' : 'hidden';
      return !prevValue;
    });
  }

  const headerLogoText = `Hacker News | ${headerText}`;

  const navItemClasses = ['nav-items'];
  if (isNavVisible) navItemClasses.push('visible');

  return (
    <header>
      <nav>
        <div className="logo__container">
          <div className="logo" data-testid="logo">Y</div>
          <div className="logo__text">{headerLogoText}</div>
        </div>
        <div className="hamburger__wrapper" data-testid="hamburger-menu" onClick={toggleNav}>
          <HamburgerIcon />
        </div>
        {
          <div className={navItemClasses.join(' ')}>
            {
              navItems.map((navItemData: INavItemProps) => <NavItem key={uuidv4()} {...navItemData} />)
            }
          </div>
        }
      </nav>
    </header>
  )
}

export default Header;