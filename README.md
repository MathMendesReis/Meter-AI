
# 🌊 Teste Técnico – Desenvolvimento Web 🌊

Este repositório contém o backend de um aplicativo projetado para gerenciar a leitura individualizada de
consumo de água e gás. Ele fornece APIs essenciais para a coletar informações de consumo, para facilitar a coleta da informação, o serviço utilizará IA para
obter a medição através da foto de um medidor.


## 🛠 Tecnologias Utilizadas

- **🟢 Node.js**: Ambiente de execução para JavaScript.
- **🔗 Prisma**: ORM para Node.js e TypeScript, facilitando o gerenciamento do banco de dados.
- **🐳 Docker**: Solução para desenvolvimento e execução de aplicativos em contêineres.
- **🐦 Nest**: Framework de alto desempenho para aplicações web em Node.js.
- **📦 PostgreSQL**: Banco de dados relacional robusto e eficiente.

## 🚀 Configuração Inicial Local


   ```bash
      docker network create "meterAI-network" &&
      docker compose up -d
   ```


   Você poderá acessar o Swagger em <http://localhost:3000/api>.




## Licença

Este código está licenciado usando a
[licença MIT](./LICENSE).


