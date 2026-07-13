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
  Megaphone,
  QrCode,
  HandHeart,
  ShieldCheck,
  Check,
  Utensils,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';

import * as S from './styles';

/* Anel de afinidade — a assinatura visual da página */
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AFFINITY = 94;

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
            <PawPrint size={24} strokeWidth={2.4} />
            nima.
          </S.Brand>

          <S.NavLinks>
            <S.NavLink href="#adocao">Como adotar</S.NavLink>
            <S.NavLink href="#match">O match</S.NavLink>
            <S.NavLink href="#cuidado">Depois do sim</S.NavLink>
            <S.NavLink href="#tag">Smart Tag</S.NavLink>
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
              Adoção com afinidade
            </S.Tag>

            <S.HeroTitle>
              Um lar certo para ele. Uma <em>rotina que combina</em> com você.
            </S.HeroTitle>

            <S.HeroText>
              A Nima entende o seu dia a dia antes de sugerir qualquer pet — e continua do
              seu lado depois da adoção, com guias de cuidado, alertas e uma tag que ajuda a
              trazer seu bichinho de volta pra casa.
            </S.HeroText>

            <S.HeroCtas>
              <S.BtnPrimary href="#adocao">
                Quero adotar
                <ArrowRight size={18} />
              </S.BtnPrimary>
              <S.BtnGhost href="#ongs">Sou de uma ONG</S.BtnGhost>
            </S.HeroCtas>

            <S.HeroNote>
              <Heart size={16} strokeWidth={2.5} />
              Cadastro gratuito para adotantes e para ONGs parceiras.
            </S.HeroNote>
          </div>

          <S.HeroStage>
            <S.FloatChip $top="-18px" $left="-14px" $speed="6.5s">
              <ClipboardList size={20} />
              <div>
                <strong>Quiz respondido</strong>
                <span>12 perguntas sobre sua rotina</span>
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
                    <span>afinidade</span>
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
                <strong>Tag lida hoje, 18h42</strong>
                <span>Praça Central · 900 m de casa</span>
              </div>
            </S.FloatChip>
          </S.HeroStage>
        </S.HeroGrid>
      </S.Hero>

      {/* ------------------------ TRILHA DE ADOÇÃO ------------------------ */}
      <S.Section id="adocao" $paper>
        <S.Wrap>
          <S.SectionHead>
            <S.Tag>
              <ClipboardList size={14} strokeWidth={2.5} />
              Do quiz ao sofá
            </S.Tag>
            <S.H2>
              Adotar leva quatro passos. <em>Nenhum deles é no chute.</em>
            </S.H2>
            <S.Lead>
              A ordem importa: cada etapa alimenta a próxima e a ONG recebe um retrato real de
              quem está do outro lado.
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
                seu perfil — não por ordem de chegada.
              </p>
            </S.Step>

            <S.Step>
              <span className="num" />
              <h3>Envie sua candidatura</h3>
              <p>
                Documentos e respostas viram um dossiê que vai direto para a ONG responsável,
                dentro das regras da LGPD.
              </p>
            </S.Step>

            <S.Step>
              <span className="num" />
              <h3>Leve o guia pra casa</h3>
              <p>
                Assim que a adoção é aprovada, o app monta o plano de cuidado da raça e da
                idade do seu novo companheiro.
              </p>
            </S.Step>
          </S.Steps>
        </S.Wrap>
      </S.Section>

      {/* --------------------------- O MATCH --------------------------- */}
      <S.Section id="match">
        <S.Wrap>
          <S.SectionHead $center>
            <S.Tag>
              <Sparkles size={14} strokeWidth={2.5} />
              Inteligência a serviço do vínculo
            </S.Tag>
            <S.H2>O que a Nima olha antes de sugerir um pet</S.H2>
            <S.Lead>
              A devolução de um animal quase nunca é falta de amor — é incompatibilidade de
              rotina. O match comportamental existe para diminuir esse risco antes do primeiro
              encontro.
            </S.Lead>
          </S.SectionHead>

          <S.CardGrid $cols={3}>
            <S.Card>
              <S.IconBox>
                <ClipboardList size={26} />
              </S.IconBox>
              <h3>A sua rotina</h3>
              <p>
                Espaço disponível, horas fora de casa, crianças, outros animais, disposição para
                caminhadas e nível de experiência como tutor.
              </p>
            </S.Card>

            <S.Card>
              <S.IconBox $honey>
                <PawPrint size={26} />
              </S.IconBox>
              <h3>O jeito dele</h3>
              <p>
                Energia, sociabilidade, histórico de saúde e observações da ONG que convive com
                o animal todos os dias.
              </p>
            </S.Card>

            <S.Card>
              <S.IconBox>
                <FileCheck2 size={26} />
              </S.IconBox>
              <h3>A pontuação</h3>
              <p>
                Os dois perfis são cruzados e viram uma nota de afinidade, com os pontos de
                atenção sempre visíveis — inclusive os desfavoráveis.
              </p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* ------------------------- DEPOIS DO SIM ------------------------- */}
      <S.Section id="cuidado" $paper>
        <S.Wrap>
          <S.SectionHead>
            <S.Tag>
              <BookOpenText size={14} strokeWidth={2.5} />
              Pós-adoção
            </S.Tag>
            <S.H2>
              O app não some depois que o <em>portão fecha</em>.
            </S.H2>
            <S.Lead>
              A área "Meu Pet" acompanha o animal pela vida inteira — porque o primeiro mês é
              onde a maioria das adoções desanda.
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
              <h3>Ração certa</h3>
              <p>Sugestões de alimentação por idade, porte e necessidades específicas.</p>
            </S.Card>

            <S.Card>
              <S.IconBox>
                <Stethoscope size={26} />
              </S.IconBox>
              <h3>Cronograma de saúde</h3>
              <p>Vacinas, vermífugo e retornos, com lembretes antes de cada data.</p>
            </S.Card>

            <S.Card>
              <S.IconBox $honey>
                <Bell size={26} />
              </S.IconBox>
              <h3>Avisos que chegam na hora</h3>
              <p>Calor forte, tosquia, adestramento básico e enriquecimento ambiental.</p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* --------------------------- SMART TAG --------------------------- */}
      <S.Section id="tag">
        <S.TagShowcase as="div">
          <S.TagDisc onMouseEnter={playTag} onMouseLeave={pauseTag}>
            {videoOk ? (
              <video
                ref={videoRef}
                src="/chaveiro.mp4"
                preload="auto"
                muted
                playsInline
                onError={() => setVideoOk(false)}
                aria-label="Chaveiro Smart Tag da Nima girando"
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
              Smart Tag
            </S.Tag>
            <S.H2>
              Uma plaquinha na coleira. <em>Um caminho de volta.</em>
            </S.H2>
            <S.Lead>
              Quem encontrar o animal só precisa aproximar o celular da tag. Sem app, sem
              cadastro, sem ligar para ninguém.
            </S.Lead>

            <S.TagPoints>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>A ficha aparece na hora:</strong> nome, cuidados médicos urgentes e o
                  contato do tutor.
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Cada leitura vira um ponto no mapa,</strong> com data e hora, no
                  histórico que só o tutor enxerga.
                </span>
              </li>
              <li>
                <Check size={18} strokeWidth={3} />
                <span>
                  <strong>Sumiu?</strong> O mural de desaparecidos avisa a vizinhança e as ONGs
                  próximas na mesma hora.
                </span>
              </li>
            </S.TagPoints>

            <S.HeroCtas>
              <S.BtnHoney href="#final">Quero a tag do meu pet</S.BtnHoney>
            </S.HeroCtas>
          </div>
        </S.TagShowcase>
      </S.Section>

      {/* ----------------------------- ONGs ----------------------------- */}
      <S.Section id="ongs" $paper>
        <S.OngBox as="div">
          <S.OngGrid>
            <div>
              <S.OngTag>
                <HandHeart size={14} strokeWidth={2.5} />
                Painel das ONGs
              </S.OngTag>
              <h2>Menos planilha. Mais tempo com os animais.</h2>
              <p>
                O painel web da Nima é onde a ONG cadastra os pets, acompanha as candidaturas
                que chegam pelo app, responde os interessados e organiza campanhas. A
                homologação de novas ONGs é feita pela administração da plataforma.
              </p>

              <S.HeroCtas>
                <S.BtnHoney as={Link} to="/login">
                  Entrar no painel
                  <ArrowRight size={18} />
                </S.BtnHoney>
              </S.HeroCtas>
            </div>

            <S.OngList>
              <li>
                <PawPrint size={20} /> Cadastro e perfil comportamental dos animais
              </li>
              <li>
                <FileCheck2 size={20} /> Dossiês de adoção com triagem por afinidade
              </li>
              <li>
                <Megaphone size={20} /> Campanhas, mutirões e vagas de voluntariado
              </li>
              <li>
                <QrCode size={20} /> Chave e QR Code Pix para doações diretas
              </li>
              <li>
                <ShieldCheck size={20} /> Homologação de ONGs feita pela administração
              </li>
            </S.OngList>
          </S.OngGrid>
        </S.OngBox>
      </S.Section>

      {/* ---------------------------- CTA FINAL ---------------------------- */}
      <S.Cta as="section" id="final">
        <S.Tag>
          <Heart size={14} strokeWidth={2.5} />
          Vem pro lado bom da casa
        </S.Tag>
        <h2>Tem um cachorro esperando alguém com a sua rotina.</h2>
        <p>
          Responda o quiz, veja quem combina com você e comece a conversa com a ONG. Leva menos
          tempo do que um passeio no quarteirão.
        </p>
        <S.CtaButtons>
          <S.BtnPrimary href="#adocao">
            Começar a adoção
            <ArrowRight size={18} />
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
              <PawPrint size={22} strokeWidth={2.4} />
              nima.
            </S.FooterBrand>
            <p>
              Adoção com afinidade, cuidado depois do sim e um caminho de volta pra casa. Um
              ecossistema para tutores, adotantes e ONGs.
            </p>
          </div>

          <div>
            <h4>Plataforma</h4>
            <a href="#adocao">Como adotar</a>
            <a href="#match">O match</a>
            <a href="#cuidado">Depois do sim</a>
            <a href="#tag">Smart Tag</a>
          </div>

          <div>
            <h4>Para ONGs</h4>
            <Link to="/login">Entrar no painel</Link>
            <a href="#ongs">Ser uma ONG parceira</a>
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
