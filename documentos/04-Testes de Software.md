# Planos de Testes de Software

Apresente os casos de testes utilizados na realização da verificação e validação da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros (robustez da aplicação).

### Tipo de Teste

- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

#### Etapa 2

<table>
  <tr>
    <th colspan="2" width="1000">CT-001 - S  
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
      1. Abrir a aplicação e ir para a página de cadastro.  
      2. Preencher o campo de e-mail com um endereço válido e não cadastrado.  
      3. Preencher o campo de senha com uma senha válida.  
      4. Confirmar a senha.  
      5. Clicar no botão "Cadastrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-MAIL:</strong> um_email_123@exemplo.com  
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
    <th colspan="2" width="1000">CT-002 - S  
Teste de Login</th>
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
      1. Abrir a aplicação e ir para a página de login.  
      2. Inserir um e-mail válido e cadastrado.  
      3. Inserir a senha correta correspondente ao e-mail.  
      4. Clicar no botão "Entrar".
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-MAIL:</strong> email_ja_existente@exemplo.com  
      - <strong>Senha:</strong> SenhaCorretaParaOEmail
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve autenticar o usuário e redirecioná-lo para a página inicial da aplicação.</td>
  </tr>
</table>

      


#### Exemplo de Caso de Teste de Insucesso


### ETAPA 2  

<table>
  <tr>
    <th colspan="2" width="1000">CT-002 - I01<br>Cadastro com e-mail inválido</th>
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
    <th colspan="2" width="1000">CT-002 - I01<br>Cadastro com e-mail inválido</th>
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

### ETAPA 3

Criar casos de teste da etapa 3

### ETAPA 4

Criar casos de teste da etapa 4

# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes de desenvolvimento

Cada funcionalidade desenvolvida deve ser testada pelo próprio desenvolvedor, utilizando casos de teste, tanto de sucesso quanto de insucesso, elaborados por ele. Todos os testes devem ser evidenciados.

### Exemplo

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

## Parte 2 - Testes por pares

A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes) e caso perceba a necessidade de outros casos de teste, deve acrescentá-los na sessão "Plano de Testes".

### ETAPA 2

### Exemplo

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Login com credenciais válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve redirecionar o usuário para a página inicial do aplicativo após o login bem-sucedido.</td>
  </tr>
    <tr>
      <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">José da Silva </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Maria Oliveira </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">08/05/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-time-sheet/assets/82043220/2e3c1722-7adc-4bd4-8b4c-3abe9ddc1b48"/></td>
  </tr>
</table>

### ETAPA 3

Colocar evidências de teste da etapa 3

### ETAPA 4

Colocar evidências de teste da etapa 4
