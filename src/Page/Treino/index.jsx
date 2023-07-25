import { useState, useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { TreinoContext } from "../../contexts/TrinoContext";
import { Button, Card, ContentButton, ListExericio, Spinner } from "./style";

export function Treino() {
  const { getExercicioTreinoById } = useContext(TreinoContext);
  const treino = JSON.parse(localStorage.getItem("treino"));
  const exercicios = treino[0].exercicios;

  // Estado para controlar o selectTab selecionado
  const [selectedTab, setSelectedTab] = useState('treinoA');
  const [isLoading, setIsLoading] = useState(true);

  // Objeto para armazenar os exercícios agrupados por selectTab
  const [exerciciosAgrupados, setExerciciosAgrupados] = useState({});

  useEffect(() => {
    // Função para agrupar os exercícios por selectTab
    const agruparExercicios = async () => {
      const exerciciosAgrupadosTemp = {};

      // Para cada exercício, obter o treino e agrupar pelo selectTab
      for (const id of exercicios) {
        const treino = await getExercicioTreinoById(id);
        const selectTab = treino.selectTab;
        if (!exerciciosAgrupadosTemp[selectTab]) {
          exerciciosAgrupadosTemp[selectTab] = [treino];
        } else {
          exerciciosAgrupadosTemp[selectTab].push(treino);
        }
      }

      setExerciciosAgrupados(exerciciosAgrupadosTemp);
      setIsLoading(false);
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
      {isLoading ? ( // Mostrar "loading" enquanto isLoading for true
          <Spinner />
        ) : (
          <>
            <ContentButton>
              {Object.keys(exerciciosAgrupados).map((selectTab) => (
                <Button key={selectTab} onClick={() => handleTabClick(selectTab)}  selected={selectTab === selectedTab}>
                  {selectTab === 'treinoA' ? 'Treino A': ''}
                  {selectTab === 'treinoB' ? 'Treino B': ''}
                  {selectTab === 'treinoC' ? 'Treino C': ''}
                  {selectTab === 'treinoD' ? 'Treino D': ''}
                  {selectTab === 'treinoE' ? 'Treino E': ''}
                </Button>
              ))}
            </ContentButton>

            <ListExericio>
             
              <p style={{ color: "#C4C4CC"}}>Exercícios</p>
              
              {selectedTab && exerciciosAgrupados[selectedTab]?.map((treino) => (
                <Card key={treino.id}>
                  {/* Renderize os detalhes do exercício aqui */}
                  <span><strong>{treino.exercicio}</strong></span>
                  <div style={{display: "flex", gap: '0.5rem'}}>
                    <p> {treino.series} Séries</p> <p> {treino.reptemp} Repetições</p>
                  </div>
                  
                  <p> {treino.descanso}' de descanso</p>
                  {/* Outras informações sobre o exercício */}
                </Card>
              ))}
            </ListExericio>
          </>
        )}
    </div>
  );
}
