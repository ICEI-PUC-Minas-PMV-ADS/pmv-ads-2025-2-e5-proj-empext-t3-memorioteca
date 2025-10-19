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
    <th colspan="2" width="1000">CT-002 - S01<br> Teste de Login</th>
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
    <th colspan="2" width="1000">CT-001 - I02<br>Cadastro com senha inválido</th>
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
    <th colspan="2" width="1000">CT-001 - I03<br> Cadastro com e-mail já cadastrado</th>
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
    <th colspan="2" width="1000">CT-003 - S01<br> Teste de Cadastro de Projeto</th>
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
    <th colspan="2" width="1000">CT-004 - S01<br> Teste de Edição de Projeto</th>
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
    <th colspan="2" width="1000">CT-005 - S01<br> Teste de Exclusão de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> O sistema deve permitir que um projeto seja excluido por usuarios administradores </td>
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
    <td> 
    1. Acesse o sistema com um usuario administrador </br>
    2. Pesquise o projeto que deseja excluir </br>
    3. Acesse a pagina de detalhes do projeto </br>
    4. Solicite a exclusão do projeto </br>
    5. Confirme a exclusão do projeto
     </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O projeto deve ser excluido da base de dados e não ser mais exibido no sistema </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-006 - S01<br> Teste de Consulta de Projeto</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> O sistema deve permitir a visualização dos dados de um projeto </td>
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
    <td> 1. Acesse o sistema com um usuario qualquer. </br>
    2. Acesse a tela de pesquisa/listagem de projetos. </br>
    3. Selecione o projeto que deseja consultar. </br>
     </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve exibir o titulo, descrição e imagem do projeto, alem das informações de data criação, inicio, fim e autor, quando disponiveis. </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-007 - S01<br> Teste do Painel de Projetos em Destaque</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o painel de projetos em destaque exibe automaticamente os três últimos projetos cadastrados na aplicação, conforme definido pelo requisito funcional RF-006.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Laila Martins</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-006</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir a aplicação e realizar o login com credenciais válidas.<br>
      2. Acessar a página de cadastro de projetos.<br>
      3. Cadastrar quatro novos projetos consecutivos com dados válidos.<br>
      4. Acessar a página inicial da aplicação.<br>
      5. Verificar se o painel de “Projetos em Destaque” exibe apenas os três últimos projetos cadastrados.<br>
      6. Confirmar se os projetos estão ordenados do mais recente para o mais antigo.<br>
      7. Clicar em um dos projetos destacados para validar o redirecionamento para a página de detalhes.<br>
      8. Cadastrar um novo projeto adicional e verificar se o painel é atualizado automaticamente, exibindo agora os três projetos mais recentes.
    </td>
  </tr>
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Projeto 1:</strong> Digitalização de Documentos Antigos<br>  
      - <strong>Projeto 2:</strong> Oficinas de Escrita Criativa<br>
      - <strong>Projeto 3:</strong> Preservação Fotográfica Escolar<br>
      - <strong>Projeto 4:</strong> Catálogo Interativo de Leitura<br>
      (Após o cadastro do quarto projeto, o painel deve exibir apenas os Projetos 2, 3 e 4)
    </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      O painel de “Projetos em Destaque” deve exibir automaticamente apenas os três projetos mais recentes cadastrados. 
      A ordem deve seguir do mais novo para o mais antigo. 
      O painel deve ser atualizado automaticamente após novos cadastros, e o redirecionamento ao clicar em um projeto deve funcionar corretamente.
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-008 - S01<br> Teste de Alteração de Perfil de Usuário</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Um usuario administrador pode alterar o perfil de um usuario </td>
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
    <td> 1. Acesse o sistema com um usuario administrador </br>
    2. Acesse o menu de usuarios. </br>
    3. Encontre o usuario na lista e solicite a edição do mesmo </br>
    4. Altere o perfil para o perfil desejado </br>
    5. Salve as alterações
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve alterar o perfil do usuario conforme solicitado </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-009 - S01<br> Atualização de Informações Institucionais</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Um usuário administrador deve poder editar as informações institucionais se os parâmetros estiverem corretos </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema com um usuário administrador </br>
    2. Acessar o menu "Sobre". </br>
    3. Clicar em "Editar" </br>
    4. Preencher o campo "Texto Institucional" com pelo menos 10 caracteres </br>
    5. Preencher o campo "URL do Arquivo" com um link válido </br>
    6. Clicar em "Salvar alterações"
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve atualizar as informações institucionais </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-010 - S01<br> As informações institucionais devem ser exibidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Qualquer usuário autenticado deve conseguir visualizar as informações institucionais </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema com um usuário administrador </br>
    2. Acessar o menu "Sobre". </br>
    3. Visualizar as informações institucionais
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve atualizar exibir informações institucionais com texto e imagem </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-011 - S01<br> Deve ser possível enviar mensagem para biblioteca caso os parâmetros estejam corretos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Qualquer usuário autenticado deve conseguir enviar uma mensagem para o responsável pela Memorioteca através da aplicação caso os parâmetros estejam corretos</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema </br>
    2. Acessar o menu "Entrar em Contato". </br>
    3. Preencher o campo nome com pelo menos 2 caracteres. </br>
    4. Preencher o campo e-mail com "arroba". </br>
    5. Preencher o campo Mensagem com pelo menos 10 caracteres. </br>
    6. Clicar em "Enviar"
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve exibir a seguinte frase "Mensagem enviada com sucesso!" </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-012 - S01<br> O usuário administrador deve conseguir visualizar as mensagens recebidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> O usuário administrador devem conseguir visualizar as mensagens recebidas </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Sucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema com um usuário administrador</br>
    2. Acessar o menu "Entrar em Contato". </br>
    3. Clicar em "Mensagens". </br>
    4. Visualizar as mensagens recebidas"
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve exibir as mensagens recebidas. </td>
  </tr>
</table>

#### Exemplo de Caso de Teste de Insucesso

<table>
  <tr>
    <th colspan="2" width="1000">CT-009 - I01<br> Impossibilidade de Alterar as Informações Institucionais utilizando parâmetros incorretos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Um usuário administrador não deve poder editar as informações institucionais se os parâmetros não estiverem corretos </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema com um usuário administrador </br>
    2. Acessar o menu "Sobre". </br>
    3. Clicar em "Editar" </br>
    4. Não preencher o campo "Texto Institucional" ou preencher com menos de 10 caracteres </br>
    5. Não preencher o campo "URL do Arquivo" ou preencher com um link inválido </br>
    6. Clicar em "Salvar alterações"
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema deve atualizar as informações institucionais </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2" width="1000">CT-011 - I01<br> Não deve ser possível enviar mensagem para biblioteca caso os parâmetros não estejam corretos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Um usuário autenticado NÃO deve conseguir enviar uma mensagem para o responsável pela Memorioteca através da aplicação caso os parâmetros não estejam corretos </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
  </tr>
  <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td>Insucesso</td>
  </tr>
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td> 1. Acessar o sistema </br>
    2. Acessar o menu "Entrar em Contato". </br>
    3. Não preencher o campo nome ou preencher com menos de 2 caracteres. </br>
    4. Não preencher o campo e-mail ou preencher sem "arroba". </br>
    5. Não preencher o campo Mensagem ou preencher com menos de 10 caracteres. </br>
    6. Clicar em "Enviar"
  <tr>
    <td><strong>Dados de teste</strong></td>
    <td> - </td>
  </tr>
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> O sistema não deve enviar a mensagem e deve exibir os erros relacionados aos campos preenchidos incorretamente </td>
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
    <th colspan="6" width="1000">CT-003 - S01 <br>Teste de Cadastro de Projeto</th>
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
    <th colspan="6" width="1000">CT-004 - S01 <br>Teste de Edição de Projeto</th>
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
    <th colspan="6" width="1000">CT-005 - S01 <br>Teste de Exclusão de Projeto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> Após solicitar a exclusão de um projeto, o sistema deve exibir uma modal de confirmação, e somente caso o usuario aceite, o projeto será excluido </td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430"> João Victor Antunes </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> 19/10/2025 </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"> Modal e exclusão com sucesso </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1327" height="683" alt="image" src="https://github.com/user-attachments/assets/c6393926-85ff-4352-a9eb-85941a869d6e" />
    </td>
    <td colspan="6" align="center">
      <img width="1301" height="707" alt="image" src="https://github.com/user-attachments/assets/1a57a058-9d3d-48cc-b6b5-abf943d7ddee" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-006 - S01 <br>Permitir a visualização dos dados do projeto</th>
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
<img width="2558" height="940" alt="04_Visualizar Projeto" src="https://github.com/user-attachments/assets/5f06a0c0-b5b7-4cd4-bc67-ec47fc9d6a51" />
    </td>
    <td colspan="6" align="center">
<img width="1276" height="949" alt="05_Excluir projeto" src="https://github.com/user-attachments/assets/bfa8f3da-f352-4973-88fa-68b9f3cf37d6" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-007 - S01 <br>Teste do Painel de Projetos em Destaque</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5"> - </td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430"> - </td>
     <td width="100"><strong>Data do Teste</strong></td>
    <td width="150"> - </td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"> - </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
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
<img width="1275" height="930" alt="03_Editar Usuario" src="https://github.com/user-attachments/assets/a8520719-b0c2-430a-8032-aea79706f458" />
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
      <img width="1277" height="1027" alt="01_Menu conforme perfil" src="https://github.com/user-attachments/assets/3c212053-9cf7-465c-9d78-f33dd158fa26" />
    </td>
    <td colspan="6" align="center">
      <img width="2551" height="455" alt="01_Menu conforme perfil cadastrar" src="https://github.com/user-attachments/assets/8665ee48-3110-4b34-b157-266aba3d7d53" />
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
      <img width="1268" height="507" alt="02_Lista Usuarios" src="https://github.com/user-attachments/assets/6a15caf4-4a1e-467c-8930-7088c51f32cc" />
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
<img width="1276" height="945" alt="06_Alterar senha" src="https://github.com/user-attachments/assets/4aa76dfb-3882-42f4-8711-671f3ce55c10" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Carregamento inicial da página de projetos</th>
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
    <td colspan="6" align="center">
    <img width="1916" height="949" alt="image" src="https://github.com/user-attachments/assets/ea808d39-40e6-4362-a6dc-fda447c67f4d" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-012<br>Filtro de busca por título</th>
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
    <td colspan="6" align="center">
      <img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/43c1bb95-5166-4f8c-a9ff-95132565b17c" />
      <img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/03ea3b8b-fbcb-410e-a98a-60d5eeb5bede" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-013<br>Validação de data de criação inválida</th>
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
    <td colspan="6" align="center">
      <img width="1919" height="688" alt="image" src="https://github.com/user-attachments/assets/694e8f13-6e45-4f86-853a-9f0d32fee9f8" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-014<br>Múltiplos filtros combinados</th>
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
    <td colspan="6" align="center">
      <img width="1917" height="736" alt="image" src="https://github.com/user-attachments/assets/2c6b61a1-483b-40e6-af21-cae917abdb1e" />
      <img width="1916" height="734" alt="image" src="https://github.com/user-attachments/assets/ed093722-de95-4581-bcce-bc7fddacc7d7" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-015<br>Navegação entre páginas (paginação)</th>
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
    <td colspan="6" align="center">
      <img width="1903" height="947" alt="image" src="https://github.com/user-attachments/assets/cd14299a-4f7e-4e2b-972f-124c01da1d3e" />
      <img width="1904" height="945" alt="image" src="https://github.com/user-attachments/assets/4873bf78-63ef-4bb1-90ec-0a33404e8572" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-016<br>Alteração de itens por página</th>
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
    <td colspan="6" align="center">
      <img width="1903" height="947" alt="image" src="https://github.com/user-attachments/assets/3a4aa6be-69da-4242-8810-7fe36e81cca6" />
      <img width="1905" height="945" alt="image" src="https://github.com/user-attachments/assets/1f869f2a-8e3b-4d9d-b41c-f6f81f51f7a4" />
      <img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/eff9f113-59e5-4fd3-bff4-6b7df85fcc0c" />
      <img width="1904" height="913" alt="image" src="https://github.com/user-attachments/assets/2139f6cd-e5db-4308-9614-e03518783d83" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-017<br>Visualização de projeto ao clicar no card</th>
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
    <td colspan="6" align="center">
        <img width="1917" height="719" alt="image" src="https://github.com/user-attachments/assets/14bf3658-8109-4702-a968-2e32e4896b0c" />
        <img width="823" height="754" alt="image1"
        src="https://github.com/user-attachments/assets/6b753f08-2b4b-4990-837c-36e20f54c086" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-018<br>Mensagem quando nenhum projeto é encontrado</th>
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
    <td colspan="5">A mensagem foi exibida corretamente quando não havia resultados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/user-attachments/assets/ba323aae-69d0-41f0-9e44-33b544f0ad72" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-019 - S01<br> Informações Institucionais PUT </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao acessar a funcionalidade e preencher os campos de Texto com pelo menos 10 caracteres e Imagem com uma URL válida, tais dados devem ser registrados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">28/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados registrados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_Institucional_PUT.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-019 - I01<br> Informações Institucionais PUT incorreto </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao acessar a funcionalidade e NÃO preencher os campos de Texto com pelo menos 10 caracteres e/ou Imagem com uma URL válida, tais dados NÃO devem ser registrados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">28/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados não registrados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_Institucional_Validacoes.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-020 - S01<br> Informações Institucionais PUT incorreto GET </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Os dados registrados devem estar armazenados</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">28/09/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados registrados exibidos.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_Institucional_GET.png" />
    </td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-021 - S01<br>Fale Conosco POST</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao acessar a funcionalidade de "Entrar em Contato" e preencher os campos de Nome com pelo menos dois caracteres, E-mail com "arroba" e Mensagem com pelo menos 10 caracteres, tais dados devem ser registrados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">05/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados registrados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_FaleConosco_POST2.png" />
    </td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-021 - I01<br>Fale Conosco POST incorreto</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Caso o campo Nome não seja preenchido com pelo menos dois caracteres, E-mail seja preenchido sem "arroba" e/ou a Mensagem não tenha pelo menos 10 caracteres, tais dados NÃO devem ser registrados</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">05/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Dados não registrados.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_FaleConosco_POSTindevido.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-022 - S01<br>Fale Conosco GET</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">As mensagens devidamente registradas devem ser exibidas com os campos Nome, E-mail, Mensagem e Data de Envio.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade (desenvolvimento e teste)</strong></td>
    <td width="430">Mayara Pinhero</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">05/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">Mensagens exibidas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1901" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Teste_FaleConosco_GET.png" />
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
    <th colspan="6" width="1000">CT-005 - S01<br> Teste de Exclusão de Projeto</th>
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
    <th colspan="6" width="1000">CT-006 - S01<br> Teste de Consulta de Projeto</th>
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
    <th colspan="6" width="1000">CT-007 - S01<br>Projetos mais recentes</th>
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
<img width="1038" height="925" alt="projetos_destaque" src="https://github.com/user-attachments/assets/02a0f203-dc4d-4f28-aab6-8fbbe560f75a" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-008 - S01<br> Teste de Alteração de Perfil de Usuário</th>
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
    <th colspan="6" width="1000">CT-010 - S01<br> Carregamento das informações institucionais</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve carregar e exibir corretamente o texto e a imagem institucional armazenados no banco de dados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema carregou corretamente as informações institucionais, exibindo o texto formatado com parágrafos e a imagem flutuando à direita.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1902" height="944" alt="image" src="https://github.com/user-attachments/assets/98ecf0ff-ebc0-4108-a7a1-7edb4c247129" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-011 - S01<br>Formulário fale conosco</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema exibir formulário de fale conosco.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Pedro Louzada</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema enviou a mensagem corretamente e exibiu a confirmação de sucesso. Os campos foram limpos após o envio.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1089" height="945" alt="image" src="https://github.com/user-attachments/assets/19c74de2-80ab-4d69-9fc4-d0a1a60a49ed" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-00X<br>Tela contendo a lista de projetos cadastrados</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve carregar e exibir corretamente a lista de projetos cadastrados.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Pedro Louzada</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema carregou corretamente a lista de projetos cadastrados contendo título, imagem e descrição resumida de cada um. </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1902" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/TesteporPares_ListaProjetos.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-00X<br>Busca avançada de projetos - Filtro Título </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao preencher o campo "Título" com o título completo ou em parte, o sistema deve trazer os projetos que possuem o texto que foi preenchido no título.</td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Pedro Louzada</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema trouxe o projeto com título "Natureza" tal como filtrado. </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1902" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/TesteporPares_FiltroT%C3%ADtulo.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-00X<br>Busca avançada de projetos - Filtro Descrição </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao preencher o campo "Descrição" com a descrição completo ou em parte, o sistema deve trazer os projetos que possuem o texto que foi preenchido na descrição. </td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Pedro Louzada</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema trouxe o projeto que continha a palavra "digitais" na descrição tal como filtrado. </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1902" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/TesteporPares_FiltroDescri%C3%A7%C3%A3o.png" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-00X<br>Busca avançada de projetos - Filtro Data </th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Ao preencher o campo "Data de criação" com a data de cadastro, o sistema deve trazer os projetos que foram cadastrados na data informada. </td>
  </tr>
  <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Pedro Louzada</td>
    <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Mayara Pinheiro</td>
    <td width="100"><strong>Data do teste</strong></td>
    <td width="150">19/10/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema trouxe os projetos cadastrados em 06/10/2025, conforme preenchido. </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
      <img width="1902" height="944" alt="image" src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/TesteporPares_FiltroData.png" />
    </td>
  </tr>
</table>

### ETAPA 4


