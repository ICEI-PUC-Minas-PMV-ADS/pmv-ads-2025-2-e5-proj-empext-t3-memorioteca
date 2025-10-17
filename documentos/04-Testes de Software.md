# Planos de Testes de Software

Apresente os casos de testes utilizados na realização da verificação e validação da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros (robustez da aplicação).

### Tipo de Teste

- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

### Etapa 2

#### Exemplo de Caso de Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - S01
Teste de Cadastro</th>
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
    <th colspan="2" width="1000">CT-002 - S02 Teste de Login</th>
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
    <th colspan="2" width="1000">CT-003 - I03 Cadastro com e-mail já cadastrado</th>
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
    <th colspan="2" width="1000">CT-004 - S04 Teste de Cadastro de Projeto</th>
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
      - <strong>Título:</strong>Projeto Leitura<br>  
      - <strong>Descrição:</strong>Leitura para crianças<br>
      - <strong>Nome do Autor:</strong>Priscila Maruno<br>
      - <strong>Data de Início:</strong>12/10/2025<br>
      - <strong>Data de Fim:</strong>17/10/2025<br>
      - <strong>URL do Arquivo:</strong>https://img.freepik.com/vetores-premium/ilustracao-em-vetor-de-livro-de-leitura-de-crianca_29937-1554.jpg?semt=ais_hybrid&w=740&q=80<br>
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve cadastrar o projeto e exibir uma mensagem de sucesso. Depois redirecionar o usuário para a página de projetos.</td>
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
</br>
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
</br>
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
</br>
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
</br>
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
</br>
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

Colocar evidências de teste da etapa 3

### ETAPA 4

Colocar evidências de teste da etapa 4

