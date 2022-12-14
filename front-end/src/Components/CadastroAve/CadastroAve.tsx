import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface IBirdFormState {
  namePT: string;
  nameEN: string;
  nameLAT: string;
  size: Number;
  gender: string;
  color: string;
  family: string;
  habitat: string;
}

const BirdRegister = () => {
  const [formState, setFormState] = useState<IBirdFormState>({
    namePT: "",
    nameEN: "",
    nameLAT: "",
    size: new Number(),
    gender: "",
    color: "",
    family: "",
    habitat: "",
  });

  const history = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    console.log(formState, "teste");
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
  };
  
  

    // post
    Axios.post("http://localhost:8080/birds", formState, config)
      .then((res) => {
        
        history("/catalogo");}
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container className="form-container">
        <Form onSubmit={handleSubmit}>
          <h1>Cadastro de Aves</h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="form-label">Nome em Português</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    namePT: event.target.value || "",
                  })
                }
                id="namePT"
                pattern="[A-Za-z\s]+$" required
                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Preencha este campo apenas com letras!')}
                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="form-label">Nome em Inglês</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    nameEN: event.target.value || "",
                  })
                }
                id="nameEN"
                pattern="[A-Za-z\s]+$" required
                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Preencha este campo apenas com letras!')}
                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="form-label">Nome em Latim</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    nameLAT: event.target.value || "",
                  })
                }
                id="nameLAT"
                pattern="[A-Za-z\s]+$" required
                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Preencha este campo apenas com letras!')}
                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
              />
            </Form.Group>
          </Row>
          <h2 className="subtitulo">Características</h2>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="form-label">Tamanho</Form.Label>
              <Form.Control
                placeholder="Tamanho em CM"
                type="number"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    size: new Number(event.target.value) || new Number(),
                  })
                }
                id="size" required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Cor</Form.Label>
              <Form.Control
                placeholder="Cor"
                type="text"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    color: event.target.value || "",
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} type="select">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    gender: event.target.value || "",
                  })
                }
              >
                <option>Selecione</option>
                <option>F</option>
                <option>M</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Família</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    family: event.target.value || "",
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Habitat</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    habitat: event.target.value || "",
                  })
                }
              />
            </Form.Group>
          </Row>

          <Button type="submit" variant="success">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default BirdRegister;
