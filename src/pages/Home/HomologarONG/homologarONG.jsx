import React, { useState } from 'react';
import { Check, X, FileText, ExternalLink, AlertCircle } from 'lucide-react';

const HomologarOngs = () => {
  // Estado simulando ONGs que enviaram documentação e aguardam validação técnica/cadastral
  const [solicitacoes, setSolicitacoes] = useState([
    { 
      id: 1, 
      nome: 'ONG Patinhas Felizes', 
      email: 'contato@patinhasfelizes.org', 
      cnpj: '12.345.678/0001-99', 
      dataSolicitacao: '04/07/2026',
      status: 'Pendente',
      documentoUrl: '#',
      descricao: 'Atuação no resgate, tratamento veterinário e adoção responsável de animais domésticos abandonados.'
    },
    { 
      id: 2, 
      nome: 'ONG Proteção Animal', 
      email: 'admin@protecao.org', 
      cnpj: '98.765.432/0001-10', 
      dataSolicitacao: '06/07/2026',
      status: 'Pendente',
      documentoUrl: '#',
      descricao: 'Preservação da fauna silvestre local e conscientização ambiental em escolas da rede pública.'
    }
  ]);

  const handleAprovar = (id, nome) => {
    setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== id));
    console.log(`[GOVERNANÇA] ONG "${nome}" (ID: ${id}) foi homologada e aprovada com sucesso.`);
    alert(`A ONG "${nome}" foi aprovada e integrada ao sistema.`);
  };

  const handleRejeitar = (id, nome) => {
    const motivo = prompt(`Digite o motivo da rejeição para a ONG ${nome}:`);
    if (motivo !== null) {
      setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== id));
      console.log(`[GOVERNANÇA] ONG "${nome}" (ID: ${id}) foi rejeitada. Motivo: ${motivo}`);
    }
  };

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1F2937' }}>
      
      {/* Cabeçalho da Tela */}
      <header style={{ marginBottom: '35px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#05082B', margin: '0 0 4px 0' }}>
          Homologação de ONGs
        </h1>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
          Analise a documentação jurídica, estatutos sociais e aprove ou rejeite a entrada de novas instituições na plataforma.
        </p>
      </header>

      {/* Quadro de Métricas Internas */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '35px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Pedidos Pendentes</span>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>
            {solicitacoes.length} Solicitações
          </h3>
          <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: '600' }}>Aguardando Revisão</span>
        </div>
        
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Tempo Médio de Análise</span>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>
            24 Horas
          </h3>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>Dentro da Meta SLA</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Padrão de Segurança</span>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>
            Filtro Ativo
          </h3>
          <span style={{ fontSize: '12px', color: '#1D5CFF', fontWeight: '600' }}>Verificação Cadastral</span>
        </div>
      </section>

      {/* Lista/Painel de Análise Cadastral */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#05082B', margin: '0 0 20px 0' }}>
          Fila de Validação Jurídica
        </h3>

        {solicitacoes.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 0', color: '#6B7280' }}>
            <AlertCircle size={36} style={{ color: '#10B981' }} />
            <p style={{ fontWeight: '500', margin: 0 }}>Excelente! Nenhuma ONG aguardando homologação no momento.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {solicitacoes.map((solicitacao) => (
              <div 
                key={solicitacao.id} 
                style={{ 
                  border: '1px solid #F1F5F9', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Linha Principal de Informações */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#05082B', margin: '0 0 4px 0' }}>
                      {solicitacao.nome}
                    </h4>
                    <span style={{ fontSize: '13px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                      {solicitacao.email}
                    </span>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#4B5563', backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>
                      CNPJ: {solicitacao.cnpj}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>
                      Enviado em: <strong>{solicitacao.dataSolicitacao}</strong>
                    </span>
                    <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '13px' }}>
                      ● {solicitacao.status}
                    </span>
                  </div>
                </div>

                {/* Descrição informada pela instituição */}
                <div style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.5', borderLeft: '3px solid #1D5CFF', paddingLeft: '12px' }}>
                  {solicitacao.descricao}
                </div>

                {/* Rodapé do Card com os Botões de Ação */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                  <a 
                    href={solicitacao.documentoUrl}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      color: '#1D5CFF', 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      textDecoration: 'none' 
                    }}
                  >
                    <FileText size={16} /> Visualizar Estatuto Social & Docs.pdf <ExternalLink size={12} />
                  </a>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleRejeitar(solicitacao.id, solicitacao.nome)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}
                    >
                      <X size={16} /> Rejeitar Entrada
                    </button>

                    <button
                      onClick={() => handleAprovar(solicitacao.id, solicitacao.nome)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#D1FAE5',
                        color: '#065F46',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}
                    >
                      <Check size={16} /> Homologar e Ativar
                    </button>
                  </div>
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