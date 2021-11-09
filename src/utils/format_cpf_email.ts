export function formata_CPF(campo: string, campoAtual: string) {
  let valoresPermitidos = "0123456789";
  let campoFormatado = campo;
  let ultimoDigito = campoFormatado.charAt(campoFormatado.length - 1);
  // Verificar se o valor digitado é um valor permitido se não for o remove
  if (!valoresPermitidos.includes(ultimoDigito)) {
    campoFormatado = campoFormatado.substr(0, campoFormatado.length - 1);
  }

  campoFormatado = campoFormatado.replace('-', '');
  campoFormatado = replaceAll(campoFormatado, '.', '');

  if (campoFormatado.length > 11) {
    return campoAtual;
  }

  // Adiciona ".", "." e "-" ao campo
  if (campoFormatado.length >= 4)
    campoFormatado = inserirValorEmString(campoFormatado, 3, ".");
  if (campoFormatado.length >= 8)
    campoFormatado = inserirValorEmString(campoFormatado, 7, ".");
  if (campoFormatado.length >= 12)
    campoFormatado = inserirValorEmString(campoFormatado, 11, "-");
  // Mudar o valor do campo para o novo campo formatado
  return campoFormatado;
}
//RETORNA UMA STRING COM O TELEFONE FORMATADO
export function formata_telefone(campo: string, campoAtual: string) {
  let valoresPermitidos = "0123456789";
  let campoFormatado = campo;
  let ultimoDigito = campoFormatado.charAt(campoFormatado.length - 1);
  // Verificar se o valor digitado é um valor permitido se não for o remove
  if (!valoresPermitidos.includes(ultimoDigito)) {
    //Se for ") " e necessário remover 2 digitos
    if (ultimoDigito == " ") {
      campoFormatado = campoFormatado.substr(0, campoFormatado.length - 2);
    } else {
      campoFormatado = campoFormatado.substr(0, campoFormatado.length - 1);
    }
  }
  //Adiciona "()" ao ddd
  campoFormatado = campoFormatado.replace('(', "");
  campoFormatado = campoFormatado.replace(') ', "");
  if (campoFormatado.length > 2) {
    campoFormatado = inserirValorEmString(campoFormatado, 0, '(');
    campoFormatado = inserirValorEmString(campoFormatado, 3, ') ');
  }
  //Adiciona "-" ao número dependendo se ele tem 9 ou 8 dígitos
  campoFormatado = campoFormatado.replace('-', "");
  //Se tiver mais de 15 não adiciona o número
  if (campoFormatado.length > 15) {
    return campoAtual;
  }

  if (campoFormatado.length > 9 && campoFormatado.length < 14) {
    campoFormatado = `${campoFormatado.substring(0, 9)}-${campoFormatado.substring(9, campoFormatado.length)}`;
  } else if (campoFormatado.length >= 14) {
    campoFormatado = `${campoFormatado.substring(0, 10)}-${campoFormatado.substring(10, campoFormatado.length)}`;
  }
  return campoFormatado;
}

//RETORNA TRUE SE EMAIL FOR VALIDO FALSE SE NÃO
export function valida_email(email: string) {
  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRE.test(email);
}

//RETORNA TRUE SE CPF FOR VALIDO FALSE SE NÃO
export function valida_CPF(cpf: string) {
  const cpfRE = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  if (!cpfRE.test(cpf)) {
    return false;
  }
  console.log(typeof cpf);
  cpf = replaceAll(cpf, '-', '');
  cpf = replaceAll(cpf, ".", "");
  let soma;
  let resto;
  soma = 0;
  if (cpf == "00000000000") return false;

  for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function inserirValorEmString(fonte: string, pos: number, valor: string) {
  return fonte.substr(0, pos) + valor + fonte.substr(pos);
}

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
}