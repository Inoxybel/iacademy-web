// theme.js
 const styles ={
  colors: {
    transparent: "transparent",
    background: "#1A1922",
    botao: "#0880A2",
    input: "#0880A2",
    fontColor: "#FCFCFC",
    fontColorLink: "#D9D9D9"
  },

  header: {
    as: "h1",
    fontSize: 48,
    my: "15"
  },

  //formularios em login, cadastro e perfil
  formFather: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: "100%",
    backgroundColor: "#1a1922",
    justifyContent: "center",
    alignItems: "center",
    py: 8

  },
  formControl:{
    w: "15rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    mb: "2"
  },
  formLabel: {
    alignSelf: "flex-start",
    position: "relative",
    left: "2",
    fontSize: 14
  },
  input:{
    h: "6",
    fontSize: 14,
    color: "gray",
    _placeholder: { fontSize: 12 }
  },
  formCadastro: {
    p: 5,
    borderWidth: 1,
    borderRadius: "md",
    w: "22rem",
    minH: "28rem",
    color: "white",
    display: "flex",
    flexDirection: "column",
    bg: "#2F3142",
    justifyContent: "center",
    alignItems: "center",
  },
  formLogin:{
        p:9,
        borderWidth:1,
        borderRadius:"md",
        boxShadow:"lg",
        w:"20rem",
        minh:"20rem",
        rowGap:"1.2rem",
        color:"white",
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignSelf:"center",
        bg:"#2F3142",
        mt: 5, mb: 6
  },

  formError: {
    color: "brown",
    position: "relative",
    alignSelf: "flex-start",
  },

  //feedback

  flexFather:{
    alignItems:'center',
    flexDirection:'column',
    width: '100%'
  },
  flexFeedback:{
    w:"85%",
    flexDir:'column',
  },

  cabecalhoFeedback:{
    h:"3rem",
    bg:"#262734",
    flexDir:"row",
    w:"100%",
    alignItems:"center",
    justifyContent:'flex-start'
  },
  
  buttonEnviar: {
    h: "2rem",
    w:"10rem",
    mt: 4,
    bg: "#0880A2",
    color: "white",
    _hover: { color: "black", backgroundColor: "white"}
  },
  buttonExperimentar: {
    w: ["24vw", "15vw", "11vw", "10vw", "10vw", "10vw"] ,
    h: ["4vw", "2.8vw", "2.2vw", "2vw", "2vw", "2vw"], 
    top:["0px", "0px", "0px", "0px", "0", "0"], 
    left:["30%", "70%", "70%", "70%", "150%", "120%"] ,
    fontSize:["1vw", "0.9vw", "1vw", "0.9vw", "0.9vw", "0.9vw"] ,
    p:["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"],
     px:["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"] ,
     borderRadius:["1.2vw", "0.8vw", "0.4vw"] ,
     borderWidth:1 ,
     backgroundColor:"blue.300" ,
     color:"white",
     _hover:{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" } 
  },
  typeEffectFrase: {
    w:[200,250,300,400,700,700],
    fontSize:["10px", "10px", "15px", "18px", "20px", "20px"],
    position:"relative", 
    maxW:["90%", "90%","90%","90%","90%", "90%"],
    top:0, 
    left:["5%","6%","8%","8%","8%","8%"],
    color:"gray.700",
    textShadow11:"2px 2px 2px white"
  }
}
 
export const previousButton = {
  cursor: "pointer",
  width: 15,
  height: 15,
}
export const botaoVoltarCadastro = {
    ...previousButton,
    alignSelf: "flex-start",
    margin: 10,
    position: "relative"
  }
  export const botaoVoltarFeedback = {
    ...previousButton,
    alignSelf: "flex-start",
    margin: 35,
    position: "absolute"
  }


  export default styles