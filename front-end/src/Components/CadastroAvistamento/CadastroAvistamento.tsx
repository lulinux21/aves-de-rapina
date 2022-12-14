import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "../CadastroAve/styles.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface IBirdFormState {
  id: number;
  namePT: string;
  nameEN: string;
  nameLAT: string;
  size: string;
  gender: string;
  color: string;
  family: string;
  habitat: string;
}

interface IAnnotationFormState {
  date: Date;
  place: string;
  bird: IBirdFormState;
  text: string;
  user: IUserFormState;
}

interface IUserFormState {
  id: number;
}

const AnnotationRegister = () => {
  const configuracao = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const history = useNavigate();

  const [birds, setBirds] = useState<IBirdFormState[]>([]);

  const [birdEscolhido, setBirdEscolhido] = useState<IBirdFormState>();

  const [idBird, setIdBird] = useState<Number>();

  const [userName, setUserName] = useState(
    `${localStorage.getItem("userName")}`
  );

  const [birdFormState, setBirdFormState] = useState<IBirdFormState>({
    id: 0,
    namePT: "",
    nameEN: "",
    nameLAT: "",
    size: "",
    gender: "",
    color: "",
    family: "",
    habitat: "",
  });

  const [userFormState, setUserFormState] = useState<IUserFormState>({
    id: 0,
  });

  const [formState, setFormState] = useState<IAnnotationFormState>({
    date: new Date(),
    place: "",
    text: "",
    bird: birdFormState,
    user: userFormState,
  });

  useEffect(() => {
    getBirds();
    alteraIdUserLogado();
  }, []);

  useEffect(() => {
    getBirdById();
  }, [idBird]);

  useEffect(() => {
    setFormState({
      ...formState,
      bird: birdEscolhido || birdFormState,
    });
  }, [birdEscolhido]);

  async function alteraIdUserLogado() {
    try {
      const response = await api.get(
        `http://localhost:8080/users/email/${userName}`
      );
      setFormState({
        ...formState,
        user: response.data || userFormState,
      });
    } catch (error) {
      alert("Desculpe, login inv??lido...");
    }
  }

  const getBirds = () => {
    axios
      .get("http://localhost:8080/birds/")
      .then((res) => setBirds(res.data))
      .catch((err) => console.log(err, "teste"));
  };

  const getBirdById = () => {
    axios
      .get(`http://localhost:8080/birds/${idBird}`)
      .then((res) => setBirdEscolhido(res.data))
      .catch((err) => console.log(err, "teste"));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Avistamento cadastrado!");
    axios
      .post("http://localhost:8080/annotations", formState, configuracao)
      .then((res) => {
        history("/anotacoes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container className="form-container">
        <Form onSubmit={handleSubmit}>
          <h1>Cadastro de Avistamento</h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="form-label">Data</Form.Label>
              <Form.Control
                type="datetime-local"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    date: new Date(event.target.value) || new Date(),
                  })
                }
                id="date"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="form-label">Local</Form.Label>
              <Form.Control
                type="text"
                placeholder="Local do avistamento"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    place: event.target.value || "",
                  })
                }
                id="place"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} type="select">
              <Form.Label>Ave</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setIdBird(parseInt(event.target.value))}
              >
                <option>Selecione</option>
                {birds.map((bird) => (
                  <option>
                    {bird.id}: {bird.namePT} | {bird.nameEN} | {bird.nameLAT}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="form-label">Anota????o</Form.Label>
              <Form.Control
                type="text"
                placeholder="Outras informa????es"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    text: event.target.value || "",
                  })
                }
                id="text"
              />
            </Form.Group>
          </Row>

          <Button variant="success" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AnnotationRegister;
