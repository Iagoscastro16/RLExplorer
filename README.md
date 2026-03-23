### RLExplorer

Aplicativo mobile para explorar o catálogo completo de itens do Rocket League, Desenvolvido em React native e Expo go

### Funcionalidade 

- Busca de itens por nome em tempo real

- Filtro de categoria(Carros, decais, rodas, boosts, explosões, Toppers e mais)

- Paginação com carregamento progressivo

- Tela de detalhes com raridades,tipo, pintura e atributo do item

- Indicação visual de raridade com cores e badges

### Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) ~54.0.0
- [React Navigation](https://reactnavigation.org/) — navegação entre telas
- [@rocketleagueapi/items](https://www.npmjs.com/package/@rocketleagueapi/items) — base de dados dos itens
- [Axios](https://axios-http.com/) — cliente HTTP

### Como rodar localmente

1. Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

- [Expo Go](https://expo.dev/client) Instalado no celular IOS ou Android

2. Clone o repositório


```bash
git clone https://github.com/seu-usuario/RLExplorer.git
cd RLExplorer
```

3. instale as dependênias

```bash
npm install
```

4. Inicie o projeto

Caso o Pc esteja na mesma rede do celular(Esse comando pode não funcionar caso o pc esteja cabeado)
```bash
npx expo start
```
Se a forma acima não funcionou, essa aqui funciona independente da rede
```bash
npx expo start --tunnel
```

E em seguida escaneie o QR Code com o app expo go no android ou apenas com o leitor de QR Code do IOS 

## 📁 Estrutura do projeto
 
```
RLExplorer/
├── App.js                        # Entrada da aplicação
├── src/
│   ├── routes/
│   │   └── index.js              # Configuração de navegação
│   ├── screens/
│   │   ├── HomeScreen.js         # Listagem e filtros de itens
│   │   └── DetailsScreen.js      # Detalhes do item selecionado
│   ├── components/
│   │   └── ItemCard.js           # Card de item na listagem
│   ├── styles/
│   │   └── global.js             # Cores, espaçamentos e estilos globais
│   └── services/
│       └── api.js                # Configuração do Axios
├── assets/                       # Ícones e imagens do app
├── app.json                      # Configurações do Expo
└── package.json
```

### Autor
 
Desenvolvido por **Iago Castro** ©
