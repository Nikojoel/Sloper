const loginConstraints = {
  username: {
    length: {
      minimum: 3,
      message: 'must be atleast 3 characters',
    },
  },
  email: {
    email: {
      message: 'is not valid.',
    },
  },
  fullname: {
    presence: 'cannot be blank',
  },
  password: {
    length: {
      minimum: 5,
      message: 'must be atleast 5 characters',
    },
  },
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: 'not matching'
    },
  },
};

const uploadConstraints = {
  title: {
    length: {
      minimum: 5,
      message: "^Minimum 5 characters",
    }
  },
};

export {
  loginConstraints,
  uploadConstraints,
};
