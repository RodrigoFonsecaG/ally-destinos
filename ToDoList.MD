# Formulario de Destinos de Interesse
- Campos: Nome, Email, Telefone, CPF, País, Cidade

**RF**
- O usuario deve ser capaz de marcar um Destino de interesse.
**RNF**
- Deve ser utilizado a API da amazon para buscar os países.
- Deve ser utilizado a API da amazon para buscar as cidades.
- Deve ser utilizado o Yup para validar todos os campos.
- Deve ser utilizado Toast para relatar um sucesso ou problema ao usuario.
**RN**
- Todos os campos deve ser obrigatórios.
- Os campos de País e Cidade devem permitir a seleção de múltiplas opções.
- O Select de cidade deve conter somente as cidades do pais selecionado.
- Os campos CPF e Telefone devem conter máscara.


# Ticket de Destino de Interesse
**RF**
- O usuario deve ser capaz de visualizar seu ticket de destino
- O usuario deve ser capaz de visualizar uma mensagem caso não tenha um ticket de destino
**RNF**
- As informações do ticket de destino deve ser armazenadas no local storage
**RN**
- As informações do ticket de destino deve estar de acordo com as preenchidas pelo usuario no formulario de destino de interesse
- O ticket de destino só aparecerá se o usuario marcar um destino de interesse