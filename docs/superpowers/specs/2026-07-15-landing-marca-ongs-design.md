# Landing Nima — Reformulação (marca/consumidor, ONGs no centro)

**Data:** 2026-07-15
**Projeto:** nima-web (Vite + React 19 + styled-components)
**Arquivo alvo principal:** `src/pages/Landing/index.jsx` + `src/pages/Landing/styles.js`

## Objetivo
Reformular a landing pública (`adotenima.com.br`) para apresentar fielmente o que os
materiais oficiais propõem, no tom **marca/consumidor** do post "O QUE É", com **as ONGs
como pilar central** (a landing é também uma vitrine de valor para elas). Sem detalhar
perfis técnicos, camada admin, stack ou n8n.

## Fontes
- **Post "O QUE É"** (marca): define o arco narrativo e o tom emocional.
- **Documentação ABNT** (técnica): fornece os dados do problema (30 mi abandonados; 10–20%
  de devoluções por incompatibilidade comportamental) e o vocabulário dos módulos.
- **Landing atual**: sistema visual forte (Bricolage Grotesque + Figtree; tokens sand/paper/
  blue/honey/moss). **Mantido e estendido** — não é rebuild do zero.

## Decisões
- Tom **marca/consumidor**; público: adotantes + ONGs.
- **ONGs elevadas** de bloco final para pilar central, com cards de benefício reais.
- **Vaquinhas** (a ONG divulga o PIX dela) — NÃO "gerar PIX". Corrige a landing atual.
- Match score **95%** (alinha ao post).
- Smart Tag nomeada **"Patinha"**.

## Marca (nova)
- Assets em `public/`: `nima-logo.png` (imagotipo), `nima-mark.png` (símbolo) — PNG
  transparentes 1080×1350.
- Processados por `process_brand.ps1` → `nima-logo-trim.png`, `nima-mark-trim.png`,
  `nima-logo-white.png` (rodapé escuro), `favicon-nima.png` (256).
- **Paleta afinada ao logo:** `--blue` → `#0151c8`; novo `--navy` → `#0b1e45` (a patinha-
  coração). A ondinha-NFC do "a" do wordmark ecoa como motivo na seção Patinha.
- Navbar/hero: imagotipo. Favicon/og: símbolo. Rodapé: wordmark branco.

## Estrutura (arco da página)
1. **Navbar** — imagotipo "Nima" + nav âncoras + "Entrar no painel" (ONG/admin).
2. **Hero — "O que é a Nima"** — "Adoção inteligente que usa IA para conectar cães e gatos a
   lares compatíveis, garantindo conexões duradouras." Card de afinidade **95%**. CTAs:
   "Quero adotar" + "Sou de uma ONG".
3. **O Desafio da Adoção** 🆕 — três dores (devolução/abandono; falta de alinhamento de
   expectativas; desconhecer necessidades: raça, dieta, gasto energético) + dados em
   destaque (**+30 mi** abandonados, **10–20%** de devoluções por incompatibilidade).
4. **Nossa Solução: IA e Conexão** — formulário detalhado → IA lê perfil e estilo de vida →
   match real. Mantém a trilha (quiz → feed por afinidade → candidatura/dossiê → guia) e o
   "o que a IA cruza" (sua rotina / o jeito dele / a pontuação).
5. **Pós-adoção: Meu Pet** — guias nutricionais, adestramento, cronograma de cuidados;
   evitar o abandono tardio. (4 cards mantidos.)
6. **Patinha — a Smart Tag** — tecnologia dual NFC + QR; localização imediata em tempo real;
   ficha pública (nome, contato, carteira de vacinação digital). Vídeo mantido.
7. **★ Para ONGs (pilar central)** — dupla vitrine. Cards de benefício: 🧠 Triagem com IA
   (dossiê, menos devolução) · 💸 Vaquinhas (doações diretas) · 🙌 Voluntariado centralizado ·
   🗺️ Visibilidade (mapa + feed dos adotantes) · 📋 Menos planilha, mais tempo com os animais.
   CTA forte: "Cadastrar minha ONG / Entrar no painel".
8. **Segurança e Privacidade** 🆕 — identidade verificada; LGPD; criptografia "nível
   bancário".
9. **Origem do nome — ANIMA** 🆕 — "do latim, 'sopro de vida'/'alma'… uma vida com
   personalidade que se conecta com a alma do lar." Fecho emocional.
10. **CTA final + Footer** — "Adoção consciente. Mude uma vida." + `@adote.nima`. Rodapé com
    wordmark branco.

## Arquivos tocados
- `src/index.css` — tokens (`--blue`, `--navy`).
- `index.html` — favicon → `favicon-nima.png`; título/og mantidos/afinados.
- `src/pages/Landing/index.jsx` — nova estrutura + brand + copy.
- `src/pages/Landing/styles.js` — novos styled-components (Brand img, Desafio, Stats, OngGrid
  expandido, Security, Anima) + uso dos tokens.
- `public/` — assets processados da marca.

## Fora de escopo (YAGNI)
- Perfis técnicos, painel admin, arquitetura, stack, n8n na landing.
- Vitrine de ONGs parceiras com dados reais (sem dataset ainda) — usar copy de benefício.
- i18n; a landing é PT-BR.
