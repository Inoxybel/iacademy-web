import styled from "styled-components";

const SidebarStyledComponent = styled.div`

top: 0; /* Coloca a barra no topo da tela */
left: 0; /* Coloca a barra no lado esquerdo da tela */
width: ${({ isSidebarVisible }) => (isSidebarVisible ? '20rem' : '0')};
background-color: var(--background-menu);
position: fixed;
overflow-y:auto;
bottom: 0;
transition: width 0.3s ease-in-out;
overflow-x: hidden;
color:white;
heigth:'100%';



.container {
    flex:1;
    flex-direction:column;
    margin:1rem;
    heigth:'100%';
    widht:100%;
}

.menu {
    flex-direction:column;
    color:white;

}

.iconeMenu{
    height:30px;
    width:30px;
    cursor: pointer;
}



.menuDetalhesCurso{
     flex-direction:row;
     margin-top:30px;
     margin-bottom:20px;
     gap:15px;
     align-items:'flex-start'; 
}


.tema{
    font-weight:bold;
    align-self:flex-start;
}

.categorias{
    display:flex; 
    flex-direction:row;
    font-size:11px;
}

.conteudo{
    margin-top:20px;
    width:100%;
    flex-direction:column;

}

.cabecalhoConteudo{
    width:100%;
    margin-bottom:25px;
}


.botaoMenu{
     background:var(--background-form);
     height:20px;
     width:100%;
     display:flex;
     border:none;

}

.topicoAtualBotaoMenu{
    color:white;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items: center;
}

.listaMenu{
    border:0px;
    background:var(--background-form);
    width:100%; 
    margin-bottom:3rem;
}

.itemMenu{
        background-color:var(--background-form);
        font-size:1rem;
        font-size: 1rem;
        height:1.5rem;
        borde:0px;
}

.conteudoCorpo{
    flex-direction:column;
}


.inicioTopicosComIcone{
    display:flex; 
    flex-direction:row; 
    gap:10px;
    margin-bottom:0.5rem ;
    align-items:center;
}

.topicosExercicios{
    flex-direction:column;
}

.itemTopicosExercicios{
    flex-direction:column;
    margin-top:5px;
}

.itemSelecionavelTopicosExercicios{
    display:flex;
    align-items:center; 
    margin-top:10px; 
    margin-bottom:10px;
    cursor:pointer; 
    gap:10px;
}
`;


export default SidebarStyledComponent;