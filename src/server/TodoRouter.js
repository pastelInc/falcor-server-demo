import {createClass} from 'falcor-router';
import {TodoService} from './TodoService';

const service = new TodoService();

export class TodoRouter extends
createClass([
  {
    route: 'todoByIds[{keys:ids}][{keys:props}]',
    get: function getTodoProperty(pathset) {
      console.log('get:', pathset);
      return Promise.all(pathset.ids.map(id => this.todoService.fetch(id)))
      .then(todos => todos.map(todo => {
        const value = {};

        pathset.props.forEach(prop => {
          value[prop] = todo[prop];
        });
        return {
          path: ['todoByIds', todo.id],
          value
        };
      }));
    },
    set: function setTodoProperty(jsonGraph) {
      const todoByIds = jsonGraph.todoByIds;
      const keys = Object.keys(todoByIds);

      console.log('set:', jsonGraph);
      return Promise.all(keys.map(id => this.todoService.set(id, todoByIds[id])))
      .then(() => ({jsonGraph}))
      ;
    }
  },
  {
    route: 'todos.length',
    get: function getTodosLength(pathset) {
      console.log('get:', pathset);
      return this.todoService.fetchList().then(list => {
        return {
          path: ['todos', 'length'],
          value: list.length
        };
      });
    }
  },
  {
    // indices は任意の文字列ならなんでも良い
    route: 'todos[{integers:indices}]',
    get: function getTodosReferences(pathset) {
      console.log('get: ', pathset);
      return this.todoService.fetchList().then(list => {
         return {
          jsonGraph: {
            todos: list.map(v => {
              return {$type: 'ref', value: ["todoByIds", v.id]};
            })
          }
        };
      });
    }
  },
  {
    route: 'todos.push',
    call: function pushNewTodo(callpath, args) {
      console.log('call todos.push', callpath, args);
      return this.todoService.add(args[0]).then(todo => {
        return this.todoService.fetchList().then(list => {
          return [
            {
              path: ['todos', 'length'],
              value: list.length
            },
            {
              path: ['todos', list.length - 1],
              value: {$type: 'ref', value: ['todoByIds', todo.id]}
            }
          ];
        });
      });
    }
  }
]) {
  constructor() {
    super();
    this.todoService = service;
  }
}
