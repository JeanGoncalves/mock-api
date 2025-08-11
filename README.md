### Mock API (TypeScript + Express)

API de testes com dados mockados para desenvolvimento local.

#### Requisitos
- Node.js 18+ (ou Bun/Yarn/Pnpm)

#### Setup
```bash
cd api
# com npm
npm install
# ou com yarn
# yarn
# ou com pnpm
# pnpm install
```

#### Rodando a API
```bash
# modo desenvolvimento (hot reload)
npm run dev

# build + produção
npm run build
npm start
```

Servidor padrão em `http://localhost:3001`.

#### Endpoints
- GET `/` — healthcheck
- Users: 
    - `GET /users` 
    - `GET /users/:id`
    - `POST /users`
    - `PUT /users/:id`
    - `DELETE /users/:id`
- Products: 
    - `GET /products`
    - `GET /products/:id`
    - `POST /products`
    - `PUT /products/:id`
    - `DELETE /products/:id`
- Posts:
    - `GET /posts`
    - `GET /posts/:id`
    - `POST /posts`
    - `PUT /posts/:id`
    - `DELETE /posts/:id`

Dados iniciais em `db.json`. As mutações são in-memory (não persistem no arquivo).


### Collection do Postman

- **Arquivo da collection**: `mock-api.postman_collection.json`

#### Como importar
1. Abra o Postman e vá em: File → Import (ou clique em Import no topo).
2. Selecione o arquivo `mock-api.postman_collection.json` (arrastar e soltar também funciona).
3. A collection aparecerá como `mock-api` no sidebar.

#### Variáveis e base URL
- A collection já define variáveis: `protocol`, `host`, `port`, `baseUrl`, `userId`, `productId`, `postId`.
- `baseUrl` é montado automaticamente a cada requisição a partir de `protocol`, `host` e `port` (ex.: `http://localhost:3001`).
- Para alterar a porta/host, ajuste as variáveis da própria collection (ícone de olho → Edit).

#### Fluxo sugerido de uso
1. Execute `Health Check` para validar que a API está respondendo.
2. Rode os requests de `List` (GET) para ver os dados iniciais.
3. Crie um recurso com `Create` (POST). O `id` retornado é salvo automaticamente nas variáveis (`userId`, `productId`, `postId`).
4. Em seguida, rode `Update` (PUT) e `Delete` (DELETE) — os requests usam o `:id` a partir dessas variáveis.

#### Testes automáticos
- Cada request possui testes básicos (status code, tipo de resposta e campos esperados).
- As requisições `Create` salvam o `id` retornado em variáveis para encadear `Update`/`Delete` sem edição manual.

