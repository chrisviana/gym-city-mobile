import { useState, useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { TreinoContext } from "../../contexts/TrinoContext";
import { Button, ContentButton, ListExericio } from "./style";

export function Treino() {
  const { getExercicioTreinoById } = useContext(TreinoContext);
  const treino = JSON.parse(localStorage.getItem("treino"));
  const exercicios = treino[0].exercicios;
  console.log(exercicios)
  // Estado para controlar o selectTab selecionado
  const [selectedTab, setSelectedTab] = useState(null);

  // Objeto para armazenar os exercícios agrupados por selectTab
  const [exerciciosAgrupados, setExerciciosAgrupados] = useState({});

  useEffect(() => {
    // Função para agrupar os exercícios por selectTab
    const agruparExercicios = async () => {
      const exerciciosAgrupadosTemp = {};

      // Para cada exercício, obter o treino e agrupar pelo selectTab
      for (const id of exercicios) {
        const treino = await getExercicioTreinoById(id);
        console.log('treino: ', treino)
        const selectTab = treino.selectTab;
        if (!exerciciosAgrupadosTemp[selectTab]) {
          exerciciosAgrupadosTemp[selectTab] = [treino];
        } else {
          exerciciosAgrupadosTemp[selectTab].push(treino);
        }
      }

      setExerciciosAgrupados(exerciciosAgrupadosTemp);
    };

    agruparExercicios();
  }, []);

  // Função para lidar com o clique em um botão de selectTab
  const handleTabClick = (selectTab) => {
    setSelectedTab(selectTab);
  };

  return (
    <div>
      <Header aluno={treino[0].aluno} />

      {/* Renderizar os botões para cada selectTab */}
      <ContentButton>
        {Object.keys(exerciciosAgrupados).map((selectTab) => (
          <Button key={selectTab} onClick={() => handleTabClick(selectTab)}>
            {selectTab}
          </Button>
        ))}
      </ContentButton>

      {/* Renderizar os exercícios associados ao selectTab selecionado */}
      <ListExericio>
        {selectedTab && exerciciosAgrupados[selectedTab]?.map((treino) => (
          <div key={treino.id}>
            {/* Renderize os detalhes do exercício aqui */}
            <p>Nome: {treino.exercicio}</p>
            <p>Séries: {treino.series}</p>
            {/* Outras informações sobre o exercício */}
          </div>
        ))}
      </ListExericio>
    </div>
  );
}
