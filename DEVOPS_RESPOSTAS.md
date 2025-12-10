# Respostas - Questionário DevOps

## 1. Git & Controle de Versão

 ### Explique a diferença entre `git merge` e `git rebase`.
Git merge junta duas branches criando um commit de merge, preservando todo o histórico e mostrando que houve duas linhas de desenvolvimento paralelas. Já o git rebase reorganiza os commits de forma linear, "re-aplicando" seus commits em cima da outra branch, reescrevendo o histórico para ficar em linha reta.

O merge pode ser mais recomendado para trabalhos em equipe e para quando se quer preservar o histórico completo de como o desenvolvimento aconteceu. Já o rebase, pode ser preferivel em branches pessoais para deixar o histórico mais limpo antes de fazer Pull Request.

### Quando você usaria `git cherry-pick`?
Usaria git cherry-pick quando preciso pegar um commit específico de uma branch e aplicá-lo em outra, sem trazer todos os outros commits. Por exemplo, se fiz um commit na branch errada, posso usar cherry-pick para copiá-lo para a branch correta.

### O que é um Pull Request e qual seu propósito?
O Pull Request é um pedido para revisar e aceitar o código feito antes do merge, permite que haja uma revisão pela equipe. Isso garante que novas funcionalidades ou correções sejam revisadas antes de entrar na base de código principal.

## 2. Docker & Containers

### Explique com suas palavras o que é um container Docker
Um container Docker é uma ferramenta para fazer um "pacote" com a aplicação e todo o ambiente necessário para que ela funcione independente do computador. Ele isola a aplicação do sistema operacional garantindo que funcione da mesma forma em qualquer lugar como um "ambiente portátil".

### Qual a diferença entre uma imagem Docker e um container?
Uma imagem Docker é um modelo de somente leitura (read-only) com a estrutura para criação do container, mas não executa diretamente. O conteiner é uma instância em execução dessa imagem e pode durar somente no tempo de excução (runtime). Com uma imagem posso criar vários containers rodando simultaneamente.

### Para que serve o arquivo `Dockerfile`?
O `Dockerfile` é o arquivo com as instruções para construir o a imagem docker.

### O que é o `docker-compose` e quando você o usaria?
O `docker-compose`é uma ferramenta para gerenciar vários containers juntos. Usamos quando a aplicação precisa de vários serviços como o backend + banco + frontend, mas se trata de desenvolvimento local, se for em grande escala usamos Kubernetes.

## 3. CI/CD

### O que significa CI/CD?
* CI = Continuous Integration (Integração Contínua): Juntar código de vários desenvolvedores frequentemente e testar automaticamente. Fazemos commits frequentes, se faz teste automaticos para cada mudança para verificar se está tudo funcionando.

* CD = Continuous Delivery/Deployment (Entrega/Deploy Contínuo): 
    * Continuous Delivery (Entrega Contínua): Código pronto para a produção, mas o deploy é manual (depende de um clique).
    * Continuous Deployment (Deploy Contínuo): Deploy automatico. 

### Cite 3 ferramentas de CI/CD que você conhece.
Nunca utilizei, mas em pesquisas verifiquei 3 opções:
* *Bitbucket*
* *GitHub Actions*
* *GitLab CI*

### Explique o que acontece em um pipeline de CI/CD típico.
* Pipeline CI/CD
    * Desenvolvedor envia código: Pequenas alterações são enviadas para um repositório (ex: Git)
    * Gatilho: O sistema CI/CD detecta a nova alteração.
    * Build: O código é compilado e construído.
    * Testes Automatizados: Testes unitários, de integração e outros são executados automaticamente.
    * Entrega/Implantação: Se os testes passarem, o código é entregue (Delivery) ou implantado automaticamente (Deployment).

## 4. Ambientes e Configuração

### Por que usamos variáveis de ambiente em vez de hardcoding de configurações?
As variáveis de ambiente são valores dinâmicos gerenciados pelo sistema operacional que afetam o comportamento de programas. São mais seguras e praticas.

### Qual a diferença entre os ambientes: desenvolvimento, homologação e produção?

* Desenvolvimento: Computador do desenvolvedor. Onde a aplicação está sendo desenvolvida.
* Homologação: Servidor de teste da empresa. Para validar se funciona antes da produção.
* Produção: Servidor real na nuvem. Sistema funcionando para clientes.

### O que é um `arquivo.env` e para que serve?

`arquivo.env` É um arquivo de texto para armazenar variáveis de ambiente de um projeto (como chaves de API, senhas, configurações de banco de dados) em formato CHAVE=VALOR, mantendo dados sensíveis separados do código-fonte e facilitando a configuração em diferentes ambientes (desenvolvimento, produção), essencial para segurança. Geralmente é adicionado ao .gitignore para não ser enviado a repositórios.

## 5. Logs e Monitoramento

### Por que logs são importantes em produção?
* Logs são registros de tudo que acontece na aplicação, como um diário que registra os eventos, erros, etc. São importantes para verifiacar problemas e fazer análises do sistema.

###  O que você faria se o backend estiver retornando erro 500 em produção?
Um aviso de manutenção para os usuários, verificar os logs e investigar as possíveis causas.

###  Cite ferramentas de monitoramento que você conhece (mesmo que nunca tenha usado)
* *Elastic Stack (ELK)*
* *Splunk*
* *Grafana*

## Questões Extras (Opcional - diferencial)

### 1. Arquitetura

#### O que é arquitetura de microsserviços?
Arquitetura de microsserviços é um estilo de desenvolvimento onde o sistema é dividido em pequenos serviços independentes, cada um responsável por uma funcionalidade específica.

#### Quando você usaria um API Gateway?
API Gateway é usado quando vários microsserviços precisam ser acessados por clientes externos. Ele facilita acesso, segurança e orquestração quando há múltiplos microsserviços.

## 2. Segurança

#### O que é HTTPS e por que é importante?
HTTPS (HyperText Transfer Protocol Secure) é a versão segura do HTTP. Ele usa criptografia para proteger a comunicação entre cliente e servidor.

#### Como você protegeria credenciais de banco de dados em produção?
* Variáveis de ambiente: Não deixar senhas no código ou versionadas no Git.
* Criptografia: variáveis sensíveis.
* Controle de acesso: Usuários com apenas as permissões necessárias.




