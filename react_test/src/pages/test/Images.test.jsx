import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { withRouter, withContext } from '../../test/utils';
import { Route } from 'react-router-dom';
import Images from '../Images';
import { fakeBlurImage, fakeGrayscaleImage, fakeImage, fakeImages } from '../../test/fakeData';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Images', () => {
  const fakeImageService = {
    getImages: vi.fn(),
    getImage: vi.fn()
  };

  beforeEach(() => {
    fakeImageService.getImages.mockImplementation(() => fakeImages);
  });

  afterEach(() => {
    fakeImageService.getImages.mockReset();
    fakeImageService.getImage.mockReset();
  });

  it('renders all Images list', async () => {
    const {asFragment} = renderImage()

    expect(fakeImageService.getImages).toHaveBeenCalledOnce();
    expect(await screen.findAllByRole('listitem')).toHaveLength(fakeImages.length)

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders loading state',  async () => {
    renderImage()

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
    expect(await screen.findAllByRole('listitem')).toHaveLength(fakeImages.length)
  });

  it("renders error state when fakeimage thorws an error", async () => {
    fakeImageService.getImages.mockImplementation(() => {
        throw new Error()
    });

    renderImage()
    
    expect(await screen.findByText(/Something Went Wrong!/)).toBeInTheDocument()
  })

  it("return normal image when add button in clicked", async () => {
    fakeImageService.getImage.mockImplementation(() => fakeImage);

    renderImage()
    const btn = await screen.findByText("Add Image")
    await userEvent.click(btn)

    expect(await screen.findAllByRole('listitem')).toHaveLength(fakeImages.length + 1)
    const img = await screen.findByAltText(fakeImage.author)
    expect(img.src).toBe(fakeImage.download_url)
    
  })

  it("return blur image when add button in clicked", async () => {
    fakeImageService.getImage.mockImplementation(() => fakeBlurImage);

    renderImage()

    const select = await screen.findByRole("combobox")
    await userEvent.selectOptions(select, ["blur"])
    const btn = await screen.findByText("Add Image")
    expect(screen.getByRole('option', {name: 'blur'}).selected).toBe(true)

    await userEvent.click(btn)

    expect(await screen.findAllByRole('listitem')).toHaveLength(fakeImages.length + 1)
    const img = await screen.findByAltText(fakeImage.author)
    expect(img.src).toBe(fakeBlurImage.download_url)
    
  })

  it("return grayscale image when add button in clicked", async () => {
    fakeImageService.getImage.mockImplementation(() => fakeGrayscaleImage);

    renderImage()

    const select = await screen.findByRole("combobox")
    await userEvent.selectOptions(select, ["grayscale"])
    expect(screen.getByRole('option', {name: 'grayscale'}).selected).toBe(true)

    const btn = await screen.findByText("Add Image")
    await userEvent.click(btn)

    expect(await screen.findAllByRole('listitem')).toHaveLength(fakeImages.length + 1)
    const img = await screen.findByAltText(fakeImage.author)
    expect(img.src).toBe(fakeGrayscaleImage.download_url)
    
  })


  function renderImage() {
    return render(
        withContext(
          withRouter(<Route path='/' element={<Images />} />),
          fakeImageService
        )
    );
  }
  
});
