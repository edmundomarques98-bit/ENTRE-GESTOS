# Entre Gestos

Site de apresentação das oficinas Entre Gestos: vivências criativas que se tornam memórias.

Site estático (HTML, CSS e JS puros), pronto para GitHub Pages. Não precisa de build.

## Como editar a próxima turma

Abra `js/config.js` e preencha data, horário, local, preço, vagas, WhatsApp, Instagram e o link de inscrição. Campo vazio aparece como "A definir" e os botões de WhatsApp e Instagram ficam ocultos até receberem um valor. Se `linkInscricao` ficar vazio, os botões de inscrição abrem o WhatsApp.

## Conteúdo provisório (marcado no site com borda tracejada)

- Fotos: `assets/img/atelie-paleta.jpg` e `atelie-cartao.jpg` são recortes da prancha de identidade. Trocar por fotos reais da oficina.
- Depoimentos: só usar frases reais, coletadas com autorização após o piloto.
- Equipe: nomes, fotos e CRP da coordenação psicológica.
- Símbolo: `assets/img/simbolo.svg` é um redesenho provisório até o vetor oficial.

## Visualizar

Abra `index.html` no navegador, ou publique em Settings > Pages apontando para a branch principal.

## Estrutura

```
index.html
css/style.css
js/config.js   dados editáveis da turma
js/main.js     preenchimento dos dados, carrossel e animações
assets/img/
```
