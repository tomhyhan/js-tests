import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { withRouter, withContext } from '../../test/utils';
import { Route } from 'react-router-dom';
import Images from '../Images';
import { fakeImages } from '../../test/fakeData';
import '@testing-library/jest-dom';

// renders images
// showing loading
// showing error
// adding normal image
// adding blur image
// adding grayscale image

describe('Images', () => {
  const fakeImageService = {
    getImages: vi.fn(),
  };

  beforeEach(() => {
    fakeImageService.getImages.mockImplementation(() => fakeImages);
  });

  afterEach(() => {
    fakeImageService.getImages.mockReset();
  });

  it('renders all Images list', async () => {
    const { asFragment } = render(
      withContext(
        withRouter(<Route path='/' element={<Images />} />),
        fakeImageService
      )
    );

    expect(fakeImageService.getImages).toHaveBeenCalledOnce();

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeImages.length)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders loading state', async () => {
    const { debug } = render(
      withContext(
        withRouter(<Route path='/' element={<Images />} />),
        fakeImageService
      )
    );
    console.log('debug');
    console.log(debug());
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
});
