// theme.js
export default {
  flexFather: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    color:'white'
  },
  flexFeedback: {
    w: '70%',
    flexDir: 'column',
  },

  cabecalhoFeedback: {
    h: '3rem',
    bg: 'var(--backgroud-form)',
    flexDir: 'row',
    w: '20rem',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonEnviar: {
    h: '2rem',
    minW: '30%',
    mt: '0.4rem',
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
