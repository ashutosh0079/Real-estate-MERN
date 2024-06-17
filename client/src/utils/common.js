// Utility functions

export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

// Slider settings
export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

// Update favourites
export const updateFavourites = (id, favourites = []) => {
  if (Array.isArray(favourites) && favourites.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    return [...favourites, id];
  }
};

// Check favourites
export const checkFavourites = (id, favourites = []) => {
  return Array.isArray(favourites) && favourites?.includes(id) ? "#FF0000" : "white";
};

// Validate string
export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};
