import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { atividadeService } from '../../../services/atividadeService';
import { equipeService } from '../../../services/equipeService';
import * as S from '../../Panel/panelStyles';

const quando = (iso) => new Date(iso).toLocaleString('pt-BR', {
  day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit',
});

export default function Atividades() {
  const [itens, setItens] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [ator, setAtor] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        setCarregando(true);
        setErro('');
        const dados = await atividadeService.listar({ ator_id: ator || undefined });
        if (vivo) setItens(dados);
      } catch (e) {
        if (vivo) setErro(e.message || 'Erro ao carregar o histórico.');
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => { vivo = false; };
  }, [ator]);

  // Alimenta o filtro por pessoa. Falha aqui não quebra a linha do tempo.
  useEffect(() => { equipeService.listar().then(setPessoas).catch(() => {}); }, []);

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Atividades</h1>
          <p>Tudo que a sua equipe fez neste painel. Só você, como conta principal, vê esta tela.</p>
        </div>
        <S.Select value={ator} onChange={(e) => setAtor(e.target.value)} style={{ maxWidth: 240 }}>
          <option value="">Todo mundo</option>
          {pessoas.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </S.Select>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : itens.length === 0 ? (
          <S.Empty style={{ border: 'none' }}>
            <History size={30} style={{ opacity: 0.4 }} /><br />
            Nada por aqui ainda. As ações da equipe aparecem nesta lista.
          </S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr><th>Quem</th><th>O que fez</th><th style={{ textAlign: 'right' }}>Quando</th></tr>
              </thead>
              <tbody>
                {itens.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{a.ator_nome}</td>
                    <td>{a.descricao}</td>
                    <td style={{ textAlign: 'right', color: 'var(--ink-soft)', fontSize: 12.5, whiteSpace: 'nowrap' }}>
                      {quando(a.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>
    </>
  );
}
