

 const modifyContext = async (context, setContext, file, data) => {
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

export {
  modifyContext
};
