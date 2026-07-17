import React, { useEffect, useState } from 'react';
import devService from '../../../services/devService';
import * as S from '../../Panel/panelStyles';

export default function VisaoGeral() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setDados(await devService.overview());
      } catch (e) {
        setErro(typeof e === 'string' ? e : 'Erro ao carregar visão geral.');
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Visão geral</h1>
          <p>Panorama do ecossistema Nima em tempo real.</p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      {carregando ? (
        <S.Spinner $center />
      ) : dados ? (
        <S.Grid $cols={3}>
          <S.StatCard>
            <span className="label">Usuários</span>
            <span className="value">{dados.usuarios.total}</span>
            <span className="sub">{dados.usuarios.tutores} tutores · {dados.usuarios.ongs} ONGs · {dados.usuarios.devs} devs</span>
          </S.StatCard>

          <S.StatCard>
            <span className="label">ONGs pendentes</span>
            <span className="value">{dados.ongs.pendentes}</span>
            <span className="sub">{dados.ongs.aprovadas} aprovadas · {dados.ongs.rejeitadas} rejeitadas</span>
          </S.StatCard>

          <S.StatCard>
            <span className="label">Animais</span>
            <span className="value">{dados.animais.total}</span>
            <span className="sub">{dados.animais.disponiveis} disponíveis · {dados.animais.adotados} adotados · {dados.animais.desaparecidos} desap.</span>
          </S.StatCard>

          <S.StatCard>
            <span className="label">Solicitações de adoção</span>
            <span className="value">{dados.solicitacoes.total}</span>
            <span className="sub">{dados.solicitacoes.pendentes} pendentes</span>
          </S.StatCard>

          <S.StatCard>
            <span className="label">Vaquinhas ativas</span>
            <span className="value">{dados.vaquinhas_ativas}</span>
            <span className="sub">campanhas de doação no ar</span>
          </S.StatCard>

          <S.StatCard>
            <span className="label">Vagas de voluntariado ativas</span>
            <span className="value">{dados.vagas_ativas}</span>
            <span className="sub">oportunidades abertas</span>
          </S.StatCard>
        </S.Grid>
      ) : null}
    </>
  );
}
