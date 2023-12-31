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
    mt: '1rem',
    p: 5,
    borderWidth: 1,
    borderRadius: 'md',
    w: '22rem',
    minH: '28rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    bg: 'var(--background-form)',
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
    bg: 'var(--background-form)',
    mt: 5,
    mb: 6,
  },

  formError: {
    color: 'brown',
    position: 'relative',
    alignSelf: 'flex-start',
  },

  buttonEnviar: {
    h: '2rem',
    w: '10rem',
    mt: 4,
    border:'1px',
    bg: 'var(--background-buttom)',
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
