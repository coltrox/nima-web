import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  PiggyBank,
  Users,
  Map as MapIcon,
  Clock,
  Nfc,
  HeartHandshake,
  Check,
} from 'lucide-react';
import * as S from '../../Landing/styles';

// Página pública de captação de ONGs (rota /ong). Atrai a ONG a criar conta.
export default function ParaOngs() {
  return (
    <S.Page>
      {/* NAVBAR */}
      <S.Nav>
        <S.NavInner as="div">
          <S.Brand as={Link} to="/">
            <S.BrandImg src="/nima-logo-trim.png" alt="Nima" />
          </S.Brand>
          <S.NavActions style={{ gap: 14 }}>
            <S.NavLink as={Link} to="/ong/login">
              Entrar
            </S.NavLink>
            <S.NavBtn as={Link} to="/ong/registro">
              Cadastrar ONG
            </S.NavBtn>
          </S.NavActions>
        </S.NavInner>
      </S.Nav>

      {/* HERO */}
      <S.Section id="topo">
        <S.Wrap>
          <S.SectionHead $center>
            <S.Tag>
              <HeartHandshake size={14} strokeWidth={2.5} />
              Para ONGs e protetores
            </S.Tag>
            <S.HeroTitle style={{ maxWidth: 840, marginInline: 'auto' }}>
              A sua ONG no <em>centro</em> do Nima.
            </S.HeroTitle>
            <S.Lead style={{ marginInline: 'auto' }}>
              Menos planilha, mais adoções que dão certo — e que não voltam. Cadastre sua ONG
              gratuitamente e alcance quem realmente quer adotar — direto no <strong>app Nima</strong>,
              onde a adoção acontece. Você gerencia tudo por este painel web.
            </S.Lead>
            <S.HeroCtas style={{ justifyContent: 'center', marginTop: 28 }}>
              <S.BtnPrimary as={Link} to="/ong/registro">
                Registrar minha ONG
                <ArrowRight size={18} />
              </S.BtnPrimary>
              <S.BtnGhost as={Link} to="/ong/login">
                Já tenho conta
              </S.BtnGhost>
            </S.HeroCtas>
          </S.SectionHead>
        </S.Wrap>
      </S.Section>

      {/* VANTAGENS */}
      <S.Section $paper>
        <S.Wrap>
          <S.SectionHead $center>
            <S.Tag>
              <Sparkles size={14} strokeWidth={2.5} />
              Por que entrar
            </S.Tag>
            <S.H2>Ferramentas de verdade pra quem cuida</S.H2>
            <S.Lead style={{ marginInline: 'auto' }}>
              Tudo o que a sua ONG precisa pra qualificar adoções, captar recursos e economizar
              tempo — num só lugar.
            </S.Lead>
          </S.SectionHead>

          <S.CardGrid $cols={3}>
            <S.Card>
              <S.IconBox><Sparkles size={26} /></S.IconBox>
              <h3>Triagem com IA</h3>
              <p>Cada candidatura chega com um dossiê que justifica a compatibilidade. Menos devolução e decisão mais rápida.</p>
            </S.Card>
            <S.Card>
              <S.IconBox $honey><PiggyBank size={26} /></S.IconBox>
              <h3>Vaquinhas</h3>
              <p>Divulgue a chave PIX da própria ONG e receba doações diretas. O dinheiro vai direto pra você — o sistema só divulga.</p>
            </S.Card>
            <S.Card>
              <S.IconBox><Users size={26} /></S.IconBox>
              <h3>Voluntariado</h3>
              <p>Abra vagas e receba inscrições de voluntários, tudo organizado num só painel.</p>
            </S.Card>
            <S.Card>
              <S.IconBox $navy><MapIcon size={26} /></S.IconBox>
              <h3>Visibilidade</h3>
              <p>Apareça no mapa e no feed do <strong>app dos adotantes</strong> — mais gente certa vendo os seus animais.</p>
            </S.Card>
            <S.Card>
              <S.IconBox $honey><Clock size={26} /></S.IconBox>
              <h3>Menos planilha</h3>
              <p>Cadastro de animais, prontuário e candidaturas centralizados. Mais tempo com os bichos.</p>
            </S.Card>
            <S.Card>
              <S.IconBox $navy><Nfc size={26} /></S.IconBox>
              <h3>Patinha (Smart Tag)</h3>
              <p>Vincule a tag antiperda aos seus animais e ajude a trazer de volta quem se perder.</p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* COMO FUNCIONA */}
      <S.Section>
        <S.Wrap>
          <S.SectionHead $center>
            <S.Tag>
              <Check size={14} strokeWidth={2.5} />
              Como funciona
            </S.Tag>
            <S.H2>Do cadastro ao painel em 3 passos</S.H2>
          </S.SectionHead>

          <S.CardGrid $cols={3}>
            <S.Card>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 34, color: 'var(--blue)', marginBottom: 12 }}>01</div>
              <h3>Cadastre sua ONG</h3>
              <p>Preencha os dados (CNPJ ou CPF) e crie sua senha. Leva 2 minutos e é gratuito.</p>
            </S.Card>
            <S.Card>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 34, color: 'var(--blue)', marginBottom: 12 }}>02</div>
              <h3>Passe pela homologação</h3>
              <p>Nossa equipe valida as informações pra manter o ecossistema seguro e confiável.</p>
            </S.Card>
            <S.Card>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 34, color: 'var(--blue)', marginBottom: 12 }}>03</div>
              <h3>Comece a gerenciar</h3>
              <p>Aprovada, você acessa o painel pra cadastrar animais, receber candidaturas e abrir campanhas.</p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* O QUE VOCÊ VAI PRECISAR */}
      <S.Section>
        <S.Wrap>
          <S.SectionHead $center>
            <S.Tag>
              <Check size={14} strokeWidth={2.5} />
              Antes de começar
            </S.Tag>
            <S.H2>O que você vai precisar</S.H2>
            <S.Lead style={{ marginInline: 'auto' }}>
              Tenha esses dados em mãos — o cadastro leva 2 minutos.
            </S.Lead>
          </S.SectionHead>
          <S.CardGrid $cols={2}>
            <S.Card>
              <h3>Dados da instituição</h3>
              <p>Nome ou razão social e <strong>CNPJ ou CPF</strong> (aceita protetor autônomo).</p>
            </S.Card>
            <S.Card>
              <h3>Contato</h3>
              <p>E-mail, telefone/WhatsApp e o <strong>@ do Instagram</strong> da sua ONG.</p>
            </S.Card>
            <S.Card>
              <h3>Localização</h3>
              <p>Endereço para aparecer no mapa dos adotantes próximos.</p>
            </S.Card>
            <S.Card>
              <h3>Acesso</h3>
              <p>Uma senha para o painel. Depois é só aguardar a homologação.</p>
            </S.Card>
          </S.CardGrid>
        </S.Wrap>
      </S.Section>

      {/* CTA FINAL */}
      <S.Section $paper>
        <S.OngBox as="div">
          <S.OngHead>
            <div>
              <S.OngTag>
                <HeartHandshake size={14} strokeWidth={2.5} />
                Venha fazer parte
              </S.OngTag>
              <h2>Registre aqui a sua ONG.</h2>
              <p>
                Junte-se ao Nima e conecte os seus animais a lares compatíveis, com apoio pra
                captar doações e voluntários. É gratuito.
              </p>
            </div>
            <S.HeroCtas>
              <S.BtnHoney as={Link} to="/ong/registro">
                Cadastrar minha ONG
                <ArrowRight size={18} />
              </S.BtnHoney>
            </S.HeroCtas>
          </S.OngHead>
        </S.OngBox>
      </S.Section>

      {/* FOOTER */}
      <S.Footer>
        <S.FooterGrid as="div">
          <div>
            <S.FooterBrand as={Link} to="/">
              <S.FooterLogo src="/nima-logo-white.png" alt="Nima" />
            </S.FooterBrand>
            <p>Adoção com afinidade e apoio real para ONGs e protetores.</p>
          </div>
          <div>
            <h4>Para ONGs</h4>
            <Link to="/ong/registro">Cadastrar ONG</Link>
            <Link to="/ong/login">Entrar no painel</Link>
          </div>
          <div>
            <h4>Nima</h4>
            <Link to="/">Voltar ao site</Link>
            <a href="https://instagram.com/adote.nima" target="_blank" rel="noreferrer">@adote.nima</a>
          </div>
        </S.FooterGrid>
        <S.FooterBottom as="div">
          <span>© {new Date().getFullYear()} Nima · adotenima.com.br</span>
          <span>Projeto acadêmico — TCC</span>
        </S.FooterBottom>
      </S.Footer>
    </S.Page>
  );
}
