import { useState, useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { TreinoContext } from "../../contexts/TrinoContext";
import { Button, Card, ContentButton, ListExericio, Spinner } from "./style";

export function Treino() {
  const { getExercicioTreinoById, buscaTreinoAtualizado } = useContext(TreinoContext);
  const [treino, setTreino] = useState()
  const [selectedTab, setSelectedTab] = useState('treinoA');
  const [isLoading, setIsLoading] = useState(false);
  const [exerciciosAgrupados, setExerciciosAgrupados] = useState({});

  useEffect(() => {
    const jsonTreino = JSON.parse(localStorage.getItem("treino"));
    if (jsonTreino.length > 0) {
      setTreino(jsonTreino[0])
    }
  },[])

  useEffect(() => {
    setIsLoading(true)
    if (treino !== null) {
      const agruparExercicios = async () => {
        const exerciciosAgrupadosTemp = {};
        // Check if isTreino[0].exercicios is valid before proceeding
        if (Array.isArray(treino?.exercicios)) {
          for (const id of treino?.exercicios) {
            const treino = await getExercicioTreinoById(id);
            const selectTab = treino?.selectTab;
            if (!exerciciosAgrupadosTemp[selectTab]) {
              exerciciosAgrupadosTemp[selectTab] = [treino];
            } else {
              exerciciosAgrupadosTemp[selectTab].push(treino);
            }
          }
        }

        setExerciciosAgrupados(exerciciosAgrupadosTemp);
        setIsLoading(false)
      };

      agruparExercicios();
    }
  }, [treino]);

  const atualizarTreino = () => {
    buscaTreinoAtualizado(treino.usuario)
    const jsonTreino = JSON.parse(localStorage.getItem("treino"));
    if (jsonTreino.length > 0) {
      setTreino(jsonTreino[0])
    }
  }

  const handleTabClick = (selectTab) => {
    setSelectedTab(selectTab);
  };
  

  return (
    <div>
        <Header aluno={treino?.aluno} atualizarTreino={atualizarTreino} />
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
