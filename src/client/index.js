import * as Falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const out = (res) => {
  console.log(res && JSON.stringify(res.json, null, 2));
};

const model = new Falcor.Model(
  {
    source: new HttpDataSource('/model.json')
  }
);

const getButton = document.querySelector('#get');
const setButton = document.querySelector('#set');
const pushButton = document.querySelector('#push');

getButton.addEventListener('click', () => {
  model
    .get(
      'todos[0..9].text',
      'todos[0..9].completedAt'
    )
    .subscribe(out)
    // .getValue('todos[0].text')
    // .subscribe(res => {
    //   console.log(res);
    // })
  ;
});

setButton.addEventListener('click', () => {
  model
    .setValue('todos[1].text', 'ATMでお金を引き出す')
    .subscribe(done => {
      console.log(done);
    })
  ;
});

pushButton.addEventListener('click', () => {
  model
    .call(
      'todos.push',
      [{text: 'サンドイッチを作る'}], ['text', 'completedAt']
    )
    .subscribe(out)
  ;
});
