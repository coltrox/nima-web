import React, { useEffect, useState } from 'react';
import { Check, X, AlertCircle, Loader2, Mail, Phone, AtSign } from 'lucide-react';
import devService from '../../../services/devService';

const HomologarOngs = () => {
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [acaoId, setAcaoId] = useState(null);

  const carregar = async () => {
    setLoading(true);
    setErro('');
    try {
      const data = await devService.listarOngs('pendente');
      setOngs(Array.isArray(data) ? data : []);
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao carregar as ONGs pendentes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const aprovar = async (id) => {
    setAcaoId(id);
    try {
      await devService.homologar(id, 'aprovar');
      setOngs((lista) => lista.filter((o) => o.id !== id));
    } catch (e) {
      alert(typeof e === 'string' ? e : 'Erro ao aprovar.');
    } finally {
      setAcaoId(null);
    }
  };

  const rejeitar = async (id) => {
    const motivo = prompt('Motivo da rejeição (opcional):');
    if (motivo === null) return;
    setAcaoId(id);
    try {
      await devService.homologar(id, 'rejeitar', motivo);
      setOngs((lista) => lista.filter((o) => o.id !== id));
    } catch (e) {
      alert(typeof e === 'string' ? e : 'Erro ao rejeitar.');
    } finally {
      setAcaoId(null);
    }
  };

  return (
    <div style={{ flex: 1, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1F2937' }}>
      <header style={{ marginBottom: '35px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#05082B', margin: '0 0 4px 0' }}>
          Homologação de ONGs
        </h1>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
          Analise os cadastros e aprove ou rejeite a entrada de novas instituições na plataforma.
        </p>
      </header>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#05082B', margin: '0 0 20px 0' }}>
          Fila de validação {loading ? '' : `(${ongs.length})`}
        </h3>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '40px 0', color: '#6B7280' }}>
            <Loader2 size={22} style={{ animation: 'loginSpin 0.8s linear infinite' }} /> Carregando...
          </div>
        ) : erro ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 0', color: '#EF4444' }}>
            <AlertCircle size={36} />
            <p style={{ margin: 0, fontWeight: 500 }}>{erro}</p>
            <button onClick={carregar} style={{ marginTop: 8, background: '#1D5CFF', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              Tentar de novo
            </button>
          </div>
        ) : ongs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 0', color: '#6B7280' }}>
            <AlertCircle size={36} style={{ color: '#10B981' }} />
            <p style={{ fontWeight: 500, margin: 0 }}>Nenhuma ONG aguardando homologação.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ongs.map((ong) => (
              <div key={ong.id} style={{ border: '1px solid #F1F5F9', borderRadius: '8px', padding: '20px', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#05082B', margin: '0 0 6px 0' }}>{ong.nome}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#4B5563' }}>
                      {ong.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {ong.email}</span>}
                      {ong.telefone && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} /> {ong.telefone}</span>}
                      {ong.instagram && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AtSign size={14} /> {ong.instagram}</span>}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#4B5563', backgroundColor: '#E2E8F0', padding: '4px 8px', borderRadius: '4px', height: 'fit-content' }}>
                    {ong.cnpj ? `CNPJ: ${ong.cnpj}` : ong.cpf ? `CPF: ${ong.cpf}` : 'sem documento'}
                  </span>
                </div>

                {ong.descricao && (
                  <div style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.5, borderLeft: '3px solid #1D5CFF', paddingLeft: '12px' }}>
                    {ong.descricao}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                  <button
                    onClick={() => rejeitar(ong.id)}
                    disabled={acaoId === ong.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEE2E2', color: '#991B1B', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, opacity: acaoId === ong.id ? 0.6 : 1 }}
                  >
                    <X size={16} /> Rejeitar
                  </button>
                  <button
                    onClick={() => aprovar(ong.id)}
                    disabled={acaoId === ong.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#D1FAE5', color: '#065F46', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, opacity: acaoId === ong.id ? 0.6 : 1 }}
                  >
                    {acaoId === ong.id ? <Loader2 size={16} style={{ animation: 'loginSpin 0.8s linear infinite' }} /> : <Check size={16} />} Homologar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomologarOngs;
