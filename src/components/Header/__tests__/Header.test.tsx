import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { NAV_ITEMS } from '../../Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

const renderHeader = () => {
  render(<BrowserRouter><Header navItems={NAV_ITEMS} /></BrowserRouter>);
}

describe('Header', () => {
  it('should render 5 navigation links', () => {
    renderHeader();

    for (let navItem of NAV_ITEMS) {
      const elem = screen.getByRole('link', { name: navItem.text });
      expect(elem).toBeInTheDocument();
    }
  });

  it('should render the navbar logo', () => {
    renderHeader();
    const elem = screen.getByTestId('logo');
    expect(elem).toBeInTheDocument();
  });

  it('should render the logo text', () => {
    renderHeader();
    const elem = screen.getByText(/hacker news+/i);
    expect(elem).toBeInTheDocument();
  });

  it('should render the hamburger menu for mobile', () => {
    renderHeader();
    const elem = screen.getByTestId('hamburger-menu');
    expect(elem).toBeInTheDocument();
  });
});