
# Painel de Autoatendimento (Dashboard Pessoal)

Painel web para gerenciamento pessoal de tarefas, hábitos e prioridades, desenvolvido em React com TailwindCSS. Dados são inicialmente persistidos via localStorage, com planos de evolução para backend em Symfony e alertas via Node.js.

---

## Funcionalidades

- Criar, editar e remover tarefas
- Organização por categorias e prioridades
- Persistência local usando localStorage
- Interface responsiva com TailwindCSS
- Autenticação simples (em desenvolvimento)
- Futuras integrações:
  - Backend Symfony para armazenamento em banco de dados
  - Sistema de alertas em tempo real via Node.js

---

## Tecnologias Utilizadas

- React
- TailwindCSS
- localStorage (para persistência inicial)
- UUID para geração de IDs únicos
- Symfony (planejado para backend)
- Node.js (planejado para alertas)

---

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador:

```
http://localhost:5173
```

---

## Estrutura do Projeto

```
/src
  /components    # Componentes React reutilizáveis
  /context       # Contextos para gerenciamento de estado global (ex: AuthContext)
  /services      # Serviços para manipulação de dados (ex: storageService)
  /pages         # Páginas principais
  App.jsx        # Componente raiz
  main.jsx       # Entrada da aplicação
```

---

## Próximos Passos

- Implementar autenticação completa
- Integrar backend Symfony para persistência em banco de dados
- Criar sistema de notificações e alertas via Node.js
- Melhorar UI/UX e responsividade

---

## Contribuição

Contribuições são bem-vindas! Abra issues e pull requests para sugerir melhorias ou corrigir bugs.

---

## Licença

Este projeto está licenciado sob a MIT License.
