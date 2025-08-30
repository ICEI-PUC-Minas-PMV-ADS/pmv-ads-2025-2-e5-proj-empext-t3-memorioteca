# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários
| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **xxx** | xxxxx | xxxxx |

### Exemplo

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Gerencia a aplicação e os usuários. | Gerenciar usuários, configurar o sistema, acessar todos os relatórios. |
| **Funcionário** | Usa a aplicação para suas tarefas principais. | Criar e editar registros, visualizar relatórios. |


## Arquitetura e Tecnologias

Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Project Model Canvas construído através da ferramenta https://app.projectcanvas.online

![Project Model Canvas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/img/Canvas%20print.png)

- Link Projec Model Canvas lista - https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/docs/Project%20Model%20Canva%20-%20Lista.pdf
  
- Link Project Model Canvas quadro - https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-2-e5-proj-empext-t3-memorioteca/blob/main/documentos/docs/Project%20Model%20Canva%20-%20Quadro.pdf





## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve permitir o cadastro de novos usuarios | ALTA | 
|RF-002| A aplicação deve permitir que usuários (visitantes e administradores) cadastrados realizem login | ALTA |
|RF-003| A aplicação deve possibilitar a criação de perfis de usuário com permissoes especificas | ALTA | 
|RF-004| A aplicação deve restringir funcionalidades de acordo com o perfil do usuario | ALTA | 
|RF-005| A aplicação deve permitir o cadastro, consulta, edição e exclusão de projetos | ALTA |  
|RF-006| A aplicação deve possuir um painel para exibição de projetos em destaque | BAIXA | 
|RF-007| A aplicação deve possui funcionalidade de busca avançada de projetos | BAIXA | 
|RF-008| A aplicação deve permitir que visitantes entrem em contato com a equipe da biblioteca | MEDIA | 
|RF-009| A aplicação deve possuir tela contendo informações institucionais | MEDIA |
|RF-010| A aplicação deve permitir o cadastro de informações de divulgação do projeto | BAIXA | 

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| O sistema deve possuir uma interface amigavel ao usuario |  BAIXA | 
|RNF-004| A aplicação deve proteger os dados sensiveis dos usuarios de acessos indevidos.|ALTA|
|RNF-005| A aplicação deve ter bom nível de contraste entre os elementos da tela.	|MEDIA|

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|R-01|O projeto deverá ser entregue até o final do semestre|
|R-02|A aplicação não deve ser realizada por terceiros fora do grupo|
|R-03|A aplicação deve ser desenvolvida utilizando linguagem e padrões em comum acordo com os integrantes do grupo|

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Caso de Uso

![Diagrama de caso de uso](https://github.com/user-attachments/assets/78c1358f-8b0e-4804-aef6-b86b0979b256)

## Modelo da Base de Dados

# Para banco de dados relacional:
- Apresentar o MER (Modelo Entidade-Relacionamento)
- Apresentar o Projeto Físico da Base de Dados (estrutura das tabelas, tipos de dados, chaves primárias e estrangeiras)
# Para banco de dados NoSQL:
Apresentar o Modelo da Base de Dados (estrutura dos documentos, coleções, ou grafos, conforme o tipo de NoSQL utilizado)

