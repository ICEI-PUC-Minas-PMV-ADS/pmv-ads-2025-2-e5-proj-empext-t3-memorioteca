# Planos de Testes de Software

Apresente os casos de testes utilizados na realização da verificação e validação da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros (robustez da aplicação).

### Tipo de Teste

- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

### Etapa 2

#### Exemplo de Caso de Teste de Sucesso

<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - S01<br> Teste de Cadastro</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um novo usuário consegue se cadastrar com sucesso na aplicação.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e ir para a página de cadastro.<br>
      2. Preencher o campo de e-mail com um endereço válido e não cadastrado.<br>
      3. Preencher o campo de senha com uma senha válida.<br>  
      4. Confirmar a senha.<br>
      5. Clicar no botão "Cadastrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-MAIL:</strong> um_email_123@exemplo.com<br>  
      - <strong>Senha:</strong> SenhaValida123
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve criar o novo usuário e redirecioná-lo para a página de login ou para a página principal já logado, exibindo uma mensagem de sucesso.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-002 - S02<br> Teste de Login</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário cadastrado consegue realizar login com sucesso.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e ir para a página de login.<br>  
      2. Inserir um e-mail válido e cadastrado.<br>  
      3. Inserir a senha correta correspondente ao e-mail.<br>  
      4. Clicar no botão "Entrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-MAIL:</strong> email_ja_existente@exemplo.com<br> 
      - <strong>Senha:</strong> SenhaCorretaParaOEmail
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve autenticar o usuário e redirecioná-lo para a página inicial da aplicação.</td>
  </tr>
</table>

#### Exemplo de Caso de Teste de Insucesso

<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - I01<br>Cadastro com e-mail inválido</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro quando o formato do e-mail é inválido.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e ir para a página de cadastro.<br>
      2. Preencher o campo de e-mail com um texto que não seja um e-mail (ex: "email_invalido").<br>
      3. Preencher os campos de senha.<br>
      4. Clicar no botão "Cadastrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-mail:</strong> email_invalido<br>
      - <strong>Senha:</strong> SenhaValida123
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que o formato do e-mail é inválido.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-002 - I02<br>Cadastro com senha inválido</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica a resposta do sistema a uma tentativa de login com uma senha incorreta.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e ir para a página de login.<br>
      2. Inserir um e-mail válido e cadastrado..<br>
      3. Inserir uma senha incorreta.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-mail:</strong>  email_ja_existente@exemplo.como<br>
      - <strong>Senha:</strong> SenhaIncorreta123
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando "E-mail ou senha inválidos".</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-003 - I03<br> Cadastro com e-mail já cadastrado</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o cadastro de um e-mail que já existe na base de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e ir para a página de cadastro.<br>  
      2. Preencher o campo de e-mail com um endereço que já está cadastrado.<br>  
      3. Preencher os campos de senha.<br>  
      4. Clicar no botão "Cadastrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-mail:</strong> email_ja_existente@exemplo.com <br> 
      - <strong>Senha:</strong> SenhaQualquer123
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve exibir uma mensagem de erro informando que o e-mail fornecido já está em uso.</td>
  </tr>
</table>

### ETAPA 3

#### Exemplo de Caso de Teste de Sucesso

<table>
  <tr>
    <th colspan="2" width="1000">CT-004 - S04<br> Teste de Cadastro de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o usuário consegue cadastrar um projeto com sucesso na aplicação.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Priscila Maruno</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e fazer o login.<br>
      2. Ir para a página de projetos.<br>
      3. Clicar em "Cadastrar Novo Projeto".<br>
      4. Preencher o campo de título, descrição, nome do autor, data de início, data de fim e URL do arquivo.<br>
      5. Clicar no botão "Cadastrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Título:</strong> Colocar o título do Projeto<br>  
      - <strong>Descrição:</strong> Descrever o projeto<br>
      - <strong>Nome do Autor:</strong> Colocar o nome do autor<br>
      - <strong>Data de Início:</strong> Escolher a data que começou do projeto<br>
      - <strong>Data de Fim:</strong> Escolher a data que acabou o projeto<br>
      - <strong>URL do Arquivo:</strong> Inserir a foto do projeto<br>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve cadastrar o projeto no banco de dados e exibir uma mensagem de sucesso.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-005 - S05<br> Teste de Edição de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o usuário consegue editar um projeto com sucesso na aplicação.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Priscila Maruno</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e fazer o login.<br>
      2. Ir para a página de projetos.<br>
      3. Clicar no projeto que deseja editar.<br>
      4. Clicar no botão "Editar Projeto".<br>
      5. Preencher o campo de título, descrição, nome do autor, data de início, data de fim e URL do arquivo.<br>
      5. Clicar no botão "Salvar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Título:</strong> Colocar o título do Projeto<br>  
      - <strong>Descrição:</strong> Descrever o projeto<br>
      - <strong>Nome do Autor:</strong> Colocar o nome do autor<br>
      - <strong>Data de Início:</strong> Escolher a data que começou do projeto<br>
      - <strong>Data de Fim:</strong> Escolher a data que acabou o projeto<br>
      - <strong>URL do Arquivo:</strong> Inserir a foto do projeto<br>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve alterar as informações do projeto no banco de dados e exibe uma mensagem de sucesso.</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-006 - S06<br> Teste de Exclusão de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-007 - S07<br> Teste de Consulta de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-008 - S08<br> Teste de Alteração de Perfil de Usuário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">João Victor Antunes</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - </td>
  </tr>
</table>

### ETAPA 4

Criar casos de teste da etapa 4

# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes de desenvolvimento

Cada funcionalidade desenvolvida deve ser testada pelo próprio desenvolvedor, utilizando casos de teste, tanto de sucesso quanto de insucesso, elaborados por ele. Todos os testes devem ser evidenciados.

### ETAPA 2

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve responder status 200 com token de autenticação gerado.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema permitiu o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="823" height="754" alt="image" src="https://github.com/user-attachments/assets/e214df86-3385-4100-92f6-f39ebb3a1b1a" />
</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Login com credenciais invalidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve responder status 400 com mensagem indicativa de falha de login.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema respondeu conforme o esperado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="855" height="504" alt="image" src="https://github.com/user-attachments/assets/dcac0323-c577-4605-addd-fab3ff4f3f24" />
</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Cadastro com sucesso</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve persistir as informações do usuario informadas na base de dados.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"><s>API respondeu codigo 200 e não 201 (resolvido).</s></td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados salvos com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="860" height="544" alt="image" src="https://github.com/user-attachments/assets/379c3408-0ab5-413d-9a61-0b81d79ef807" />
</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Cadastro com senha invalida</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve responder 400 com mensagem indicativa de senha invalida.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"><s>API respondeu codigo 200 e não 400 (resolvido).</s></td>
  </tr>
  <tr>
    <td width="170"><strong></strong></td>
    <td colspan="5">Resposta conforme o esperado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="860" height="513" alt="image" src="https://github.com/user-attachments/assets/d0a5bc41-7f9f-4985-ac3d-ccbd8da9ee29" />
</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Cadastro com email invalido</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve responder 400 com mensagem indicativa de email invalido.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"><s>API respondeu codigo 200 e não 400 (resolvido).</s></td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados salvos com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="863" height="555" alt="image" src="https://github.com/user-attachments/assets/ee0c9154-94c6-4a20-8e72-60364e5aafde" />
</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Cadastro com email já cadastrado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A API deve responder 400 com mensagem indicativa de que o usuario já está cadastrado.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">21/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"><s>API respondeu codigo 200 e não 400 (resolvido).</s></td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados salvos com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><img width="845" height="515" alt="image" src="https://github.com/user-attachments/assets/5a71a0a3-a4c5-46cd-8fb6-c6df50e6ff6b" />
</td>
  </tr>
</table>

### ETAPA 3

<table>
  <tr>
    <th colspan="6" width="1000">CT-004 - S04 <br>Teste de Cadastro de Projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve cadastrar o projeto no banco de dados e exibir uma mensagem de sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Priscila Maruno</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">17/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema fez o cadastro do projeto no banco de dados com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/de94b546-84cf-460d-8210-3309d36cfcd9" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image2"
        src="https://github.com/user-attachments/assets/8095f768-3e5d-4ea0-b462-c03b270fc1b9" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image3"
        src="https://github.com/user-attachments/assets/723c9ff3-e268-4466-9324-4d1f533bcf1a" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image4"
        src="https://github.com/user-attachments/assets/501cda8a-0f1f-44d3-925d-47fbf21e4426" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-005 - S05 <br>Teste de Edição de Projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve alterar as informações do projeto no banco de dados e exibir uma mensagem de sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Priscila Maruno</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">17/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema alterou as informações do projeto no banco de dados com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/391abe02-7d1c-4fee-aad7-3f7bedb22a66" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image2"
        src="https://github.com/user-attachments/assets/e303be05-5cc4-4307-9b0b-580a57bd97cf" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image3"
        src="https://github.com/user-attachments/assets/6f51259b-c04e-47f7-93d7-6f0771441e1b" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image4"
        src="https://github.com/user-attachments/assets/8afb31e4-b347-4f56-b58d-e7cf18abcab2" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-006 - S01 <br>Definição de perfil</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir/ocultar os menus conforme o perfil do usuario</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Victor</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Os menus respeitaram a regra definida</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    01_Menu conforme perfil
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
    <td colspan="6" align="center">
    01_Menu conforme perfil cadastrar
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-007 - S01 <br>Permitir listagem de usuarios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Os administradores devem conseguir listar todos os usuarios</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Victor</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Tela adicionada e exibida com sucesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    02_Lista Usuarios
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008 - S01 <br>Permitir edição de usuarios</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Os administradores devem conseguir editar os dados do usuario</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Victor</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Tela adicionada e edição realizada com sucesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    03_Editar Usuario
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-009 - S01 <br>Permitir a visualização dos dados do projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir a visualização dos dados do projeto, e administradores devem conseguir editar/excluir</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Victor</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Tela adicionada e botoes visiveis somente para o perfil admin</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    04_Visualizar Projeto
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
    <td colspan="6" align="center">
    05_Excluir projeto
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-010 - S01 <br>Permitir a alteração de senha</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir que o usuario altere sua propria senha</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">João Victor</td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Tela adicionada e funcional</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
    06_Alterar senha
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

### ETAPA 4

Colocar evidências de teste da etapa 4

## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes) e caso perceba a necessidade de outros casos de teste, deve acrescentá-los na sessão "Plano de Testes".

### ETAPA 3

<table>
  <tr>
    <th colspan="6" width="1000">CT-006 - S06<br> Teste de Exclusão de Projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve excluir o projeto do banco de dados.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">João Victor Antunes</td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Priscila Maruno</td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">17/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema excluiu o projeto do banco de dados com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
 <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/8ea2a1b9-5d52-43c8-ab33-6c1c7dee35c8" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image2"
        src="https://github.com/user-attachments/assets/9c986b08-730d-4798-8cb1-8f47ff05e3cb" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image3"
        src="https://github.com/user-attachments/assets/223b6fcb-a52f-4c8a-9954-153862baf3e4" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-007 - S07<br> Teste de Consulta de Projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir as informações do projeto.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">João Victor Antunes</td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Priscila Maruno</td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">17/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema exibiu as informações do projeto com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
 <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/6b753f08-2b4b-4990-837c-36e20f54c086" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008 - S08<br> Teste de Alteração de Perfil de Usuário</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve alterar o perfil do usuário no banco de dados e exibir uma mensagem de sucesso.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">João Victor Antunes</td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Priscila Maruno</td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">18/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"> O sistema alterou o perfil do usuário no banco de dados com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
 <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/bbac8f26-9bc2-49e2-a34b-ecfba6d7a205" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image2"
        src="https://github.com/user-attachments/assets/8bd34ca8-3ba0-4cfc-ba22-902e176897a0" />
    </td>
  </tr>
   <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image3"
        src="https://github.com/user-attachments/assets/3df85fef-1240-481f-a51b-1b3831770799" />
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image4"
        src="https://github.com/user-attachments/assets/663d8b15-e514-40fe-a472-b51292cd563a" />
    </td>
  </tr>
   <tr>
    <td colspan="6" align="center">
      <img width="823" height="754" alt="image5"
        src="https://github.com/user-attachments/assets/a50c0f53-916b-4712-afc6-030b8eb019b5" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-000 - S00<br>Projetos mais recentes</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir na pagina inicial os ultimos projetos criados</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Laila</td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">João Victor Antunes</td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Os projetos foram exibidos com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
 <tr>
    <td colspan="6" align="center">
    projetos_destaque
      <img width="823" height="754" alt="image1"
        src="" />
    </td>
  </tr>
</table>

### ETAPA 4

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Carregamento inicial da página de projetos</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">A página deve carregar e exibir a lista de projetos com paginação padrão (12 itens por página).</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema carregou corretamente a lista de projetos ao acessar a página.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print da página carregada com lista de projetos]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Filtro de busca por título</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao inserir um título no campo de filtro e clicar em "Buscar", o sistema deve retornar apenas os projetos que contenham o título buscado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A busca por título funcionou corretamente, filtrando os projetos conforme esperado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando filtro preenchido e resultados filtrados]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Validação de data de criação inválida</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao inserir uma data inválida (ex: mês 13, dia 32, ano < 1900 ou > 2100), o sistema deve exibir uma mensagem de alerta e não realizar a busca.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema validou corretamente datas inválidas, impedindo a busca e alertando o usuário.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando alerta de validação de data]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Múltiplos filtros combinados</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao preencher múltiplos campos de filtro (título, descrição e data) e clicar em "Buscar", o sistema deve retornar apenas projetos que atendam todos os critérios simultaneamente.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Os filtros combinados funcionaram corretamente, aplicando todos os critérios na busca.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando múltiplos filtros aplicados e resultados]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Função "Limpar Filtros"</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao clicar no botão "Limpar Filtros", todos os campos de filtro devem ser resetados e a página deve voltar para o estado inicial (página 1, 12 itens).</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A função "Limpar Filtros" resetou todos os campos corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando campos de filtro vazios após limpar]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Navegação entre páginas (paginação)</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao clicar nos botões "Próxima" ou "Anterior", ou em números de página específicos, o sistema deve carregar a página correspondente e atualizar o indicador de página atual.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A navegação entre páginas funcionou corretamente, mantendo os filtros aplicados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando navegação de páginas]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Alteração de itens por página</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao selecionar uma quantidade diferente de itens por página (6, 12, 24, 48 ou 96), o sistema deve recarregar a lista com a nova quantidade e resetar para a página 1.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A alteração de itens por página funcionou corretamente, ajustando a exibição e paginação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando quantidade alterada de itens]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Visualização de projeto ao clicar no card</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao clicar em um card de projeto, o sistema deve redirecionar para a página de visualização detalhada do projeto (/projects/:id).</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O redirecionamento para a página de detalhes do projeto funcionou corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando página de detalhes do projeto]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Controle de acesso - Botão "Cadastrar Novo Projeto" para administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Quando um usuário com tipo "ADMINISTRADOR" acessar a página, o botão "Cadastrar Novo Projeto" deve estar visível e funcional, redirecionando para /projects/create.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O botão apareceu corretamente para usuários administradores e o redirecionamento funcionou.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando botão visível para admin e página de criação]</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Mensagem quando nenhum projeto é encontrado</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Quando a busca não retorna resultados, deve ser exibida uma mensagem "Nenhum projeto encontrado com os filtros aplicados" com opção de limpar filtros.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">A mensagem foi exibida corretamente quando não havia resultados e o botão de limpar filtros funcionou.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">[Inserir print mostrando mensagem de nenhum resultado encontrado]</td>
  </tr>
</table>
