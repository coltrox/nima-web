import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  PawPrint,
  Heart,
  ClipboardList,
  Sparkles,
  FileCheck2,
  BookOpenText,
  Nfc,
  MapPin,
  Bell,
  Utensils,
  Stethoscope,
  ArrowRight,
  Check,
  Undo2,
  Scale,
  HelpCircle,
  PiggyBank,
  Users,
  Map as MapIcon,
  Clock,
  BadgeCheck,
  ShieldCheck,
  Lock,
  HeartHandshake,
  Smartphone,
  ChevronDown,
  RotateCcw,
  Minus,
  Dog,
  Syringe,
  GraduationCap,
  Phone,
  AlertTriangle,
  ScanLine,
  Zap,
  Home,
  Mail,
  Globe,
  AtSign,
  ArrowUp,
  FileText,
} from 'lucide-react';

import * as S from './styles';
import { EMPRESA, PRODUTO } from '../../config/empresa';
import { Contador, Esteira, Flutua, Manchas, Reveal, RevealStack } from './anim';
import { useParallaxSuave, usePonteiro } from './motion';

/* Anel de afinidade — a assinatura visual da página */
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ---------------------------------------------------------------- */
/* Dados do simulador de match                                       */
/* ---------------------------------------------------------------- */

const PERGUNTAS = [
  {
    id: 'casa',
    titulo: 'Onde você mora?',
    opcoes: [
      { id: 'apto', texto: 'Apartamento', icone: Home },
      { id: 'quintal', texto: 'Casa com quintal', icone: Home },
    ],
  },
  {
    id: 'tempo',
    titulo: 'Quanto tempo o pet ficaria sozinho?',
    opcoes: [
      { id: 'curto', texto: 'Até 4h', icone: Clock },
      { id: 'medio', texto: '6 a 8h', icone: Clock },
      { id: 'longo', texto: 'Mais de 8h', icone: Clock },
    ],
  },
  {
    id: 'energia',
    titulo: 'Quanto você quer se mexer junto?',
    opcoes: [
      { id: 'muita', texto: 'Passeio todo dia', icone: Zap },
      { id: 'pouca', texto: 'Rotina tranquila', icone: Heart },
    ],
  },
];

const PETS = [
  {
    id: 'bidu',
    nome: 'Bidu, 2 anos',
    sub: 'Vira-lata caramelo · porte médio',
    foto: '/pets/bidu1.jpg',
    base: 58,
    pesos: { apto: -8, quintal: 20, curto: 12, medio: 2, longo: -16, muita: 18, pouca: -12 },
    pros: ['Energia alta: devolve cada minuto de passeio', 'Castrado, vacinado e já convive com crianças'],
    atencao: 'Precisa de uns 40 minutos de rua por dia para não dar trabalho em casa.',
  },
  {
    id: 'mel',
    nome: 'Mel, 4 anos',
    sub: 'SRD pequena · porte pequeno',
    foto: null,
    base: 66,
    pesos: { apto: 16, quintal: 6, curto: 8, medio: 8, longo: -6, muita: 2, pouca: 12 },
    pros: ['Porte pequeno, adaptada a apartamento', 'Calma com visita e com criança'],
    atencao: 'Late quando fica muito tempo sozinha — pede vizinhança paciente.',
  },
  {
    id: 'nina',
    nome: 'Nina, 3 anos',
    sub: 'Gata SRD · independente',
    foto: null,
    base: 62,
    pesos: { apto: 18, quintal: 0, curto: 2, medio: 8, longo: 14, muita: -14, pouca: 18 },
    pros: ['Lida bem com longas horas sozinha', 'Não precisa de passeio na rua'],
    atencao: 'Exige janelas com rede de proteção antes de ir para casa.',
  },
];

function calcularMatch(respostas) {
  const escolhas = Object.values(respostas);

  const ranking = PETS.map((pet) => {
    const bruto = escolhas.reduce((soma, op) => soma + (pet.pesos[op] || 0), pet.base);
    return { pet, score: Math.max(42, Math.min(98, Math.round(bruto))) };
  }).sort((a, b) => b.score - a.score);

  return ranking[0];
}

/* ---------------------------------------------------------------- */
/* Catálogo em abas — a área "Meu Pet"                               */
/* ---------------------------------------------------------------- */

const ABAS = [
  {
    id: 'raca',
    rotulo: 'Guia da raça',
    icone: Dog,
    titulo: 'O que esperar de quem acabou de chegar.',
    texto:
      'Temperamento, pelagem, gasto energético e convivência — o que ninguém explicou antes do sim, agora explicado antes do primeiro problema.',
    itens: [
      { t: 'Temperamento', d: 'Como ele reage a visita, barulho e outros animais.' },
      { t: 'Gasto energético', d: 'Quanto de passeio e brincadeira ele realmente pede.' },
      { t: 'Pelagem e banho', d: 'Frequência de escovação, queda de pelo e tosa.' },
      { t: 'Convivência', d: 'O que observar com crianças, idosos e outros pets.' },
    ],
  },
  {
    id: 'nutri',
    rotulo: 'Nutrição',
    icone: Utensils,
    titulo: 'A ração certa para a idade e o porte dele.',
    texto:
      'Sugestões de alimentação que mudam junto com o animal — filhote, adulto e idoso não comem a mesma coisa, nem na mesma quantidade.',
    itens: [
      { t: 'Porção por dia', d: 'Quantidade por peso, porte e fase da vida.' },
      { t: 'Troca de fase', d: 'Aviso de quando migrar de filhote para adulto.' },
      { t: 'Restrições', d: 'O que evitar quando há alergia ou condição de saúde.' },
      { t: 'Petiscos', d: 'Quanto cabe por dia sem desequilibrar a dieta.' },
    ],
  },
  {
    id: 'saude',
    rotulo: 'Saúde',
    icone: Syringe,
    titulo: 'Vacina, vermífugo e retorno sem depender da memória.',
    texto:
      'O cronograma nasce da idade e do histórico que a ONG já registrou — e os lembretes chegam antes da data, não depois.',
    itens: [
      { t: 'Carteira digital', d: 'Todas as doses no celular, prontas para o veterinário.' },
      { t: 'Lembretes', d: 'Aviso antes de cada vacina, dose e retorno.' },
      { t: 'Vermífugo', d: 'Intervalos conforme peso e idade do animal.' },
      { t: 'Histórico', d: 'O que a ONG já aplicou antes de você adotar.' },
    ],
  },
  {
    id: 'adestra',
    rotulo: 'Adestramento',
    icone: GraduationCap,
    titulo: 'As primeiras semanas são as que decidem.',
    texto:
      'Tutoriais curtos de adestramento básico e enriquecimento ambiental, na ordem em que os problemas costumam aparecer.',
    itens: [
      { t: 'Adaptação', d: 'O roteiro dos primeiros sete dias em casa.' },
      { t: 'Comandos base', d: 'Senta, fica e vem, em sessões de cinco minutos.' },
      { t: 'Xixi no lugar', d: 'Como reduzir o acidente em casa sem punição.' },
      { t: 'Enriquecimento', d: 'Brinquedo e desafio para gastar energia dentro de casa.' },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* Perguntas frequentes                                              */
/* ---------------------------------------------------------------- */

const FAQ = [
  {
    q: 'A Nima cobra alguma coisa para adotar?',
    a: 'Não. O app é gratuito para adotantes e para ONGs — quiz, feed por afinidade, candidatura e a área "Meu Pet" não têm custo. A Patinha, a Smart Tag de coleira, é o único item pago e é totalmente opcional.',
  },
  {
    q: 'A Patinha é um rastreador GPS?',
    a: 'Não, e é importante deixar claro: ela não emite sinal nem tem bateria. Quando alguém aproxima o celular do pingente NFC ou aponta a câmera para o QR Code, a ficha pública abre e o tutor recebe o local daquela leitura, com data e hora. Ela mostra onde o pet foi encontrado, não onde ele está agora.',
  },
  {
    q: 'Quem encontrar meu pet precisa instalar algo?',
    a: 'Nada. Sem app, sem cadastro, sem ligar para ninguém: a ficha abre direto no navegador do celular, com o nome do pet, o contato do tutor e a carteira de vacinação.',
  },
  {
    q: 'Como a IA decide o match?',
    a: 'Ela cruza o que você respondeu sobre a sua rotina com o perfil que a ONG mantém do animal — energia, sociabilidade, histórico de saúde e observações de quem convive com ele. O resultado é uma nota de afinidade com os pontos de atenção sempre visíveis, inclusive os desfavoráveis. A decisão final continua sendo da ONG.',
  },
  {
    q: 'Minha ONG precisa assinar um plano?',
    a: 'Não. O cadastro é gratuito e passa por uma homologação antes de o painel liberar: cadastro de animais, prontuário, candidaturas, vaquinha por PIX e vagas de voluntariado.',
  },
  {
    q: 'O que acontece com os meus dados?',
    a: 'As suas respostas viram um dossiê que vai apenas para a ONG responsável pelo animal que você escolheu, dentro das diretrizes da LGPD. Nada disso fica público na sua ficha nem é vendido a terceiros.',
  },
];

/* ================================================================ */

export default function Landing() {
  const [videoOk, setVideoOk] = useState(true);
  const [respostas, setRespostas] = useState({});
  const [aba, setAba] = useState(ABAS[0].id);
  const [scan, setScan] = useState({ estado: 'idle', hora: null });
  const [aberta, setAberta] = useState(0);

  const heroRef = useRef(null);
  const cardY = useParallaxSuave(heroRef, 36);
  const ponteiro = usePonteiro(6);

  const respondidas = Object.keys(respostas).length;
  const completo = respondidas === PERGUNTAS.length;
  const match = useMemo(
    () => (respondidas ? calcularMatch(respostas) : null),
    [respostas, respondidas],
  );

  const abaAtiva = ABAS.find((a) => a.id === aba) || ABAS[0];

  const responder = (perguntaId, opcaoId) =>
    setRespostas((prev) => ({ ...prev, [perguntaId]: opcaoId }));

  const lerPatinha = () => {
    setScan({ estado: 'lendo', hora: null });
    window.setTimeout(
      () =>
        setScan({
          estado: 'ficha',
          hora: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }),
      850,
    );
  };

  return (
    <S.Page>
      {/* --------------------------- NAVBAR --------------------------- */}
      <S.Nav>
        <S.NavInner as="div">
          <S.Brand href="#topo" aria-label="Nima — início">
            <S.BrandImg src="/nima-logo-trim.png" alt="Nima" />
          </S.Brand>

          <S.NavLinks>
            <S.NavLink href="#desafio">O desafio</S.NavLink>
            <S.NavLink href="#solucao">A solução</S.NavLink>
            <S.NavLink href="#match">Simular match</S.NavLink>
            <S.NavLink href="#cuidado">Meu Pet</S.NavLink>
            <S.NavLink href="#tag">Patinha</S.NavLink>
            <S.NavLink href="#ongs">Para ONGs</S.NavLink>
          </S.NavLinks>

          <S.NavActions>
            <S.NavBtn as={Link} to="/login">
              Entrar no painel
            </S.NavBtn>
          </S.NavActions>
        </S.NavInner>
      </S.Nav>

      {/* ------------------------- 1. HERO -------------------------- */}
      <S.Hero id="topo" ref={heroRef}>
        <Manchas
          pontos={[
            { size: 420, color: 'rgba(1, 81, 200, 0.12)', top: '-120px', left: '-80px', speed: '18s' },
            { size: 360, color: 'rgba(255, 194, 75, 0.2)', bottom: '-140px', right: '-60px', speed: '22s' },
          ]}
        />

        <S.HeroGrid as="div">
          <S.Layer>
            <Reveal>
              <S.Tag>
                <PawPrint size={14} strokeWidth={2.5} />
                Adoção inteligente
              </S.Tag>
            </Reveal>

            <Reveal delay={0.08}>
              <S.HeroTitle>
                Conexões que <em>duram</em> entre pets e lares de verdade.
              </S.HeroTitle>
            </Reveal>

            <Reveal delay={0.16}>
              <S.HeroText>
                A Nima é um <strong>aplicativo</strong> de adoção que usa inteligência artificial
                para conectar cães e gatos a lares compatíveis com a sua rotina — e continua do
                seu lado depois do sim.
              </S.HeroText>
            </Reveal>

            <Reveal delay={0.24}>
              <S.HeroCtas>
                <S.BtnPrimary href="#match" $lg>
                  Simular meu match
                  <ArrowRight size={18} />
                </S.BtnPrimary>
                <S.BtnGhost href="#ongs" $lg>
                  Sou de uma ONG
                </S.BtnGhost>
              </S.HeroCtas>
            </Reveal>

            <Reveal delay={0.32}>
              <S.HeroStats>
                <div>
                  <strong>
                    <Contador to={5} duration={1.1} /> min
                  </strong>
                  <span>é o quiz que destrava o feed por afinidade</span>
                </div>
                <div>
                  <strong>
                    <Contador to={30} duration={1.6} prefix="+" /> mi
                  </strong>
                  <span>de animais abandonados no Brasil, em estimativas</span>
                </div>
                <div>
                  <strong>R$ 0</strong>
                  <span>para adotar e para a ONG parceira usar o painel</span>
                </div>
              </S.HeroStats>
            </Reveal>

            <Reveal delay={0.4}>
              <S.HeroNote>
                <Smartphone size={16} strokeWidth={2.5} />
                A adoção acontece no <strong>app Nima</strong> — gratuito para adotantes e ONGs.
              </S.HeroNote>
            </Reveal>
          </S.Layer>

          <S.HeroStage>
            <S.ChipSlot>
              <Flutua distancia={9} duration={6.5}>
                <S.FloatChip as="div" $static>
                  <ClipboardList size={20} />
                  <div>
                    <strong>Quiz respondido</strong>
                    <span>perfil e estilo de vida analisados pela IA</span>
                  </div>
                </S.FloatChip>
              </Flutua>
            </S.ChipSlot>

            <motion.div style={{ y: cardY, zIndex: 1 }}>
              <motion.div {...ponteiro.handlers} style={ponteiro.style}>
                <S.MatchCard aria-label="Exemplo de pet compatível">
                  <S.MatchPhoto>
                    <S.MatchBadge>
                      <MapPin size={13} /> ONG Patas Unidas · 4 km
                    </S.MatchBadge>
                    <img src="/pets/bidu1.jpg" alt="Bidu, um vira-lata caramelo" />
                  </S.MatchPhoto>

                  <S.MatchBody>
                    <div>
                      <h3>Bidu, 2 anos</h3>
                      <p>Vira-lata caramelo · porte médio</p>
                    </div>

                    <AnelMatch score={95} />
                  </S.MatchBody>

                  <S.MatchTraits>
                    <li>Energia alta</li>
                    <li>Combina com apartamento</li>
                    <li>Ama criança</li>
                    <li>Já castrado</li>
                  </S.MatchTraits>
                </S.MatchCard>
              </motion.div>
            </motion.div>

            <Flutua
              distancia={13}
              duration={7.5}
              delay={1.2}
              style={{ position: 'absolute', bottom: '14px', right: '-24px', zIndex: 2 }}
            >
              <S.FloatChip as="div" $static>
                <Nfc size={20} />
                <div>
                  <strong>Patinha lida hoje, 18h42</strong>
                  <span>Praça Central · 900 m de casa</span>
                </div>
              </S.FloatChip>
            </Flutua>
          </S.HeroStage>
        </S.HeroGrid>
      </S.Hero>

      {/* ------------------------ 2. ESTEIRA ------------------------ */}
      <S.Belt>
        <S.BeltLabel>Tudo que vive dentro do ecossistema Nima</S.BeltLabel>
        <Esteira speed="42s">
          <S.EsteiraChip>
            <Sparkles size={16} /> Match por afinidade
          </S.EsteiraChip>
          <S.EsteiraChip>
            <ClipboardList size={16} /> Quiz de rotina
          </S.EsteiraChip>
          <S.EsteiraChip>
            <FileCheck2 size={16} /> Dossiê para a ONG
          </S.EsteiraChip>
          <S.EsteiraChip>
            <BookOpenText size={16} /> Guia da raça
          </S.EsteiraChip>
          <S.EsteiraChip>
            <Utensils size={16} /> Guia nutricional
          </S.EsteiraChip>
          <S.EsteiraChip>
            <Syringe size={16} /> Carteira de vacinação
          </S.EsteiraChip>
          <S.EsteiraChip>
            <Bell size={16} /> Lembretes de cuidado
          </S.EsteiraChip>
          <S.EsteiraChip>
            <Nfc size={16} /> Patinha NFC + QR
          </S.EsteiraChip>
          <S.EsteiraChip>
            <PiggyBank size={16} /> Vaquinha por PIX
          </S.EsteiraChip>
          <S.EsteiraChip>
            <Users size={16} /> Vagas de voluntariado
          </S.EsteiraChip>
          <S.EsteiraChip>
            <MapIcon size={16} /> ONGs no mapa
          </S.EsteiraChip>
          <S.EsteiraChip>
            <ShieldCheck size={16} /> Dados sob a LGPD
          </S.EsteiraChip>
        </Esteira>
      </S.Belt>

      {/* --------------- 3. FAIXA ESCURA COM NÚMEROS --------------- */}
      <S.MetricBand id="numeros">
        <Manchas
          pontos={[
            { size: 380, color: 'rgba(255, 194, 75, 0.14)', top: '-160px', left: '12%', speed: '20s' },
            { size: 320, color: 'rgba(1, 81, 200, 0.26)', bottom: '-150px', right: '8%', speed: '24s' },
          ]}
        />
        <S.MetricGrid>
          <RevealStack>
            <S.Metric>
              <strong>
                <Contador to={30} duration={1.8} prefix="+" /> mi
              </strong>
              <span>de animais abandonados no Brasil, segundo estimativas.</span>
            </S.Metric>

            <S.Metric>
              <strong>
                até <Contador to={20} duration={1.5} />%
              </strong>
              <span>das adoções terminam em devolução por incompatibilidade de rotina.</span>
            </S.Metric>

            <S.Metric>
              <strong>
                <Contador to={5} duration={1.1} /> min
              </strong>
              <span>é o que o quiz leva para a IA entender o seu estilo de vida.</span>
            </S.Metric>

            <S.Metric>
              <strong>
                <Contador to={100} duration={1.7} />%
              </strong>
              <span>gratuito para quem adota e para a ONG que cuida.</span>
            </S.Metric>
          </RevealStack>
        </S.MetricGrid>
      </S.MetricBand>

      {/* --------------------- 4. POR QUE EXISTE --------------------- */}
      <S.Section id="desafio" $paper>
        <S.Wrap>
          <Reveal>
            <S.SectionHead>
              <S.Tag>
                <Undo2 size={14} strokeWidth={2.5} />
                O desafio da adoção
              </S.Tag>
              <S.H2>
                Amar não basta quando a <em>rotina não combina</em>.
              </S.H2>
              <S.Lead>
                A maior causa de devolução não é falta de amor — é incompatibilidade. A Nima
                existe para atacar isso na raiz, antes do primeiro encontro.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.Pains>
            <RevealStack>
              <S.Card>
                <S.IconBox $navy>
                  <Undo2 size={26} />
                </S.IconBox>
                <h3>Devolução e abandono</h3>
                <p>Altos índices de pets devolvidos às ONGs pouco tempo depois da adoção.</p>
              </S.Card>

              <S.Card>
                <S.IconBox $navy>
                  <Scale size={26} />
                </S.IconBox>
                <h3>Expectativas desalinhadas</h3>
                <p>O adotante imagina um pet; a realidade do dia a dia acaba sendo outra.</p>
              </S.Card>

              <S.Card>
                <S.IconBox $navy>
                  <HelpCircle size={26} />
                </S.IconBox>
                <h3>Necessidades desconhecidas</h3>
                <p>Raça, dieta e gasto energético que ninguém explicou antes do sim.</p>
              </S.Card>
            </RevealStack>
          </S.Pains>
        </S.Wrap>
      </S.Section>

      {/* -------------------- 5. COMO FUNCIONA -------------------- */}
      <S.Section id="solucao">
        <S.Wrap>
          <Reveal>
            <S.SectionHead>
              <S.Tag>
                <Sparkles size={14} strokeWidth={2.5} />
                Nossa solução: IA e conexão
              </S.Tag>
              <S.H2>
                Um formulário. Uma IA. <em>O match certo.</em>
              </S.H2>
              <S.Lead>
                Você conta sua rotina, a nossa IA entende o seu estilo de vida e busca os pets que
                realmente combinam com você — por afinidade, não por ordem de chegada.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.Steps>
            <RevealStack>
              <S.Step>
                <span className="num" />
                <h3>Conte sua rotina</h3>
                <p>
                  Um questionário sobre casa, horários, energia e experiência com animais. Leva
                  cerca de 5 minutos.
                </p>
              </S.Step>

              <S.Step>
                <span className="num" />
                <h3>Veja quem combina</h3>
                <p>
                  O feed mostra os pets disponíveis ordenados pela pontuação de afinidade com o
                  seu perfil.
                </p>
              </S.Step>

              <S.Step>
                <span className="num" />
                <h3>Envie sua candidatura</h3>
                <p>
                  Suas respostas viram um dossiê que vai direto para a ONG responsável, dentro das
                  regras da LGPD.
                </p>
              </S.Step>

              <S.Step>
                <span className="num" />
                <h3>Leve o guia pra casa</h3>
                <p>
                  Adoção aprovada, o app monta o plano de cuidado da raça e da idade do seu novo
                  companheiro.
                </p>
              </S.Step>
            </RevealStack>
          </S.Steps>

          <Reveal>
            <S.SectionHead $center style={{ margin: '72px 0 56px' }}>
              <S.Tag>
                <FileCheck2 size={14} strokeWidth={2.5} />
                Dentro do cálculo
              </S.Tag>
              <S.H2>O que a IA cruza antes de sugerir um pet</S.H2>
              <S.Lead>
                Três camadas de informação viram uma nota — e a nota nunca aparece sozinha, sempre
                com o motivo.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.CardGrid $cols={3}>
            <RevealStack>
              <S.Card>
                <S.IconBox>
                  <ClipboardList size={26} />
                </S.IconBox>
                <h3>A sua rotina</h3>
                <p>
                  Espaço disponível, horas fora de casa, crianças, outros animais, disposição para
                  caminhadas e experiência como tutor.
                </p>
              </S.Card>

              <S.Card>
                <S.IconBox $honey>
                  <PawPrint size={26} />
                </S.IconBox>
                <h3>O jeito dele</h3>
                <p>
                  Energia, sociabilidade, histórico de saúde e observações da ONG que convive com o
                  animal todos os dias.
                </p>
              </S.Card>

              <S.Card>
                <S.IconBox>
                  <FileCheck2 size={26} />
                </S.IconBox>
                <h3>A pontuação</h3>
                <p>
                  Os dois perfis se cruzam e viram uma nota de afinidade, com os pontos de atenção
                  sempre visíveis — inclusive os desfavoráveis.
                </p>
              </S.Card>
            </RevealStack>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* ---------------- 6. INTERATIVA: SIMULAR MATCH ---------------- */}
      <S.Section id="match" $paper>
        <S.Wrap>
          <Reveal>
            <S.SectionHead $center>
              <S.Tag>
                <Sparkles size={14} strokeWidth={2.5} />
                Experimente agora
              </S.Tag>
              <S.H2>
                Três perguntas e você já vê <em>como funciona</em>.
              </S.H2>
              <S.Lead>
                Esta é uma versão reduzida do quiz, aqui no site, sem conta. No app são cerca de
                cinco minutos de perguntas — e o feed inteiro reordenado por afinidade.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <Reveal delay={0.1}>
            <S.QuizGrid>
              <S.QuizCard>
                {PERGUNTAS.map((pergunta) => (
                  <S.QuizQuestion key={pergunta.id}>
                    <legend>{pergunta.titulo}</legend>
                    <S.QuizOptions>
                      {pergunta.opcoes.map((opcao) => {
                        const Icone = opcao.icone;
                        const ativa = respostas[pergunta.id] === opcao.id;
                        return (
                          <S.QuizOption
                            key={opcao.id}
                            type="button"
                            $on={ativa}
                            aria-pressed={ativa}
                            onClick={() => responder(pergunta.id, opcao.id)}
                          >
                            <Icone size={15} strokeWidth={2.4} />
                            {opcao.texto}
                          </S.QuizOption>
                        );
                      })}
                    </S.QuizOptions>
                  </S.QuizQuestion>
                ))}

                {respondidas > 0 && (
                  <S.QuizReset type="button" onClick={() => setRespostas({})}>
                    <RotateCcw size={15} />
                    Recomeçar
                  </S.QuizReset>
                )}
              </S.QuizCard>

              <S.QuizResult aria-live="polite">
                {match ? (
                  <>
                    <S.QuizResultHead>
                      <S.QuizPhoto>
                        {match.pet.foto ? (
                          <img src={match.pet.foto} alt={match.pet.nome} />
                        ) : (
                          <PawPrint size={28} />
                        )}
                      </S.QuizPhoto>

                      <div>
                        <h3>{match.pet.nome}</h3>
                        <p>{match.pet.sub}</p>
                      </div>

                      <AnelMatch score={match.score} light />
                    </S.QuizResultHead>

                    <S.QuizWhy>
                      {match.pet.pros.map((pro) => (
                        <li key={pro} data-kind="pro">
                          <Check size={16} strokeWidth={3} />
                          <span>{pro}</span>
                        </li>
                      ))}
                      <li data-kind="atencao">
                        <AlertTriangle size={16} strokeWidth={2.6} />
                        <span>
                          <strong>Ponto de atenção:</strong> {match.pet.atencao}
                        </span>
                      </li>
                      {!completo && (
                        <li data-kind="atencao">
                          <HelpCircle size={16} strokeWidth={2.6} />
                          <span>
                            Responda as {PERGUNTAS.length - respondidas} perguntas que faltam para
                            a nota fechar.
                          </span>
                        </li>
                      )}
                    </S.QuizWhy>
                  </>
                ) : (
                  <>
                    <S.QuizResultHead>
                      <S.QuizPhoto>
                        <PawPrint size={28} />
                      </S.QuizPhoto>
                      <div>
                        <h3>Seu match aparece aqui</h3>
                        <p>responda a primeira pergunta ao lado</p>
                      </div>
                    </S.QuizResultHead>
                    <S.QuizWhy>
                      <li data-kind="pro">
                        <Check size={16} strokeWidth={3} />
                        <span>A nota muda a cada resposta, como no app.</span>
                      </li>
                      <li data-kind="atencao">
                        <AlertTriangle size={16} strokeWidth={2.6} />
                        <span>
                          Os pontos desfavoráveis aparecem junto — a Nima não esconde o que vai dar
                          trabalho.
                        </span>
                      </li>
                    </S.QuizWhy>
                  </>
                )}
              </S.QuizResult>
            </S.QuizGrid>
          </Reveal>
        </S.Wrap>
      </S.Section>

      {/* ---------------- 7. CATÁLOGO EM ABAS: MEU PET ---------------- */}
      <S.Section id="cuidado">
        <S.Wrap>
          <Reveal>
            <S.SectionHead $center>
              <S.Tag>
                <BookOpenText size={14} strokeWidth={2.5} />
                Pós-adoção: Meu Pet
              </S.Tag>
              <S.H2>
                A adoção é só o <em>começo</em>.
              </S.H2>
              <S.Lead>
                A área "Meu Pet" acompanha o animal pela vida inteira — para evitar o abandono
                tardio, quando a novidade passa e a rotina aperta.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <Reveal delay={0.08}>
            <S.Tabs role="tablist" aria-label="Guias da área Meu Pet">
              {ABAS.map((item) => {
                const Icone = item.icone;
                return (
                  <S.TabBtn
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`aba-${item.id}`}
                    aria-selected={aba === item.id}
                    aria-controls={`painel-${item.id}`}
                    $on={aba === item.id}
                    onClick={() => setAba(item.id)}
                  >
                    <Icone size={16} strokeWidth={2.4} />
                    {item.rotulo}
                  </S.TabBtn>
                );
              })}
            </S.Tabs>
          </Reveal>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={abaAtiva.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <S.TabPanel role="tabpanel" id={`painel-${abaAtiva.id}`} aria-labelledby={`aba-${abaAtiva.id}`}>
                <S.TabIntro>
                  <S.IconBox $honey>
                    <abaAtiva.icone size={26} />
                  </S.IconBox>
                  <h3>{abaAtiva.titulo}</h3>
                  <p>{abaAtiva.texto}</p>
                </S.TabIntro>

                <S.TabItems>
                  {abaAtiva.itens.map((item) => (
                    <li key={item.t}>
                      <Check size={16} strokeWidth={3} />
                      <span>
                        <strong>{item.t}</strong>
                        {item.d}
                      </span>
                    </li>
                  ))}
                </S.TabItems>
              </S.TabPanel>
            </motion.div>
          </AnimatePresence>
        </S.Wrap>
      </S.Section>

      {/* ------------------------- 8. O APP ------------------------- */}
      <S.Section id="app" $paper>
        <Reveal>
          <S.AppStrip>
            <div>
              <S.OngTag>
                <Smartphone size={14} strokeWidth={2.5} />
                Nima é um app
              </S.OngTag>
              <h2>
                Tudo isso acontece <em>no seu celular</em>.
              </h2>
              <p>
                Quiz, feed por afinidade, candidatura, área "Meu Pet" e a Patinha: a adoção
                inteira vive no <strong>aplicativo Nima</strong>. Aqui no site ficam a vitrine e
                os painéis das ONGs e da administração.
              </p>
            </div>

            <S.AppPhone>
              <Flutua distancia={10} duration={5.5}>
                <div className="disc">
                  <Smartphone size={64} strokeWidth={1.4} />
                </div>
              </Flutua>
              <S.AppBadges>
                <S.AppBadge>
                  Google Play <span>· em breve</span>
                </S.AppBadge>
                <S.AppBadge>
                  App Store <span>· em breve</span>
                </S.AppBadge>
              </S.AppBadges>
            </S.AppPhone>
          </S.AppStrip>
        </Reveal>
      </S.Section>

      {/* ------------- 9. INTERATIVA: PATINHA (SMART TAG) ------------- */}
      <S.Section id="tag">
        <S.Wrap>
          <Reveal>
            <S.SectionHead>
              <S.Tag>
                <Nfc size={14} strokeWidth={2.5} />
                Patinha — a Smart Tag
              </S.Tag>
              <S.H2>
                Uma plaquinha na coleira. <em>Um caminho de volta.</em>
              </S.H2>
              <S.Lead>
                Quem encontrar o pet só aproxima o celular — sem app, sem cadastro, sem ligar para
                ninguém. Toque na tela abaixo para ver exatamente o que essa pessoa veria.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.ScanGrid>
            <Reveal>
              <S.Phone>
                <S.PhoneScreen>
                  {scan.estado === 'ficha' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                      <S.ScanSheet>
                        <S.ScanTop>
                          <img src="/pets/bidu1.jpg" alt="Bidu, um vira-lata caramelo" />
                        </S.ScanTop>

                        <S.ScanBody>
                          <h4>Bidu</h4>
                          <p>Vira-lata caramelo · 2 anos · porte médio</p>

                          <S.ScanAlert>
                            <Check size={15} strokeWidth={3} />
                            Tutor avisado às {scan.hora} com a localização desta leitura.
                          </S.ScanAlert>

                          <S.ScanRow>
                            <Phone size={14} />
                            <span>
                              <strong>Tutor · Marina S.</strong>
                              (11) 9 ••••-4417 · toque para ligar
                            </span>
                          </S.ScanRow>

                          <S.ScanRow>
                            <MapPin size={14} />
                            <span>
                              <strong>Lida agora</strong>
                              Praça Central · 900 m da casa dele
                            </span>
                          </S.ScanRow>

                          <S.ScanRow>
                            <Syringe size={14} />
                            <span>
                              <strong>Vacinação em dia</strong>
                              V10 e antirrábica · reforço em 03/2027
                            </span>
                          </S.ScanRow>

                          <S.ScanRow>
                            <Stethoscope size={14} />
                            <span>
                              <strong>Castrado</strong>
                              sem medicação de uso contínuo
                            </span>
                          </S.ScanRow>

                          <S.ScanAgain type="button" onClick={() => setScan({ estado: 'idle', hora: null })}>
                            <RotateCcw size={14} />
                            Ler de novo
                          </S.ScanAgain>
                        </S.ScanBody>
                      </S.ScanSheet>
                    </motion.div>
                  ) : (
                    <S.ScanIdle type="button" onClick={lerPatinha} disabled={scan.estado === 'lendo'}>
                      <motion.span
                        className="alvo"
                        animate={
                          scan.estado === 'lendo'
                            ? { scale: [1, 0.92, 1.04], opacity: [1, 0.7, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          scan.estado === 'lendo'
                            ? { duration: 0.85, ease: 'easeInOut' }
                            : { duration: 0.3 }
                        }
                      >
                        {scan.estado === 'lendo' ? <ScanLine size={44} /> : <Nfc size={48} />}
                      </motion.span>

                      <strong>
                        {scan.estado === 'lendo' ? 'Lendo a Patinha…' : 'Aproxime o celular'}
                      </strong>
                      <span>
                        {scan.estado === 'lendo'
                          ? 'abrindo a ficha pública do pet'
                          : 'toque aqui para simular a leitura do NFC'}
                      </span>
                    </S.ScanIdle>
                  )}
                </S.PhoneScreen>
              </S.Phone>
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <S.TagDisc>
                  {videoOk ? (
                    <video
                      src="/chaveiro.mp4"
                      preload="auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => setVideoOk(false)}
                      aria-label="Patinha, a Smart Tag da Nima, girando"
                    />
                  ) : (
                    <S.TagFallback>
                      <Nfc size={110} strokeWidth={1.2} />
                    </S.TagFallback>
                  )}
                </S.TagDisc>

                <S.TagPoints>
                  <li>
                    <Check size={18} strokeWidth={3} />
                    <span>
                      <strong>Tecnologia dual:</strong> pingente com NFC e QR Code na coleira — um
                      dos dois sempre funciona.
                    </span>
                  </li>
                  <li>
                    <Check size={18} strokeWidth={3} />
                    <span>
                      <strong>Aviso imediato:</strong> ao ser escaneada, envia ao tutor o local
                      daquela leitura, com data e hora.
                    </span>
                  </li>
                  <li>
                    <Check size={18} strokeWidth={3} />
                    <span>
                      <strong>Ficha pública completa:</strong> nome, contato do tutor e a carteira
                      de vacinação digital, direto no navegador.
                    </span>
                  </li>
                  <li>
                    <Check size={18} strokeWidth={3} />
                    <span>
                      <strong>Compra em lote para ONGs:</strong> a ONG adquire Patinhas em
                      quantidade e pode repassá-las a quem adota, virando uma nova fonte de renda
                      para a causa.
                    </span>
                  </li>
                </S.TagPoints>

                <S.HeroCtas>
                  <S.BtnHoney href="#final" $lg>
                    Quero a Patinha do meu pet
                  </S.BtnHoney>
                </S.HeroCtas>
              </div>
            </Reveal>
          </S.ScanGrid>
        </S.Wrap>
      </S.Section>

      {/* ----------------------- 10. PARA ONGs ----------------------- */}
      <S.Section id="ongs" $paper>
        <Reveal>
          <S.OngBox as="div">
            <S.OngHead>
              <div>
                <S.OngTag>
                  <HeartHandshake size={14} strokeWidth={2.5} />
                  Para ONGs e protetores
                </S.OngTag>
                <h2>As ONGs no centro. Menos planilha, mais salvamentos.</h2>
                <p>
                  A Nima devolve tempo e recursos para quem cuida — e coloca a sua ONG na frente de
                  quem realmente quer adotar.
                </p>
              </div>

              <S.HeroCtas>
                <S.BtnHoney as={Link} to="/ong" $lg>
                  Cadastrar minha ONG
                  <ArrowRight size={18} />
                </S.BtnHoney>
              </S.HeroCtas>
            </S.OngHead>

            <S.OngBenefits>
              <S.OngBenefit>
                <span className="ic">
                  <BadgeCheck size={22} />
                </span>
                <strong>Triagem com IA</strong>
                <span>Cada candidatura chega com um dossiê que justifica a compatibilidade. Menos devolução.</span>
              </S.OngBenefit>

              <S.OngBenefit>
                <span className="ic">
                  <PiggyBank size={22} />
                </span>
                <strong>Vaquinhas</strong>
                <span>Divulgue a chave PIX da sua ONG e receba doações diretas dos usuários.</span>
              </S.OngBenefit>

              <S.OngBenefit>
                <span className="ic">
                  <Users size={22} />
                </span>
                <strong>Voluntariado</strong>
                <span>Abra vagas e receba inscrições de voluntários, tudo centralizado num lugar.</span>
              </S.OngBenefit>

              <S.OngBenefit>
                <span className="ic">
                  <MapIcon size={22} />
                </span>
                <strong>Visibilidade</strong>
                <span>Apareça no mapa e no feed dos adotantes próximos de você.</span>
              </S.OngBenefit>

              <S.OngBenefit>
                <span className="ic">
                  <Clock size={22} />
                </span>
                <strong>Mais tempo com os animais</strong>
                <span>Cadastro, prontuário e candidaturas num só painel — sem planilha solta.</span>
              </S.OngBenefit>

              <S.OngBenefit>
                <span className="ic">
                  <Nfc size={22} />
                </span>
                <strong>Smart Tag integrada</strong>
                <span>Vincule a Patinha aos pets e ajude a trazer de volta quem se perder.</span>
              </S.OngBenefit>
            </S.OngBenefits>
          </S.OngBox>
        </Reveal>
      </S.Section>

      {/* ------------------ 11. SEGURANÇA E PRIVACIDADE ------------------ */}
      <S.Section id="seguranca">
        <S.Wrap>
          <Reveal>
            <S.SectionHead $center>
              <S.Tag>
                <ShieldCheck size={14} strokeWidth={2.5} />
                Segurança e privacidade
              </S.Tag>
              <S.H2>Seus dados protegidos, sua tranquilidade garantida.</S.H2>
              <S.Lead>
                Um ambiente seguro e confiável, para adotantes e ONGs, do cadastro à adoção.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.CardGrid $cols={3}>
            <RevealStack>
              <S.Card>
                <S.IconBox>
                  <BadgeCheck size={26} />
                </S.IconBox>
                <h3>Identidade verificada</h3>
                <p>Processo rigoroso de validação de cadastro para um ambiente confiável para todos.</p>
              </S.Card>

              <S.Card>
                <S.IconBox $navy>
                  <ShieldCheck size={26} />
                </S.IconBox>
                <h3>Privacidade total (LGPD)</h3>
                <p>Seguimos as diretrizes da LGPD, tratando seus dados com ética e transparência.</p>
              </S.Card>

              <S.Card>
                <S.IconBox>
                  <Lock size={26} />
                </S.IconBox>
                <h3>Proteção de elite</h3>
                <p>Camadas de criptografia de nível bancário para manter suas informações seguras.</p>
              </S.Card>
            </RevealStack>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* -------------------- 12. FAZ / NÃO FAZ -------------------- */}
      <S.Section id="limites" $paper>
        <S.Wrap>
          <Reveal>
            <S.SectionHead $center>
              <S.Tag>
                <Scale size={14} strokeWidth={2.5} />
                Expectativa alinhada
              </S.Tag>
              <S.H2>O que a Nima faz — e o que ela não faz.</S.H2>
              <S.Lead>
                A página inteira fala de expectativa desalinhada. Seria estranho criar mais uma.
              </S.Lead>
            </S.SectionHead>
          </Reveal>

          <S.CompareGrid>
            <Reveal>
              <S.CompareCol>
                <h3>
                  <span className="ic">
                    <Check size={19} strokeWidth={3} />
                  </span>
                  A Nima faz
                </h3>
                <ul>
                  <li>
                    <Check size={17} strokeWidth={3} />
                    <span>Ordena o feed por afinidade real com a sua rotina, não por data de cadastro.</span>
                  </li>
                  <li>
                    <Check size={17} strokeWidth={3} />
                    <span>Entrega à ONG um dossiê que justifica cada candidatura, com os pontos de atenção.</span>
                  </li>
                  <li>
                    <Check size={17} strokeWidth={3} />
                    <span>Continua depois do sim: guias de raça, dieta, vacina e lembretes de cuidado.</span>
                  </li>
                  <li>
                    <Check size={17} strokeWidth={3} />
                    <span>Abre um caminho de volta com a Patinha, por NFC e QR Code, sem app e sem conta.</span>
                  </li>
                  <li>
                    <Check size={17} strokeWidth={3} />
                    <span>Centraliza o painel da ONG: animais, prontuário, candidaturas, vaquinha e voluntariado.</span>
                  </li>
                </ul>
              </S.CompareCol>
            </Reveal>

            <Reveal delay={0.1}>
              <S.CompareCol $no>
                <h3>
                  <span className="ic">
                    <Minus size={19} strokeWidth={3} />
                  </span>
                  A Nima não faz
                </h3>
                <ul>
                  <li>
                    <Minus size={17} strokeWidth={3} />
                    <span>Não vende animais nem cobra taxa de adoção — adotar é gratuito.</span>
                  </li>
                  <li>
                    <Minus size={17} strokeWidth={3} />
                    <span>A Patinha não é rastreador GPS: ela mostra onde o pet foi lido, não onde ele está agora.</span>
                  </li>
                  <li>
                    <Minus size={17} strokeWidth={3} />
                    <span>Não substitui a entrevista nem a visita da ONG. A decisão final é sempre de quem cuida.</span>
                  </li>
                  <li>
                    <Minus size={17} strokeWidth={3} />
                    <span>Não é clínica veterinária: os guias orientam, não diagnosticam nem receitam.</span>
                  </li>
                  <li>
                    <Minus size={17} strokeWidth={3} />
                    <span>Não expõe seus dados: o dossiê vai só para a ONG responsável pelo animal.</span>
                  </li>
                </ul>
              </S.CompareCol>
            </Reveal>
          </S.CompareGrid>
        </S.Wrap>
      </S.Section>

      {/* ---------------------- 13. PERGUNTAS ---------------------- */}
      <S.Section id="faq">
        <S.Wrap>
          <Reveal>
            <S.SectionHead $center>
              <S.Tag>
                <HelpCircle size={14} strokeWidth={2.5} />
                Perguntas frequentes
              </S.Tag>
              <S.H2>O que todo mundo pergunta antes de baixar.</S.H2>
            </S.SectionHead>
          </Reveal>

          <S.FaqList>
            <RevealStack step={0.06}>
              {FAQ.map((item, i) => {
                const on = aberta === i;
                return (
                  <S.FaqItem key={item.q} $on={on}>
                    <S.FaqQ
                      type="button"
                      $on={on}
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      onClick={() => setAberta(on ? -1 : i)}
                    >
                      {item.q}
                      <ChevronDown size={19} strokeWidth={2.6} />
                    </S.FaqQ>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          id={`faq-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <S.FaqA>
                            <p>{item.a}</p>
                          </S.FaqA>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </S.FaqItem>
                );
              })}
            </RevealStack>
          </S.FaqList>
        </S.Wrap>
      </S.Section>

      {/* -------------------- 14. ORIGEM DO NOME -------------------- */}
      <S.Section id="anima" $paper>
        <S.Wrap>
          <Reveal>
            <S.AnimaPanel>
              <S.OngTag>
                <Heart size={14} strokeWidth={2.5} />
                Origem do nome
              </S.OngTag>
              <h2>
                Do latim, ANIMA: <em>sopro de vida</em>.
              </h2>
              <p>
                Tratamos o pet não como um simples ser, mas como uma vida com personalidade —
                que merece e se conecta com a alma do lar.
              </p>
            </S.AnimaPanel>
          </Reveal>
        </S.Wrap>
      </S.Section>

      {/* ------------------------ 15. FECHO ------------------------ */}
      <S.Cta as="section" id="final">
        <Reveal>
          <S.Tag>
            <Heart size={14} strokeWidth={2.5} />
            Adoção consciente
          </S.Tag>
        </Reveal>
        <Reveal delay={0.08}>
          <h2>Mude uma vida. Comece pela sua rotina.</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p>
            Baixe o app, responda o quiz e veja quem combina com você. Leva menos tempo do que um
            passeio no quarteirão.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <S.CtaButtons>
            <S.BtnPrimary href="#app" $lg>
              <Smartphone size={18} />
              Conhecer o app
            </S.BtnPrimary>
            <S.BtnGhost as={Link} to="/login" $lg>
              Acessar painel da ONG
            </S.BtnGhost>
          </S.CtaButtons>
        </Reveal>
      </S.Cta>

      {/* ------------------------- RODAPÉ ------------------------- */}
      <S.Footer>
        <S.FooterGrid as="div">
          <S.FooterSobre>
            <S.FooterBrand href="#topo">
              <S.FooterLogo src="/nima-logo-white.png" alt={PRODUTO.nome} />
            </S.FooterBrand>
            <p>
              Adoção com afinidade, cuidado depois do sim e um caminho de volta pra casa. Um
              ecossistema para adotantes, tutores e as ONGs que seguram a ponta.
            </p>
            <S.FooterSelos>
              <S.FooterSelo>
                <Heart size={14} strokeWidth={2.6} />
                Gratuito para adotar
              </S.FooterSelo>
              <S.FooterSelo>
                <HeartHandshake size={14} strokeWidth={2.6} />
                Sem taxa para ONGs
              </S.FooterSelo>
              <S.FooterSelo>
                <GraduationCap size={14} strokeWidth={2.6} />
                Projeto de TCC
              </S.FooterSelo>
            </S.FooterSelos>
          </S.FooterSobre>

          <S.FooterCol>
            <h4>O app</h4>
            <a href="#desafio">O desafio</a>
            <a href="#solucao">A solução</a>
            <a href="#match">Simular match</a>
            <a href="#cuidado">Meu Pet</a>
            <a href="#app">Baixar o app</a>
          </S.FooterCol>

          <S.FooterCol>
            <h4>Patinha</h4>
            <a href="#tag">Como funciona</a>
            <a href="#limites">Faz e não faz</a>
            <a href="#seguranca">Segurança e LGPD</a>
            <a href="#faq">Perguntas frequentes</a>
          </S.FooterCol>

          <S.FooterCol>
            <h4>Para ONGs</h4>
            <Link to="/ong">Ser uma ONG parceira</Link>
            <Link to="/ong/registro">Cadastrar minha ONG</Link>
            <Link to="/ong/login">Entrar no painel</Link>
            <a href="#ongs">O que muda no dia a dia</a>
          </S.FooterCol>

          <S.FooterCol>
            <h4>Empresa</h4>
            <S.FooterEmpresa>
              {PRODUTO.nome} é um produto da <strong>{EMPRESA.nome}</strong>.
            </S.FooterEmpresa>

            <S.FooterContato href={EMPRESA.site} target="_blank" rel="noreferrer">
              <Globe size={15} strokeWidth={2.3} />
              {EMPRESA.siteRotulo}
            </S.FooterContato>
            <S.FooterContato href={`mailto:${EMPRESA.email}`}>
              <Mail size={15} strokeWidth={2.3} />
              {EMPRESA.email}
            </S.FooterContato>
            <S.FooterContato href={`mailto:${PRODUTO.email}`}>
              <Mail size={15} strokeWidth={2.3} />
              {PRODUTO.email}
            </S.FooterContato>
            <S.FooterContato href={PRODUTO.instagram} target="_blank" rel="noreferrer">
              <AtSign size={15} strokeWidth={2.3} />
              {PRODUTO.instagramRotulo}
            </S.FooterContato>

            {EMPRESA.telefone && (
              <S.FooterContato href={`tel:${EMPRESA.telefone.replace(/\D/g, '')}`}>
                <Phone size={15} strokeWidth={2.3} />
                {EMPRESA.telefone}
              </S.FooterContato>
            )}
            {EMPRESA.endereco && (
              <S.FooterDado>
                <MapPin size={15} strokeWidth={2.3} />
                {EMPRESA.endereco}
              </S.FooterDado>
            )}
            {EMPRESA.cnpj && (
              <S.FooterDado>
                <FileText size={15} strokeWidth={2.3} />
                CNPJ {EMPRESA.cnpj}
              </S.FooterDado>
            )}

            <h4>Legal</h4>
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
            <a href={`mailto:${PRODUTO.email}?subject=Meus%20dados%20na%20Nima`}>
              Pedir ou apagar meus dados
            </a>
          </S.FooterCol>
        </S.FooterGrid>

        <S.FooterBottom as="div">
          <span>
            © {new Date().getFullYear()} {EMPRESA.nome}. Todos os direitos reservados. ·{' '}
            {PRODUTO.siteRotulo}
          </span>
          <nav>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos</Link>
            <S.AoTopo type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUp size={14} strokeWidth={2.4} />
              Voltar ao topo
            </S.AoTopo>
          </nav>
        </S.FooterBottom>
      </S.Footer>

    </S.Page>
  );
}

/* ---------------------------------------------------------------- */
/* Anel de afinidade — revela o traço quando entra na tela           */
/* ---------------------------------------------------------------- */

function AnelMatch({ score, light = false }) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);
  const Comp = light ? S.RingLight : S.Ring;

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      $circumference={CIRCUMFERENCE}
      $offset={CIRCUMFERENCE * (1 - score / 100)}
      $active={visivel}
    >
      <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
        <circle className="track" cx="42" cy="42" r={RADIUS} />
        <circle className="value" cx="42" cy="42" r={RADIUS} />
      </svg>
      <S.RingLabel>
        <strong>{score}%</strong>
        <span>match</span>
      </S.RingLabel>
    </Comp>
  );
}
