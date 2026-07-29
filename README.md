# Termak — Frontend de Diagnóstico Operacional

Este repositório contém o frontend da Termak, uma aplicação de apoio ao diagnóstico operacional e à preparação de demonstrações comerciais personalizadas.

O produto permite recolher e organizar informação sobre uma empresa antes da apresentação ou implementação de uma solução: processos, equipa, sistemas atuais, perdas de tempo, problemas e prioridades.

O frontend está localizado na pasta [`frontend`](./frontend).

## Objetivo do frontend

A aplicação foi desenhada para apoiar uma conversa comercial estruturada e transformar as respostas do cliente num diagnóstico visual.

O fluxo principal permite:

- registar o perfil e o contexto da empresa;
- mapear processos operacionais;
- identificar equipas, funções e responsabilidades;
- documentar sistemas e passagens de informação;
- priorizar problemas e perdas de tempo;
- apresentar um resumo do diagnóstico;
- preparar uma demo orientada às necessidades identificadas.

Nesta fase, o projeto contém apenas o frontend. Os dados apresentados são demonstrativos e as interações não estão ligadas a uma base de dados ou backend.

## Tecnologias

- Next.js 16 com App Router;
- React 19;
- TypeScript;
- CSS global com variáveis e componentes visuais reutilizáveis;
- Lucide React para iconografia;
- Turbopack durante o desenvolvimento.

É necessário Node.js `22.13.0` ou superior.

## Páginas disponíveis

| Rota | Descrição |
| --- | --- |
| `/` | Dashboard com indicadores, compromissos, pipeline e diagnóstico em destaque |
| `/oportunidades` | Lista e quadro de oportunidades comerciais |
| `/diagnosticos` | Estado e progresso dos diagnósticos |
| `/diagnosticos/metalica` | Workspace interativo do diagnóstico operacional |
| `/clientes` | Empresas, contactos e contexto comercial |
| `/demos` | Preparação e acompanhamento de demonstrações |
| `/tarefas` | Próximas ações e tarefas comerciais |

## Workspace de diagnóstico

O diagnóstico da Metalúrgica Central funciona como demonstração completa do fluxo. Está dividido em sete etapas:

1. Empresa;
2. Operação;
3. Equipa;
4. Sistemas;
5. Problemas;
6. Resumo;
7. Demo.

O ecrã inclui:

- perguntas de apoio à chamada;
- área central de edição;
- insights automáticos;
- progresso por secção;
- construtor de processo;
- matriz de responsabilidades;
- mapa de sistemas;
- classificação de impacto;
- prioridades recomendadas;
- percurso sugerido para a demo.

As alterações feitas neste workspace são mantidas apenas no estado local do browser durante a sessão.

## Sistema visual

O frontend utiliza um sistema visual constante entre páginas:

- fundo cinzento muito claro;
- superfícies brancas;
- texto em tons de carvão e cinzento;
- verde escuro como única cor principal;
- cores semânticas usadas apenas em estados, prioridades e alertas;
- bordas suaves e sombras discretas;
- espaçamentos, cabeçalhos, formulários, tabelas e botões consistentes;
- layout responsivo para desktop, tablet e mobile.

Não são utilizados gradientes decorativos, glassmorphism ou cores diferentes por página.

## Estrutura principal

```text
frontend/
├── app/
│   ├── clientes/
│   ├── demos/
│   ├── diagnosticos/
│   ├── oportunidades/
│   ├── tarefas/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── app-shell.tsx
│   ├── diagnostic-workspace.tsx
│   ├── new-opportunity.tsx
│   ├── opportunities-view.tsx
│   ├── tasks-list.tsx
│   └── ui.tsx
├── public/
├── next.config.ts
└── package.json
```

### Componentes importantes

- `app-shell.tsx`: sidebar, navegação, pesquisa e cabeçalho global;
- `ui.tsx`: botões, cards, badges, progresso e cabeçalhos reutilizáveis;
- `diagnostic-workspace.tsx`: fluxo completo e interativo do diagnóstico;
- `opportunities-view.tsx`: visualização em lista ou quadro;
- `tasks-list.tsx`: tarefas interativas;
- `new-opportunity.tsx`: formulário modal para criar uma oportunidade.

As pastas `components` e `Warehouse-Stock-Inventory-Management-System--NextJS-FullStack-main` existentes na raiz foram utilizadas como referências de componentes e organização. Não fazem parte da aplicação executada.

## Executar localmente

Na raiz do repositório:

```bash
cd frontend
npm install
npm run dev
```

A aplicação fica disponível em:

```text
http://localhost:3001
```

O servidor está configurado para escutar em `0.0.0.0`, permitindo acesso através da rede local.

Para descobrir o endereço IPv4 da máquina no Windows:

```powershell
ipconfig
```

Depois, noutro dispositivo ligado à mesma rede, abrir:

```text
http://IP-DA-MAQUINA:3001
```

Exemplo:

```text
http://192.168.1.78:3001
```

Se o acesso por outro dispositivo for bloqueado, é necessário permitir o Node.js em redes privadas na Firewall do Windows.

## Validação e build

```bash
cd frontend
npm run build
npm run lint
```

Para iniciar uma build de produção:

```bash
npm run start -- -p 3001
```

## Limitações atuais

- não existe autenticação funcional;
- não existe persistência de dados;
- os formulários não enviam informação para uma API;
- os indicadores e empresas são dados demonstrativos;
- anexos, exportação PDF e colaboração são apenas elementos de interface;
- pesquisa e alguns filtros representam o comportamento visual previsto.

Estas áreas devem ser ligadas ao backend numa fase posterior sem alterar o sistema visual ou a organização principal do frontend.
