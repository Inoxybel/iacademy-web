Request login

`{
	user (cnpj string somente numeros),
	senha (string)
}`

Resposta login

`{
	Icone Empresa (string/svg) ---
	Nome da Empresa (string) ---
	CNPJ (string) ---
	Token (string) ---
}`

---------------------------

GET /api/ROTA?pageNumber=2&pageSize=5

Resposta listagem treinamentos e grupos:

`{
  TotalCount (int),
  PageSize (int),
  CurrentPage (int),
  TotalPages (int),
  Items (lista de objeto treinamento/grupo)
}`