import React from "react";
import {
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading,
    Image,
    VStack,
    Link,
    Divider,
    Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import csharp from '../../img/csharp_logo.png'
import { HiOutlineClipboardList } from "react-icons/hi";
import {HiOutlineClipboardCheck} from 'react-icons/hi'
const estilos = {
    containerMenuPendencia: {
        flexDir: 'column',
        bg:'#3C485A',
        p: '10px',
        minH: '100%',
        alignItems: 'center'
    },
    cabecalhoMenuPendencias:{
        flexDir:'column',
        h:'8rem',
        bg:'#3C485A',
        gap:'2rem',
        w:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    informacoesCabecalhoMenu:{
        display:'flex',
        flexDir:'row',
        gap:'3rem'
    },
    dadosCabecalhoMenu:{
        display:'flex',
        flexDir:'row',
        alignItems:'center',
        gap:'0.5rem'
    }
}

const objetoExerciciosPendentes =[
    {
      "id": "9c2261e7-f833-40c5-8d23-476b5d40e35d",
      "ownerId": "4a2054ab-33c2-4607-a6e3-e2b73596bdb4",
      "contentId": "f49bb43d-5731-4910-bada-e8debb9fcd05",
      "configurationId": "12345678-b8ec-420e-8924-d46e1c2c1c32",
      "status": "WaitingToDo",
      "type": "Pendency",
      "sendedAt": "0001-01-01T00:00:00Z",
      "topicIndex": "1.1",
      "title": "História do C#",
      "exercises": [
        {
          "identification": 1,
          "type": "MultipleChoice",
          "question": "Selecione as opções que estão corretas sobre C#",
          "complementation": [
            "a - É uma linguagem de programação case-sensitive",
            "b - Não permite o uso de bibliotecas externas",
            "c - Foi lançada oficialmente em 2000",
            "d - Não suporta programação orientada a objetos",
            "e - É uma linguagem fortemente tipada"
          ]
        },
        {
          "identification": 2,
          "type": "Code",
          "question": "Escreva um código em C# que imprima 'Hello, World!' na saída padrão.",
          "complementation": []
        }
      ]
    },
    {
      "id": "965c772c-49fe-4f8f-9840-bfdcee5eae99",
      "ownerId": "4a2054ab-33c2-4607-a6e3-e2b73596bdb4",
      "contentId": "280c7e1a-bbf2-4501-aea6-2c1038753e51",
      "configurationId": "12345678-b8ec-420e-8924-d46e1c2c1c32",
      "status": "WaitingToDo",
      "type": "Pendency",
      "sendedAt": "0001-01-01T00:00:00Z",
      "topicIndex": "1.3",
      "title": "Aplicações do C#",
      "exercises": [
        {
          "identification": 1,
          "type": "Code",
          "question": "Crie um script em C# que imprima 'Boa tarde, Mundo!' na tela.",
          "complementation": []
        },
        {
          "identification": 2,
          "type": "Code",
          "question": "Escreva um código em C# que imprima 'Boa noite, Mundo!' no console.",
          "complementation": []
        },
        {
          "identification": 3,
          "type": "SingleChoice",
          "question": "Qual o comando correto para imprimir uma string na tela em C#?",
          "complementation": [
            "a - Console.write()",
            "b - Console.writeline()",
            "c - Console.print()",
            "d - Print.Console()",
            "e - Console.display()"
          ]
        },
        {
          "identification": 4,
          "type": "SingleChoice",
          "question": "Em C#, qual é a sintaxe correta para imprimir 'Bom dia, Mundo!' no console?",
          "complementation": [
            "a - Console.writeline('Bom dia, Mundo!')",
            "b - Console.write('Bom dia, Mundo!')",
            "c - Console.print('Bom dia, Mundo!')",
            "d - Print('Bom dia, Mundo!')",
            "e - display('Bom dia, Mundo!')"
          ]
        },
        {
          "identification": 5,
          "type": "MultipleChoice",
          "question": "Selecione a(s) afirmação(ões) correta(s) sobre a instrução de saída em C#.",
          "complementation": [
            "a - A instrução 'Console.writeline()' imprime uma string e move o cursor para a próxima linha.",
            "b - Para imprimir uma string em C#, deve-se usar a instrução 'print()'.",
            "c - A instrução 'Console.write()' imprime uma string mas não move o cursor para a próxima linha.",
            "d - A instrução 'Console.display()' é usada para imprimir uma string em C#.",
            "e - A instrução 'Console.writeline()' imprime uma string mas não move o cursor para a próxima linha."
          ]
        }
      ]
    },
    {
      "id": "34653a90-53f7-4d74-894c-5e3e536fa114",
      "ownerId": "4a2054ab-33c2-4607-a6e3-e2b73596bdb4",
      "contentId": "70fef89a-d3ad-4603-b9d5-33ebbeb41ed3",
      "configurationId": "12345678-b8ec-420e-8924-d46e1c2c1c32",
      "status": "WaitingToDo",
      "type": "Pendency",
      "sendedAt": "0001-01-01T00:00:00Z",
      "topicIndex": "1.1",
      "title": "História do C#",
      "exercises": [
        {
          "identification": 1,
          "type": "SingleChoice",
          "question": "Quem é o designer principal da linguagem de programação C#?",
          "complementation": [
            "a - Steve Wozniak",
            "b - Ada Lovelace",
            "c - Anders Hejlsberg",
            "d - Mark Zuckerberg",
            "e - Elon Musk"
          ]
        },
        {
          "identification": 2,
          "type": "MultipleChoice",
          "question": "Quais das opções a seguir são verdadeiras sobre C#?",
          "complementation": [
            "a - Foi criada pela Apple",
            "b - É uma linguagem de script",
            "c - Faz parte da plataforma .Net",
            "d - A primeira versão foi lançada em 2002",
            "e - Não suporta programação orientada a objetos"
          ]
        },
        {
          "identification": 3,
          "type": "Code",
          "question": "Escreva um código em C# que imprima 'Bem-vindo ao mundo da programação!' na saída padrão.",
          "complementation": []
        }
      ]
    },
    {
      "id": "58f88835-57e0-4168-99dc-23d3e4efe212",
      "ownerId": "4a2054ab-33c2-4607-a6e3-e2b73596bdb4",
      "contentId": "fca91049-0955-4485-b660-c49e843fe799",
      "configurationId": "12345678-b8ec-420e-8924-d46e1c2c1c32",
      "status": "WaitingToDo",
      "type": "Pendency",
      "sendedAt": "0001-01-01T00:00:00Z",
      "topicIndex": "1.2",
      "title": "Por que aprender C#",
      "exercises": [
        {
          "identification": 1,
          "type": "SingleChoice",
          "question": "Em qual dos seguintes campos o C# NÃO é frequentemente usado?",
          "complementation": [
            "a - Desenvolvimento de jogos",
            "b - Desenvolvimento de sistemas corporativos",
            "c - Criação de websites",
            "d - Desenvolvimento de aplicações de desktop",
            "e - Edição de vídeos"
          ]
        },
        {
          "identification": 2,
          "type": "Code",
          "question": "Complete o código C# abaixo para exibir a mensagem 'Bem vindo ao C#' na console",
          "complementation": [
            "// Insira seu código aqui",
            "public class Program {",
            "public static void Main() {",
            "// Insira seu código aqui",
            "}",
            "}"
          ]
        },
        {
          "identification": 3,
          "type": "MultipleChoice",
          "question": "Selecione as afirmativas corretas sobre a linguagem de programação C#",
          "complementation": [
            "a - C# é uma linguagem compilada",
            "b - C# é a linguagem de programação predominante usada na plataforma .NET da Microsoft",
            "c - C# é uma linguagem difícil de aprender para programadores iniciantes",
            "d - C# tem baixa demanda no mercado de tecnologia",
            "e - C# possui uma sintaxe clara e concisa"
          ]
        }
      ]
    },
    {
      "id": "fb943ecd-7440-4b64-8139-f3dfe9a970ac",
      "ownerId": "4a2054ab-33c2-4607-a6e3-e2b73596bdb4",
      "contentId": "a2c10b77-f76d-46ea-b8d9-d9429356be3e",
      "configurationId": "12345678-b8ec-420e-8924-d46e1c2c1c32",
      "status": "WaitingToDo",
      "type": "Pendency",
      "sendedAt": "0001-01-01T00:00:00Z",
      "topicIndex": "2.3",
      "title": "C# Básico: Explorando o IDE do Visual Studio",
      "exercises": [
        {
          "identification": 1,
          "type": "Code",
          "question": "Escreva um programa simples em C# que imprima na tela a frase 'Estou gostando de aprender C#'.",
          "complementation": []
        },
        {
          "identification": 2,
          "type": "MultipleChoice",
          "question": "Assinale as opções corretas sobre o ambiente de trabalho do Visual Studio:",
          "complementation": [
            "a - O Explorador de Servidor exibe os servidores disponíveis e as bases de dados.",
            "b - A janela de erros exibe os erros de compilação.",
            "c - A área de código é onde o código do programa é escrito.",
            "d - A janela Propriedades permite ver e alterar as propriedades dos itens selecionados no código.",
            "e - O programa pode ser executado pressionando F9."
          ]
        }
      ]
    }
  ]


  function calcularTotalDeExerciciosPendentes(listaDeObjetos) {
    return listaDeObjetos
      .filter(objeto => objeto.status === "WaitingToDo")
      .reduce((total, objeto) => total + objeto.exercises.length, 0);
  }

  function calcularTotalFeedbacks(listaDeObjetos) {
    return listaDeObjetos.filter(objeto => objeto.status === "Finished").length;
  }
  


const ItemPendencia = ({obj,onSetExercicioPendente})=>{
    return(
        <>
         <Divider/>
         <Flex w='100%' alignItems='center' justifyContent='flex-start' gap='1rem'>
            {obj.status==='WaitingToDo'?<WarningIcon color='yellow'/>:<CheckCircleIcon color='green'/>}
            <Link onClick={()=>{onSetExercicioPendente(obj.id)}}>
                <p>{obj.topicIndex} - {obj.title}</p>
            </Link>
            <Box  display='flex' alignItems='center' gap='0.3rem' flexDir='row' ml='auto'>
                <Text color="#5762C0">{obj.exercises.length}</Text>
                <HiOutlineClipboardList  color="#5762C0"/>
            </Box>
        </Flex>
      
        </>
     
    )
}

const totalExerciciosPendentes = calcularTotalDeExerciciosPendentes(objetoExerciciosPendentes);
const totalExerciciosComFeedback = calcularTotalFeedbacks(objetoExerciciosPendentes)

const MenuPendencia = ({onSetExercicioPendente}) => {
    
    return (
        <Flex sx={estilos.containerMenuPendencia}>
            <Flex sx={estilos.cabecalhoMenuPendencias}>
                <Heading>Pendências</Heading>
                <Box sx={estilos.informacoesCabecalhoMenu}>
                    <Box sx={estilos.dadosCabecalhoMenu}>
                        <HiOutlineClipboardList color="5762C0"/>
                      <p>{totalExerciciosPendentes} pendências</p>
                    </Box>
                    <Box sx={estilos.dadosCabecalhoMenu}>
                        <HiOutlineClipboardCheck color="5762C0"/>
                         <p>{totalExerciciosComFeedback} correções</p>
                    </Box>
                   
                </Box>
            </Flex>
            <Accordion allowMultiple>
                <AccordionItem w='20rem'>      
                        <AccordionButton>
                            <Box w='100%' display='flex' flexDir='row' alignItems='center' justifyContent='space-around'>
                                <Image w='2rem' src={csharp}/>
                                <h1>Curso de c# básico</h1> 
                                <AccordionIcon />
                            </Box> 
                        </AccordionButton>
                    <AccordionPanel pb={1}>
                        <VStack>
                            {objetoExerciciosPendentes.map((obj)=>(
                              <ItemPendencia obj={obj} onSetExercicioPendente={onSetExercicioPendente}  />
                            ))}
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    )
}


export default MenuPendencia;