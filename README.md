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
- Users: `GET /users`, `GET /users/:id`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
- Products: `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`
- Posts: `GET /posts`, `GET /posts/:id`, `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id`

Dados iniciais em `db.json`. As mutações são in-memory (não persistem no arquivo).


