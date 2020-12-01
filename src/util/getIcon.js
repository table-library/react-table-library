export const getIcon = (icon, iconFallback) => {
  if (icon === null) {
    return null;
  }

  if (icon === undefined) {
    return iconFallback;
  }

  return icon;
};
