const debounce = (callback, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

/*Usage: const debouncedFunction = debounce(func); */
/*debouncedFunction()*/