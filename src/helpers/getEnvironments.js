export const getEnvironments = () => {
  // Load the environment variables
  const object = import.meta.env;

  //   Return them
  return {
    // ...import.meta.env,
    ...object,
  };
};
