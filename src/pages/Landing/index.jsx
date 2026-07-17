import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

import * as S from './styles';

/* Anel de afinidade — a assinatura visual da página */
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AFFINITY = 95;

/* Revela o anel só quando o cartão entra na tela */
function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Landing() {
  const [cardRef, cardInView] = useInView(0.35);
  const [videoOk, setVideoOk] = useState(true);
  const videoRef = useRef(null);

  const playTag = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState > 0) video.currentTime = 0;
    video.play().catch(() => {});
  };

  const pauseTag = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (video.readyState > 0) video.currentTime = 0;
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

      {/* ---------------------------- HERO ---------------------------- */}
      <S.Hero id="topo">
        <S.HeroGrid as="div">
          <div>
            <S.Tag>
              <PawPrint size={14} strokeWidth={2.5} />
              Adoção inteligente
            </S.Tag>

            <S.HeroTitle>
              Conexões que <em>duram</em> entre pets e lares de verdade.
            </S.HeroTitle>

            <S.HeroText>
              A Nima é um <strong>aplicativo</strong> de adoção que usa inteligência artificial
              para conectar cães e gatos a lares compatíveis com a sua rotina — e continua do
              seu lado depois do sim.
            </S.HeroText>

            <S.HeroCtas>
              <S.BtnPrimary href="#solucao">
                Quero adotar
                <ArrowRight size={18} />
              </S.BtnPrimary>
              <S.BtnGhost href="#ongs">Sou de uma ONG</S.BtnGhost>
            </S.HeroCtas>

            <S.HeroNote>
              <Smartphone size={16} strokeWidth={2.5} />
              A adoção acontece no <strong>app Nima</strong> — gratuito para adotantes e ONGs.
            </S.HeroNote>
          </div>

          <S.HeroStage>
            <S.FloatChip $top="-18px" $left="-14px" $speed="6.5s">
              <ClipboardList size={20} />
              <div>
                <strong>Quiz respondido</strong>
                <span>perfil e estilo de vida analisados pela IA</span>
              </div>
            </S.FloatChip>

            <S.MatchCard ref={cardRef} aria-label="Exemplo de pet compatível">
              <S.MatchPhoto>
                <S.MatchBadge>
                  <MapPin size={13} /> ONG Patas Unidas · 4 km
                </S.MatchBadge>
                <img src="/pets/bidu.jpg" alt="Bidu, um vira-lata caramelo" />
              </S.MatchPhoto>

              <S.MatchBody>
                <div>
                  <h3>Bidu, 2 anos</h3>
                  <p>Vira-lata caramelo · porte médio</p>
                </div>

                <S.Ring
                  $circumference={CIRCUMFERENCE}
                  $offset={CIRCUMFERENCE * (1 - AFFINITY / 100)}
                  $active={cardInView}
                >
                  <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
                    <circle className="track" cx="42" cy="42" r={RADIUS} />
                    <circle className="value" cx="42" cy="42" r={RADIUS} />
                  </svg>
                  <S.RingLabel>
                    <strong>{AFFINITY}%</strong>
                    <span>match</span>
                  </S.RingLabel>
                </S.Ring>
              </S.MatchBody>

              <S.MatchTraits>
                <li>Energia alta</li>
                <li>Combina com apartamento</li>
                <li>Ama criança</li>
                <li>Já castrado</li>
              </S.MatchTraits>
            </S.MatchCard>

            <S.FloatChip $bottom="14px" $right="-24px" $speed="7.5s" $delay="1.2s">
              <Nfc size={20} />
              <div>
                <strong>Patinha lida hoje, 18h42</strong>
                <span>Praça Central · 900 m de casa</span>
              </div>
            </S.FloatChip>
          </S.HeroStage>
        </S.HeroGrid>
      </S.Hero>

      {/* --------------------------- O DESAFIO --------------------------- */}
      <S.Section id="desafio" $paper>
        <S.Wrap>
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

          <S.Pains>
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
          </S.Pains>

          <S.StatBand>
            <S.Stat>
              <strong>+30 mi</strong>
              <span>de animais abandonados no Brasil, segundo estimativas.</span>
            </S.Stat>
            <S.Stat>
              <strong>10–20%</strong>
              <span>das adoções terminam em devolução por incompatibilidade comportamental.</span>
            </S.Stat>
          </S.StatBand>
        </S.Wrap>
      </S.Section>

      {/* ---------------------- NOSSA SOLUÇÃO: IA ---------------------- */}
      <S.Section id="solucao">
        <S.Wrap>
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

          <S.Steps>
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
          </S.Steps>

          <S.SectionHead $center style={{ marginTop: '72px' }}>
            <S.H2>O que a IA cruza antes de sugerir um pet</S.H2>
          </S.SectionHead>

          <S.CardGrid $cols={3}>
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
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* ------------------------ PÓS-ADOÇÃO: MEU PET ------------------------ */}
      <S.Section id="cuidado" $paper>
        <S.Wrap>
          <S.SectionHead>
            <S.Tag>
              <BookOpenText size={14} strokeWidth={2.5} />
              Pós-adoção: Meu Pet
            </S.Tag>
            <S.H2>
              A adoção é só o <em>começo</em>.
            </S.H2>
            <S.Lead>
              A área "Meu Pet" acompanha o animal pela vida inteira — com guias de cuidado para
              evitar o abandono tardio, quando a novidade passa e a rotina aperta.
            </S.Lead>
          </S.SectionHead>

          <S.CardGrid $cols={4}>
            <S.Card>
              <S.IconBox>
                <BookOpenText size={26} />
              </S.IconBox>
              <h3>Guia da raça</h3>
              <p>O que esperar de temperamento, pelagem, exercícios e convivência.</p>
            </S.Card>

            <S.Card>
              <S.IconBox $honey>
                <Utensils size={26} />
              </S.IconBox>
              <h3>Guia nutricional</h3>
              <p>Sugestões de ração por idade, porte e necessidades específicas.</p>
            </S.Card>

            <S.Card>
              <S.IconBox>
                <Stethoscope size={26} />
              </S.IconBox>
              <h3>Cronograma de cuidados</h3>
              <p>Vacinas, vermífugo e retornos, com lembretes antes de cada data.</p>
            </S.Card>

            <S.Card>
              <S.IconBox $honey>
                <Bell size={26} />
              </S.IconBox>
              <h3>Tutoriais de adestramento</h3>
              <p>Adestramento básico, enriquecimento ambiental e avisos que chegam na hora.</p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* ----------------------------- O APP ----------------------------- */}
      <S.Section id="app">
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
            <div className="disc">
              <Smartphone size={64} strokeWidth={1.4} />
            </div>
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
      </S.Section>

      {/* --------------------------- PATINHA (SMART TAG) --------------------------- */}
      <S.Section id="tag">
        <S.TagShowcase as="div">
          <S.TagDisc>
            {videoOk ? (
              <video
                ref={videoRef}
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

          <div>
            <S.Tag>
              <Nfc size={14} strokeWidth={2.5} />
              Patinha — a Smart Tag
            </S.Tag>
            <S.H2>
              Uma plaquinha na coleira. <em>Um caminho de volta.</em>
            </S.H2>
            <S.Lead>
              Segurança inteligente para quem você ama. Quem encontrar o pet só aproxima o
              celular — sem app, sem cadastro, sem ligar para ninguém.
            </S.Lead>

            <S.TagPoints>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Tecnologia dual:</strong> pingente com NFC e QR Code na coleira.
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Localização imediata:</strong> ao ser escaneada, envia a localização
                  em tempo real para o tutor, com data e hora.
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Ficha pública completa:</strong> abre na hora o perfil do pet com nome,
                  contato do tutor e a carteira de vacinação digital.
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Compra em lote para ONGs:</strong> a ONG adquire Patinhas em quantidade
                  para os seus pets — e ainda pode repassá-las a quem adota, virando uma nova fonte
                  de renda para a causa.
                </span>
              </li>
            </S.TagPoints>

            <S.HeroCtas>
              <S.BtnHoney href="#final">Quero a Patinha do meu pet</S.BtnHoney>
            </S.HeroCtas>
          </div>
        </S.TagShowcase>
      </S.Section>

      {/* ----------------------------- PARA ONGs ----------------------------- */}
      <S.Section id="ongs" $paper>
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
              <S.BtnHoney as={Link} to="/ong">
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
      </S.Section>

      {/* ------------------------ SEGURANÇA E PRIVACIDADE ------------------------ */}
      <S.Section id="seguranca">
        <S.Wrap>
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

          <S.CardGrid $cols={3}>
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
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* --------------------------- ORIGEM DO NOME --------------------------- */}
      <S.Section id="anima" $paper>
        <S.Wrap>
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
        </S.Wrap>
      </S.Section>

      {/* ---------------------------- CTA FINAL ---------------------------- */}
      <S.Cta as="section" id="final">
        <S.Tag>
          <Heart size={14} strokeWidth={2.5} />
          Adoção consciente
        </S.Tag>
        <h2>Mude uma vida. Comece pela sua rotina.</h2>
        <p>
          Baixe o app, responda o quiz e veja quem combina com você. Leva menos tempo do que um
          passeio no quarteirão.
        </p>
        <S.CtaButtons>
          <S.BtnPrimary href="#app">
            <Smartphone size={18} />
            Conhecer o app
          </S.BtnPrimary>
          <S.BtnGhost as={Link} to="/login">
            Acessar painel da ONG
          </S.BtnGhost>
        </S.CtaButtons>
      </S.Cta>

      {/* ----------------------------- FOOTER ----------------------------- */}
      <S.Footer>
        <S.FooterGrid as="div">
          <div>
            <S.FooterBrand href="#topo">
              <S.FooterLogo src="/nima-logo-white.png" alt="Nima" />
            </S.FooterBrand>
            <p>
              Adoção com afinidade, cuidado depois do sim e um caminho de volta pra casa. Um
              ecossistema para adotantes, tutores e ONGs.
            </p>
          </div>

          <div>
            <h4>Plataforma</h4>
            <a href="#desafio">O desafio</a>
            <a href="#solucao">A solução</a>
            <a href="#cuidado">Meu Pet</a>
            <a href="#app">O app</a>
            <a href="#tag">Patinha</a>
          </div>

          <div>
            <h4>Para ONGs</h4>
            <Link to="/login">Entrar no painel</Link>
            <a href="#ongs">Ser uma ONG parceira</a>
            <a href="https://instagram.com/adote.nima" target="_blank" rel="noreferrer">
              @adote.nima
            </a>
            <a href="mailto:contato@adotenima.com.br">contato@adotenima.com.br</a>
          </div>
        </S.FooterGrid>

        <S.FooterBottom as="div">
          <span>© {new Date().getFullYear()} Nima · adotenima.com.br</span>
          <span>Projeto acadêmico — Trabalho de Conclusão de Curso</span>
        </S.FooterBottom>
      </S.Footer>
    </S.Page>
  );
}
