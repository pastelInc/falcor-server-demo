import express from 'express';
import bodyParser from 'body-parser';
import {dataSourceRoute} from 'falcor-express';
import {TodoRouter} from './TodoRouter';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/model.json', dataSourceRoute(() => new TodoRouter()));
app.use(express.static(__dirname + '/../../'));
app.listen(3000);
