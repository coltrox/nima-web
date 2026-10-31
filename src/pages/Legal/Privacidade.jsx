import { EMPRESA, PRODUTO } from '../../config/empresa';

export default function Privacidade() {
  return (
    <>
      <p>
        Esta política explica quais dados o {PRODUTO.nome} coleta, por que coleta e o que você
        pode exigir a respeito deles. Ela segue a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018). O controlador dos dados é a {EMPRESA.nome}
        {EMPRESA.cnpj ? `, inscrita no CNPJ sob o nº ${EMPRESA.cnpj}` : ''}.
      </p>

      <h2>Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Cadastro:</strong> nome, e-mail, telefone e senha de acesso. Para ONGs, também
          CNPJ e dados de contato da instituição, usados na homologação.
        </li>
        <li>
          <strong>Respostas do quiz:</strong> informações sobre a sua moradia, rotina, horários,
          experiência com animais e quem mais vive na casa. É o que alimenta o cálculo de
          afinidade.
        </li>
        <li>
          <strong>Localização aproximada:</strong> usada para mostrar ONGs e animais perto de você
          e, quando uma Patinha é lida, para informar ao tutor onde aquela leitura aconteceu.
        </li>
        <li>
          <strong>Dados dos animais:</strong> cadastro, prontuário e histórico de saúde,
          preenchidos pela ONG responsável.
        </li>
        <li>
          <strong>Dados técnicos:</strong> registros de acesso, dispositivo e navegador, mantidos
          para segurança e para investigar problemas.
        </li>
      </ul>

      <h2>Por que usamos cada dado</h2>
      <ul>
        <li>Calcular a afinidade entre o seu perfil e o perfil de cada animal.</li>
        <li>
          Montar o dossiê que acompanha a sua candidatura e enviá-lo <strong>somente</strong> à ONG
          responsável pelo animal que você escolheu.
        </li>
        <li>Gerar os guias de cuidado, o cronograma de vacinas e os lembretes da área Meu Pet.</li>
        <li>Fazer a Patinha funcionar: abrir a ficha pública e avisar o tutor sobre a leitura.</li>
        <li>Manter a plataforma segura e cumprir obrigações legais.</li>
      </ul>

      <h2>Com quem compartilhamos</h2>
      <p>
        Suas respostas do quiz chegam apenas à ONG responsável pelo animal ao qual você se
        candidatou. Não vendemos dados pessoais, não os cedemos para publicidade de terceiros e
        não os usamos para treinar modelos de terceiros. Fornecedores de infraestrutura (hospedagem
        e envio de mensagens) tratam dados em nosso nome e sob contrato.
      </p>

      <h2>O que fica público na ficha da Patinha</h2>
      <p>
        Quando alguém lê a Patinha do seu pet, abre uma ficha pública. Ela mostra o nome do animal,
        as informações de saúde que você escolheu exibir e o contato que você autorizou para que
        essa pessoa consiga devolvê-lo. Você controla esse conteúdo no app e pode desativar a tag a
        qualquer momento.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Mantemos os seus dados enquanto a sua conta existir. Depois do encerramento, apagamos ou
        anonimizamos o que não formos obrigados a reter por lei. Registros de acesso são mantidos
        por seis meses, conforme o Marco Civil da Internet.
      </p>

      <h2>Os seus direitos</h2>
      <p>
        A LGPD garante que você possa confirmar que tratamos os seus dados, acessá-los, corrigir o
        que estiver errado, pedir a portabilidade, revogar consentimentos e solicitar a exclusão.
        Para exercer qualquer um deles, escreva para <a href={`mailto:${PRODUTO.email}`}>{PRODUTO.email}</a>.
        Respondemos em até 15 dias.
      </p>

      <h2>Segurança</h2>
      <p>
        Usamos conexão criptografada, senhas armazenadas com hash e controle de acesso por perfil —
        uma ONG só enxerga os dados das candidaturas destinadas a ela. Nenhum sistema é
        inteiramente imune, e por isso mantemos registros que nos permitem detectar e responder a
        incidentes.
      </p>

      <h2>Menores de idade</h2>
      <p>
        O {PRODUTO.nome} é destinado a maiores de 18 anos, já que a adoção responsável pressupõe
        capacidade civil. Não coletamos dados de crianças de forma intencional.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Se alterarmos este documento, atualizamos a data no topo da página e avisamos pelo app
        quando a mudança for relevante.
      </p>
    </>
  );
}
