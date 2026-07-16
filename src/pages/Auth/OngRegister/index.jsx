import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import * as A from '../authStyles';

const soDigitos = (v) => (v || '').replace(/\D/g, '');

export default function OngRegister() {
  const { registerOng } = useAuth();

  const [form, setForm] = useState({
    nome: '', documento: '', email: '', telefone: '', instagram: '',
    endereco: '', descricao: '', password: '', confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [ok, setOk] = useState(false);

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const validar = () => {
    if (!form.nome || !form.email || !form.documento || !form.password) {
      return 'Preencha nome, e-mail, documento e senha.';
    }
    const doc = soDigitos(form.documento);
    if (doc.length !== 11 && doc.length !== 14) {
      return 'Documento inválido: informe um CNPJ (14 dígitos) ou CPF (11 dígitos).';
    }
    if (form.password.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
    if (form.password !== form.confirm) return 'As senhas não conferem.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validar();
    if (v) { setErro(v); return; }
    setErro('');
    setLoading(true);
    try {
      await registerOng({
        nome: form.nome,
        email: form.email,
        password: form.password,
        documento: soDigitos(form.documento),
        telefone: form.telefone,
        whatsapp: form.telefone,
        instagram: form.instagram,
        endereco: form.endereco,
        descricao: form.descricao,
      });
      setOk(true);
    } catch (error) {
      setErro(typeof error === 'string' ? error : 'Erro ao enviar o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <A.Page>
        <A.Shell $wide>
          <A.FormSide>
            <A.Success>
              <CheckCircle2 size={56} />
              <A.Title>Cadastro enviado!</A.Title>
              <A.Subtitle>
                Sua ONG passará por análise da administração. Você poderá acessar o painel assim
                que for homologada.
              </A.Subtitle>
              <A.Button as={Link} to="/ong/login" style={{ maxWidth: 240, margin: '0 auto' }}>
                Ir para o login
              </A.Button>
            </A.Success>
          </A.FormSide>
        </A.Shell>
      </A.Page>
    );
  }

  return (
    <A.Page>
      <A.Shell $wide>
        <A.FormSide>
          <A.Back as={Link} to="/ong">
            <ArrowLeft size={16} /> Voltar
          </A.Back>
          <A.MobileBrand>
            <img src="/nima-logo-trim.png" alt="Nima" />
          </A.MobileBrand>
          <A.Title>Cadastre sua ONG</A.Title>
          <A.Subtitle>
            Sua conta ficará <strong>pendente</strong> até a aprovação da administração.
          </A.Subtitle>

          <A.Form onSubmit={handleSubmit}>
            {erro && <A.ErrorBox>{erro}</A.ErrorBox>}

            <A.Field>
              <A.Label>Nome / Razão social</A.Label>
              <A.InputWrap>
                <A.Input value={form.nome} onChange={set('nome')} placeholder="ONG Patinhas Felizes" disabled={loading} required />
              </A.InputWrap>
            </A.Field>

            <A.Row $two>
              <A.Field>
                <A.Label>CNPJ ou CPF</A.Label>
                <A.InputWrap>
                  <A.Input value={form.documento} onChange={set('documento')} placeholder="00.000.000/0001-00" disabled={loading} required />
                </A.InputWrap>
              </A.Field>
              <A.Field>
                <A.Label>E-mail de contato</A.Label>
                <A.InputWrap>
                  <A.Input type="email" value={form.email} onChange={set('email')} placeholder="contato@ong.org" disabled={loading} required />
                </A.InputWrap>
              </A.Field>
            </A.Row>

            <A.Row $two>
              <A.Field>
                <A.Label>Telefone / WhatsApp</A.Label>
                <A.InputWrap>
                  <A.Input value={form.telefone} onChange={set('telefone')} placeholder="(19) 99999-9999" disabled={loading} />
                </A.InputWrap>
              </A.Field>
              <A.Field>
                <A.Label>@ do Instagram</A.Label>
                <A.InputWrap>
                  <A.Input value={form.instagram} onChange={set('instagram')} placeholder="@sua.ong" disabled={loading} />
                </A.InputWrap>
              </A.Field>
            </A.Row>

            <A.Field>
              <A.Label>Endereço</A.Label>
              <A.InputWrap>
                <A.Input value={form.endereco} onChange={set('endereco')} placeholder="Rua, nº, bairro, cidade" disabled={loading} />
              </A.InputWrap>
            </A.Field>

            <A.Field>
              <A.Label>Sobre a ONG</A.Label>
              <A.Textarea value={form.descricao} onChange={set('descricao')} placeholder="Conte brevemente a atuação da sua ONG" disabled={loading} />
            </A.Field>

            <A.Row $two>
              <A.Field>
                <A.Label>Senha</A.Label>
                <A.InputWrap>
                  <A.Input type="password" value={form.password} onChange={set('password')} placeholder="mín. 6 caracteres" disabled={loading} required />
                </A.InputWrap>
              </A.Field>
              <A.Field>
                <A.Label>Confirmar senha</A.Label>
                <A.InputWrap>
                  <A.Input type="password" value={form.confirm} onChange={set('confirm')} placeholder="repita a senha" disabled={loading} required />
                </A.InputWrap>
              </A.Field>
            </A.Row>

            <A.Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" /> Enviando...
                </>
              ) : (
                'Enviar cadastro'
              )}
            </A.Button>

            <A.Foot>
              Já tem conta? <Link to="/ong/login">Entrar</Link>
            </A.Foot>
          </A.Form>
        </A.FormSide>
      </A.Shell>
    </A.Page>
  );
}
