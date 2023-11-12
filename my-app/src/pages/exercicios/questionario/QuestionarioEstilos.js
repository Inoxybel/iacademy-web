const estilos = {
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    color: 'var(--primary-white)',
  },
  cabecalho: {
    width: '100%',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'row',
    background: 'var(--background-form)',
    color:'white',
    height: '5rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconeConfirmado: {
    h: '1.5rem',
    w: '1.5rem',
    color: 'green',
  },
  iconeAviso: {
    h: '1.5rem',
    w: '1.5rem',
    color: 'yellow',
  },
  conjuntoBotoes: {
    gap: '1rem',
    flexDir: 'row',
    alignItems: 'center',
  },
  botaoFeedback: {
    colorScheme: 'blue',
    m: '0.5rem',
    size: 'xs',
  },

  conjuntoExercicios: {
    alignItems: 'center',
    w: '100%',
    padding: '1%',
    h: '100%',
  },

  texto: {
    color: 'var(--primary-fontColor)',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: '89%',
    fontFamily: '',
    fontSize: '12px',
  },
  conteudo: {
    width: '100%',
    padding: '20px',
    height: '100%',
  },
  textoConteudo: {
    fontSize: '10px',
  },
  cabecalhoSumario: {
    width: '60%',
    padding: '10px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cabecalhoSumario1: {
    width: '100%',
    padding: '10px',
    borderRadius: '3px',
    display: 'flex',
    flexDirection: 'row',
  },
  sumario: {
    width: '60%',
    padding: '20px',
    height: '34rem',
  },
};

export default estilos;
