import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import * as A from '../authStyles';

const COPY = {
  ong: {
    title: 'Acesso da ONG',
    subtitle: 'Entre no painel para gerenciar animais, candidaturas e campanhas.',
    dest: '/ong/painel',
    brandTitle: 'Bem-vinda de volta.',
    points: [
      'Triagem de adoções com IA',
      'Vaquinhas e voluntariado',
      'Seus animais no feed dos adotantes',
    ],
  },
  desenvolvedor: {
    title: 'Acesso do Desenvolvedor',
    subtitle: 'Console de governança: homologação de ONGs e administração.',
    dest: '/dev',
    brandTitle: 'Console de governança.',
    points: [
      'Homologação de ONGs',
      'Gestão de cargos e acessos',
      'Auditoria do ecossistema',
    ],
  },
};

const LoginScreen = ({ role = 'ong' }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const copy = COPY[role] ?? COPY.ong;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      await signIn(email, password, role);
      navigate(copy.dest);
    } catch (error) {
      setErro(typeof error === 'string' ? error : 'Falha na autenticação. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <A.Page>
      <A.Shell>
        <A.BrandSide>
          <div>
            <img src="/nima-logo-white.png" alt="Nima" />
            <h2>{copy.brandTitle}</h2>
            <p>Painel do ecossistema Nima — adoção com afinidade, do cadastro à homologação.</p>
          </div>
          <A.BrandPoints>
            {copy.points.map((p) => (
              <li key={p}>
                <Check size={16} strokeWidth={3} /> {p}
              </li>
            ))}
          </A.BrandPoints>
        </A.BrandSide>

        <A.FormSide>
          <A.MobileBrand>
            <img src="/nima-logo-trim.png" alt="Nima" />
          </A.MobileBrand>
          <A.Title>{copy.title}</A.Title>
          <A.Subtitle>{copy.subtitle}</A.Subtitle>

          <A.Form onSubmit={submit}>
            {erro && <A.ErrorBox>{erro}</A.ErrorBox>}

            <A.Field>
              <A.Label>E-mail</A.Label>
              <A.InputWrap>
                <Mail size={18} className="ic" />
                <A.Input
                  $icon
                  type="email"
                  placeholder="voce@exemplo.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </A.InputWrap>
            </A.Field>

            <A.Field>
              <A.Label>Senha</A.Label>
              <A.InputWrap>
                <Lock size={18} className="ic" />
                <A.Input
                  $icon
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <A.Eye type="button" onClick={() => setShow(!show)} disabled={loading}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </A.Eye>
              </A.InputWrap>
            </A.Field>

            <A.Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" /> Autenticando...
                </>
              ) : (
                'Entrar'
              )}
            </A.Button>

            {role === 'ong' && (
              <A.Foot>
                Ainda não tem conta? <Link to="/ong/registro">Cadastre sua ONG</Link>
              </A.Foot>
            )}
          </A.Form>
        </A.FormSide>
      </A.Shell>
    </A.Page>
  );
};

export default LoginScreen;
