# Desafio LCCV - Ambiente Completo

Este repositório contém o ambiente para executar a aplicação do Desafio LCCV.

---

## Pré-requisitos

* [Docker](https://www.docker.com/) instalado
* [Docker Compose](https://docs.docker.com/compose/) instalado
* Git instalado

---

## Passo 1 - Clonar o repositório de ambiente base

```bash
git clone https://github.com/weverton-matias/desafio-lccv-environment.git lccv_environment
```

Acesse a pasta do ambiente:

```bash
cd lccv_environment
```

---

## Passo 2 - Clonar os repositórios da aplicação

### Front-end

```bash
git clone https://github.com/weverton-matias/desafio-lccv-front.git front
```

### API

```bash
git clone https://github.com/weverton-matias/desafio-lccv-api.git api
```

---

## Passo 3 - Iniciar a aplicação

Execute o comando abaixo para construir e subir todos os serviços:

```bash
docker compose up --build
```

> **OBS:** Se você estiver usando o binário `docker-compose`, ajuste o comando para:
>
> ```bash
> docker-compose up --build
> ```

---

## Passo 4 - Acessar a aplicação

Após o build, abra o navegador e acesse a aplicação:

[http://localhost:3000/](http://localhost:3000/)