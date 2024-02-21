import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const getCurrentRoute = () => {
  const route = navigationRef.current.getCurrentRoute();
  return route.name;
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const notificationOpenHandler = data => {};
