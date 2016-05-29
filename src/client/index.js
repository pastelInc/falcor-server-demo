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

model.setValue('todos[1].completedAt', '2016-05-29')
  .then(() => model.call(
    'todos.push',
    [{text: 'サンドイッチを作る'}], ['text', 'completedAt']
  ))
  .then(() => model.get(
    'todos[0..9].text', 
    'todos[0..9].completedAt'
  ))
  .then(out)
;
