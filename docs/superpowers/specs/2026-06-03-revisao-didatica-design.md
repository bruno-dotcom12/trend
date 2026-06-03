# Revisão didática do TREND — design

**Data:** 2026-06-03
**Problema:** o site (landing + produto) está confuso. Cada camada tem dois nomes
competindo (verbo + método), o vocabulário é poético demais dentro do produto, e
não há fio condutor que ensine a jornada Sinal → Decisão → Execução. A pessoa cai
direto no painel, sem orientação.

**Meta:** deixar tudo **mais didático e simples de entender**, sem mexer na estética.

---

## Restrições (o que NÃO muda)

- Paleta (berry/navy/creme/gold/terracota), fontes (Playfair/Lora/Inter), vibe editorial.
- O **motor determinístico** (`src/lib/engine/`): score e quantidade. Intocado.
- Os **dados-semente** (`src/lib/seed/`, sinais, peças, execução).
- Sem backend/auth (Fatia 5 segue adiada — MVP 100% local).

## Regra de linguagem (inegociável)

O TREND **não prevê e não garante desfecho**. Ele dá a **instrução certa com base em
mercado e dados**. Em todo o site, banir: "previsão", "garantido", "sem risco",
"protegido", "seguro", "certeza". Usar: "sinal detectado", "instrução baseada em
dados", "reduz a exposição do caixa", "o que e quanto comprar".

---

## A. Nomenclatura e navegação

Cada tela passa a ter **um nome direto** (o que a lojista faz); o nome do método vira
legenda pequena/discreta, nunca um segundo rótulo competindo.

| Antes (confuso) | Nome novo (direto) | Legenda | Rota nova |
|---|---|---|---|
| Painel | **Início** | `comece aqui` | `/app` (era `/app/dashboard`) |
| Descobrir / Sinal | **Descobrir tendências** | `Sinal` | `/app/descobrir` |
| Corrigir / Decisão | **Decidir o que comprar** | `Decisão` | `/app/decidir` (era `/corrigir`) |
| Blindar / Execução | **Comprar com método** | `Execução` | `/app/comprar` (era `/blindar`) |

**Navegação (`SiteNav`):** mostra só o nome direto. A legenda do método some do botão
(vira `aria`/subtítulo discreto, não dois textos empilhados). O chip "Minha loja" fica.

**Rotas:** renomear pastas `corrigir → decidir`, `blindar → comprar`. Atualizar
`src/lib/navigation.ts` (fonte única), todos os `Link` (landing, dashboard, avisos) e
o redirect `/app`. Mover o conteúdo do painel de `/app/dashboard` para `/app` e tornar
"Início" a raiz do produto (elimina o redirect e a rota `/dashboard` extra).

`src/lib/navigation.ts` é a fonte única — o `tipo Camada` ganha campo `passo: 1|2|3` e
`legenda`. Tudo (nav, stepper, landing, próximos-passos) lê dali.

## B. Trilha guiada (fio condutor)

1. **Stepper** (`<Trilha>`, componente novo) sempre visível no topo das telas do
   produto: `① Descobrir → ② Decidir → ③ Comprar`. Marca passo atual, passos
   concluídos e o próximo. Lê de `navigation.ts`. Some na tela de onboarding e no Início
   (lá ele aparece em versão expandida, ver abaixo).
2. **Início** vira o ponto de partida didático:
   - Uma linha por passo explicando em português simples o que cada um faz.
   - **Status da jornada:** perfil completo? (passo 0), e um CTA único e grande
     **"Começar pelo passo 1 → Descobrir"** (ou "Complete seu perfil" se faltar).
   - Mantém um resumo enxuto do que hoje são os KPIs/participações, mas subordinado à
     trilha — a trilha é o herói da tela, não os números soltos.
3. **Próximo passo:** cada tela do produto termina com um bloco/link
   **"Próximo passo → [nome]"**. Componente reutilizável `<ProximoPasso>` que deriva o
   próximo de `navigation.ts` pelo passo atual.
4. **Perfil = passo 0:** onboarding é apresentado como pré-requisito. `AvisoPerfil`
   passa a falar a língua da trilha ("complete seu perfil para personalizar a trilha").

## C. Mudanças tela a tela

Todas mantêm seus componentes e dados atuais; muda hierarquia, cópia e o cabeçalho.

- **`CamadaHeader`** vira didático: passa a receber `passo`, `legenda`, e três frases
  curtas fixas — **O que é · Por que importa · O que fazer aqui** — renderizadas como um
  mini-explicador (pode ser colapsável, aberto por padrão). Substitui o parágrafo
  denso atual. Some o nome-método grandão; vira legenda.

- **① Descobrir tendências:** mantém feed (`SinalCard`) e filtros, mas:
  - Cabeçalho didático novo (o que é sinal, por que não é previsão, o que fazer).
  - Filtros simplificados visualmente (menos chips competindo; "só do meu nicho" claro).
  - `<ProximoPasso → Decidir>` no fim.

- **② Decidir o que comprar:** mantém `PecaDecisaoCard` e o motor, mas a cópia do card
  enfatiza leitura humana: o score vem acompanhado de "**compre ~X peças** porque [os 3
  motivos]". Deixa explícito que o número é determinístico, não palpite. `<ProximoPasso →
  Comprar>` no fim.

- **③ Comprar com método:** mantém pré-venda + compra coletiva, mas cada seção ganha
  uma frase de abertura em português simples e honesto (sem promessa): "Reserve antes de
  pagar — só fecha o lote se a demanda aparecer" / "Junte pedido com outras lojas para
  furar o lote mínimo sem expor todo o caixa". É o fim da trilha → bloco "voltar ao
  Início / ver resumo".

## D. Landing

Mantém estética (foto, paleta, serifada, ticker). Ajustes de clareza:

- A seção "Como funciona" (`PASSOS`) passa a usar os **nomes diretos novos** e a mesma
  ordem ①②③, para landing e produto falarem a mesma língua. Remove o rótulo duplo
  `rotulo · camada`.
- Revisar toda a cópia contra a **regra de linguagem** (a landing já está boa nisso, mas
  conferir "blindar o caixa" etc. — manter só onde for claramente metáfora de método).
- Os `Link href="/app/descobrir"` e `/app/corrigir` → atualizar para rotas novas
  (`/app/descobrir`, `/app/decidir`).
- Hierarquia: garantir que o caminho 1→2→3 seja visualmente óbvio na seção.

## E. Componentes afetados (resumo)

- **Novos:** `Trilha` (stepper), `ProximoPasso`.
- **Alterados:** `navigation.ts` (+passo/legenda), `SiteNav` (nome único + stepper no
  layout), `CamadaHeader` (modo didático), `AvisoPerfil` (linguagem de trilha), landing
  `page.tsx` (PASSOS + links), dashboard→Início `page.tsx` (reorganizado), as 3 páginas
  do produto (cabeçalho + próximo passo + rotas).
- **Rotas:** `app/dashboard → app` (raiz), `corrigir → decidir`, `blindar → comprar`.

## F. Validação

- Conforme memória do projeto: **validar com `tsc` + `eslint`** por fatia; **não rodar
  `next build`** (quebra o cache do `next dev`). Conferir visualmente no `localhost`.
- Motor não muda → testes do Vitest devem continuar passando sem alteração.

## Não-objetivos (YAGNI)

- Nada de tour interativo/overlay (descartado no brainstorming).
- Nada de mudança de paleta/fontes/estética.
- Nada de backend, auth ou persistência nova.
- Nada de refatorar o motor ou os dados-semente.
