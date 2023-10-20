// theme.js
export default {
  formFather: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100%',
    backgroundColor: 'var(--background-color)',
    justifyContent: 'center',
    alignItems: 'center',
    py: 8,
  },
  formControl: {
    w: '15rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '2',
  },

  formTitle: {
    as: 'h1',
    my: '15',
    color: 'var(--primary-white)',
  },

  formLink: {
    color: 'var(--tertiary-color)',
  },

  formLabel: {
    alignSelf: 'flex-start',
    position: 'relative',
    left: '2',
    fontSize: 14,
  },
  input: {
    h: '6',
    fontSize: 14,
    color: 'gray',
    _placeholder: { fontSize: 12 },
  },
  formCadastro: {
    p: 5,
    borderWidth: 1,
    borderRadius: 'md',
    w: '22rem',
    minH: '28rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    bg: 'var(--backgroud-form)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLogin: {
    p: 9,
    borderWidth: 1,
    borderRadius: 'md',
    boxShadow: 'lg',
    w: '20rem',
    minh: '20rem',
    rowGap: '1.2rem',
    color: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    bg: 'var(--backgroud-form)',
    mt: 5,
    mb: 6,
  },

  buttonEnviar: {
    h: '2rem',
    minW: '30%',
    mt: 4,
    bg: 'var(--backgroud-button)',
    color: 'var(--primary-white)',
    _hover: {
      color: 'var(--primary-black)',
      backgroundColor: 'var(--primary-white)',
    },
  },

  formError: {
    color: 'brown',
    position: 'relative',
    alignSelf: 'flex-start',
  },
};

export const botaoVoltarCadastro = {
  cursor: 'pointer',
  width: 15,
  height: 15,
  alignSelf: 'flex-start',
  margin: 10,
  position: 'relative',
};
