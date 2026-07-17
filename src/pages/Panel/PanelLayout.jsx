import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import * as S from './panelStyles';

/*
 * Casca dos painéis (ONG e DEV).
 * items: [{ to, label, icon, end? }] — `end` marca a rota índice (não fica
 * ativa nas sub-rotas). onLogout: callback do botão Sair.
 */
export default function PanelLayout({ items = [], onLogout, children }) {
  return (
    <S.Shell>
      <S.Aside>
        <S.Brand as={Link} to="/">
          <img src="/nima-logo-white.png" alt="Nima" />
        </S.Brand>

        <S.Nav>
          {items.map((it) => (
            <S.NavItem as={NavLink} to={it.to} end={it.end} key={it.to}>
              {it.icon}
              <span>{it.label}</span>
            </S.NavItem>
          ))}
        </S.Nav>

        <S.LogoutBtn type="button" onClick={onLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </S.LogoutBtn>
      </S.Aside>

      <S.Main>{children}</S.Main>
    </S.Shell>
  );
}
