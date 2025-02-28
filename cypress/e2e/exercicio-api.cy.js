/// <reference types="cypress" />
import { faker } from "@faker-js/faker";  // importando a lib faker
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    }) 
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.property('usuarios');
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = faker.internet.username();
    let email = faker.internet.email(usuario);    
    cy.cadastrarUsuario(usuario, email)
    .then((response) => {
      expect(response.status).equal(201);
      expect(response.body.message).equal('Cadastro realizado com sucesso');
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('Fulano da silva', 'beltrano@qa.com.br')
    .then((response) => {
      expect(response.status).equal(400);
      expect(response.body.message).equal('Este email já está sendo usado');
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario = faker.internet.username();
    let email = faker.internet.email(usuario);
    cy.cadastrarUsuario(usuario, email)
    .then((response) => {
      let id = response.body._id;
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        headers: {authorization: token},
        body: {
          "nome": `${usuario} Editado`,
          "email": email,
          "password": "teste",
          "administrador": "true",
        }
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.message).equal('Registro alterado com sucesso');
      })
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let usuario = faker.internet.username();
    let email = faker.internet.email(usuario);
    cy.cadastrarUsuario(usuario, email)
    .then((response) => {
      let id = response.body._id;
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body.message).equal('Registro excluído com sucesso');
      }) 
    });
  });
});
