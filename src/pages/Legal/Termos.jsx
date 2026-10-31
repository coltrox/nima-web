import { EMPRESA, PRODUTO } from '../../config/empresa';

export default function Termos() {
  return (
    <>
      <p>
        Estes termos regem o uso do {PRODUTO.nome}, plataforma de adoção mantida pela{' '}
        {EMPRESA.nome}. Ao criar uma conta, você concorda com o que está escrito aqui.
      </p>

      <h2>O que o {PRODUTO.nome} é</h2>
      <p>
        O {PRODUTO.nome} aproxima pessoas que querem adotar de ONGs e protetores que cuidam de
        animais. Oferecemos um questionário de rotina, um cálculo de afinidade, o encaminhamento da
        candidatura, guias de cuidado pós-adoção e a Patinha, nossa tag de coleira com NFC e QR
        Code.
      </p>

      <h2>O que o {PRODUTO.nome} não é</h2>
      <ul>
        <li>
          <strong>Não somos parte da adoção.</strong> Quem avalia, entrevista, aprova e entrega o
          animal é sempre a ONG responsável. A nota de afinidade é uma sugestão, nunca uma decisão.
        </li>
        <li>
          <strong>Não vendemos animais</strong> nem cobramos taxa de adoção.
        </li>
        <li>
          <strong>A Patinha não é um rastreador por GPS.</strong> Ela não emite sinal e não tem
          bateria: informa onde foi lida, não onde o animal está naquele momento.
        </li>
        <li>
          <strong>Não somos clínica veterinária.</strong> Os guias de raça, nutrição e saúde são
          orientativos e não substituem diagnóstico ou prescrição de um profissional.
        </li>
      </ul>

      <h2>A sua conta</h2>
      <p>
        Você precisa ter 18 anos ou mais e fornecer informações verdadeiras. A senha é pessoal, e
        você responde pelo que acontecer na sua conta. Se perceber uso indevido, avise em{' '}
        <a href={`mailto:${PRODUTO.email}`}>{PRODUTO.email}</a>.
      </p>

      <h2>Responder o quiz com honestidade</h2>
      <p>
        O cálculo de afinidade só funciona se as respostas refletirem a sua rotina real. Informação
        falsa no questionário compromete o encontro, prejudica o animal e pode levar à recusa da
        candidatura pela ONG.
      </p>

      <h2>Contas de ONG</h2>
      <p>
        O cadastro de ONGs passa por homologação antes de liberar o painel. A instituição é
        responsável pela veracidade dos dados dos animais, pelos prontuários que publica e pelas
        chaves PIX que divulga nas vaquinhas. A {EMPRESA.nome} não intermedeia doações nem retém
        valores: o PIX vai direto para a conta da ONG.
      </p>

      <h2>Conduta</h2>
      <p>
        É proibido usar a plataforma para comercializar animais, para maus-tratos, para assediar
        outros usuários, para coletar dados de terceiros ou para qualquer finalidade ilegal. Contas
        que descumprirem isso são suspensas.
      </p>

      <h2>Conteúdo que você publica</h2>
      <p>
        Fotos e textos que você envia continuam sendo seus. Você nos concede permissão para exibi-los
        dentro da plataforma, no que for necessário para o serviço funcionar — por exemplo, mostrar
        a foto do animal na ficha pública da Patinha.
      </p>

      <h2>Disponibilidade e limites</h2>
      <p>
        Trabalhamos para manter o serviço no ar, mas ele é oferecido no estado em que se encontra e
        pode passar por manutenção ou indisponibilidade. Na medida permitida pela lei, a{' '}
        {EMPRESA.nome} não responde por danos decorrentes da relação entre adotante e ONG, da
        decisão de adotar, nem do comportamento do animal após a adoção.
      </p>

      <h2>Encerramento</h2>
      <p>
        Você pode encerrar a sua conta quando quiser, pelo app ou escrevendo para{' '}
        <a href={`mailto:${PRODUTO.email}`}>{PRODUTO.email}</a>. Podemos encerrar contas que violem
        estes termos.
      </p>

      <h2>Lei aplicável</h2>
      <p>
        Estes termos seguem a legislação brasileira. Eventuais conflitos serão resolvidos no foro do
        domicílio do consumidor.
      </p>
    </>
  );
}
