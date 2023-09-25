import { render, screen } from '@testing-library/react';
import Item from '../Item';
import { IItemProps } from '../../../types/interfaces';

const HACKER_NEWS_URL = process.env.REACT_APP_HACKER_NEWS_URL;

const itemProps: IItemProps = {
  order: 1,
  by: 'test_user',
  descendants: 23,
  id: 123456789,
  score: 321,
  time: (+new Date()) / 1000 - 60 * 1,
  title: 'test item title',
  url: 'https://test-item-url.test'
}

describe('Item', () => {
  it('should render an article with order 1', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByTestId(`article_${itemProps.order}`)).toBeInTheDocument();
  });

  it('should render a link with the given title', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByText(new RegExp('test item title', 'g'))).toBeInTheDocument();
  });

  it('should show the item author', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByText(/by +/i)).toBeInTheDocument();
  });

  it('should show the elapsed time', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByTestId('ago')).toBeInTheDocument();
  });

  it('should show the number of comments', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
  });

  it('should render the hide button', () => {
    render(<Item {...itemProps} />);
    expect(screen.getByRole('button', { name: 'hide' })).toBeInTheDocument();
  });

  it('should render an external link with a specific href', () => {
    render(<Item {...itemProps} />);
    const href = `${HACKER_NEWS_URL}/item?id=${itemProps.id}`;
    expect(screen.getByRole('link', { name: /ago/i })).toHaveAttribute('href', href);
  });

  /**
   * TODO:
   * - test upvote
   * - test external links with the right url
   * - test if order is visible
   * - etc.
   */
});