// takes in a context, context entry wanted to modify, data for the entry to modify and sets the context with
// updated data in a timestamp order
const modifyContext = (context, setContext, file, data) => {
  const modifyData = file => ({
    ...file,
    ...data
  });
  const newData = [...context.filter(i => i !== file), modifyData(file)].sort(
    (a, b) => {
      return new Date(b.time_added) - new Date(a.time_added);
    }
  );
  setContext(newData);
};

// Exports
export {
  modifyContext
};

/* END OF FILE */
