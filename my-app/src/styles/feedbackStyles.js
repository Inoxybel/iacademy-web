// theme.js
export default {
  flexFather: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  flexFeedback: {
    w: '85%',
    flexDir: 'column',
  },

  cabecalhoFeedback: {
    h: '3rem',
    bg: 'var(--backgroud-form)',
    flexDir: 'row',
    w: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonEnviar: {
    h: '2rem',
    minW: '30%',
    mt: 4,
    bg: 'var(--backgroud-button)',
    color: 'var(--primary-white)',
    _hover: {
      color: '--primary-black',
      backgroundColor: 'var(--primary-white)',
    },
  },
};

export const botaoVoltarFeedback = {
  cursor: 'pointer',
  width: 15,
  height: 15,
  alignSelf: 'flex-start',
  margin: 35,
  position: 'absolute',
};
