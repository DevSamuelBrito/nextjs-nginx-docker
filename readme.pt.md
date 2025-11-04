# 🚀 nextjs-nginx-docker

Um projeto de estudo — uma aplicação Next.js exportada como site estático. O build é gerado dentro de um container Docker (imagem multi-stage) e o resultado (pasta `out/`) é servido pelo Nginx. Ideal para aprender sobre builds estáticos, Docker multi-stage e deploy com Nginx.

## ✨ O que este projeto faz

- ✅ Gera um build estático de um projeto Next.js usando `next` com `output: "export"` (veja `app/next.config.ts`).
- 🧩 Realiza o build dentro de um container (estágio `builder` com Node) — ambiente reproduzível.
- 🚢 Copia a saída estática (`/app/out`) para uma imagem final baseada em `nginx:stable-alpine` e serve os arquivos com Nginx.

## 🗂️ Arquivos importantes

- `Dockerfile` — imagem multi-stage. Estágio `builder` usa Node para instalar dependências e rodar `npm run build`. Etapa final usa Nginx, substitui `default.conf` e copia `out/` para `/usr/share/nginx/html`.
- `docker-compose.yml` — define o serviço `web` que mapeia a porta do container para `8080` no host.
- `nginx/default.conf` — configuração do Nginx para servir os arquivos estáticos (inclui alias para `/_next/`).
- `app/next.config.ts` — define `output: "export"` para gerar a pasta `out/` (export estático).

## 🛠️ O que é necessário para rodar

- 🐳 Docker (recomendado >= 20.10) e Docker Compose. No Windows, prefira Docker Desktop com WSL2.
- 🧑‍💻 (Opcional) Node.js e npm para desenvolvimento local (sugestão: Node 16+ ou 18+).
- 🔌 Porta 8080 livre na máquina host (o `docker-compose.yml` mapeia `8080:80`).
- 🔐 Permissões para rodar containers Docker (ex.: Docker Desktop no Windows).

Verifique rapidamente as versões com:

```powershell
docker --version
docker compose version    # ou: docker-compose --version
node --version            # opcional, para dev local
npm --version             # opcional, para dev local
```

Dicas rápidas:

- 🔁 Se estiver no Windows e as portas não responderem, confirme se o Docker Desktop está ativo e o WSL2 habilitado.
- 🧹 Use `docker-compose build --no-cache` caso alterações não apareçam após um rebuild.

## ⚙️ Como funciona (resumo técnico)

1. Estágio `builder` (Node):
   - copia `app/package*.json` e roda `npm install`;
   - copia o código (`./app`) e executa `npm run build`.
   - Com `output: "export"`, `next build` gera a pasta `out/` (site estático).
2. Imagem final (Nginx):
   - remove a configuração padrão do Nginx e usa `nginx/default.conf` do projeto;
   - copia `/app/out` (do estágio `builder`) para `/usr/share/nginx/html` e serve esse conteúdo.

## ▶️ Rodando com Docker Compose (recomendado)

Abra o PowerShell na raiz do projeto e execute:

```powershell
# Build da imagem e criação do container
docker-compose build

docker-compose up -d

# Verificar logs do container
docker logs -f nextjs-nginx

# Parar e remover containers
docker-compose down
```

Depois de subir, acesse http://localhost:8080 no navegador.

## 🧪 Desenvolvimento local (sem Docker)

Se quiser trabalhar em modo dev localmente:

```powershell
cd app
npm install
npm run dev
```

Isso inicia o servidor de desenvolvimento do Next.js (normalmente em http://localhost:3000).

## 🔁 Reconstruir o build após alterações

Porque o build é empacotado na imagem final, sempre que alterar o código e quiser ver a versão atual no container Nginx, reconstrua a imagem e reinicie o serviço:

```powershell
# Forçar rebuild sem cache
docker-compose build --no-cache
docker-compose up -d --force-recreate
```

## 💡 Observações / dicas

- O `Dockerfile` gera um build estático (`out/`) — isso simplifica o deploy e permite servir tudo com Nginx.
- Para páginas dinâmicas ou SSR, a abordagem muda: rode `next start` em um container Node (remova `output: "export"`) ou escolha uma estratégia de serverless/SSR.
- Se o conteúdo não atualizar, limpe o cache do navegador e reconstrua a imagem com `--no-cache`.

---

Projeto criado para estudos pessoais. Sinta-se à vontade para explorar, modificar e aprender! 👋
