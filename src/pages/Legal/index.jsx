import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';

import * as S from './styles';
import { EMPRESA, PRODUTO } from '../../config/empresa';
import Privacidade from './Privacidade.jsx';
import Termos from './Termos.jsx';

const PAGINAS = {
  privacidade: { titulo: 'Política de Privacidade', Corpo: Privacidade },
  termos: { titulo: 'Termos de Uso', Corpo: Termos },
};

/* Casca compartilhada das páginas legais — o texto de cada uma
   vive no seu próprio arquivo. */
export default function Legal({ documento }) {
  const pagina = PAGINAS[documento];
  const { Corpo, titulo } = pagina;

  React.useEffect(() => {
    document.title = `${titulo} — ${PRODUTO.nome}`;
  }, [titulo]);

  return (
    <S.Page>
      <S.Topo>
        <S.TopoInner>
          <Link to="/" aria-label={`${PRODUTO.nome} — início`}>
            <S.Marca src="/nima-logo-trim.png" alt={PRODUTO.nome} />
          </Link>
          <Link to="/">
            <S.Voltar>
              <ArrowLeft size={16} strokeWidth={2.5} />
              Voltar ao site
            </S.Voltar>
          </Link>
        </S.TopoInner>
      </S.Topo>

      <S.Conteudo>
        <h1>{titulo}</h1>
        <S.Atualizado>
          <CalendarDays size={14} strokeWidth={2.5} />
          Última atualização: {PRODUTO.atualizadoEm}
        </S.Atualizado>

        <Corpo />

        <S.Aviso>
          <p>
            Dúvidas sobre este documento ou sobre os seus dados? Escreva para{' '}
            <a href={`mailto:${PRODUTO.email}`}>{PRODUTO.email}</a>. O {PRODUTO.nome} é um produto
            da <a href={EMPRESA.site} target="_blank" rel="noreferrer">{EMPRESA.nome}</a>.
          </p>
        </S.Aviso>
      </S.Conteudo>
    </S.Page>
  );
}
