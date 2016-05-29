export class TodoService {
    constructor() {
        this._list = [
            {
                id: 'todo1',
                text: '牛乳を買う',
                completedAt: '2016-01-01'
            }, {
                id: 'todo2',
                text: 'ATMでお金を引き出す',
                completedAt: null
            }
        ];
        this._seq = this._list.length;
    }

    fetchList() {
        return new Promise(res => {
            res(this._list);
        });
    }

    fetch(id) {
        return new Promise((res, rej) => {
            var matched = this._list.filter(t => t.id === id);
            if(matched.length === 1) {
                res(matched[0]);
            }else{
                rej();
            }
        });
    }

    add(param) {
        var todo = {
            id: `todo${++this._seq}`,
            text: param.text || '',
            completedAt: param.completedAt || null
        };
        this._list.push(todo);
        return new Promise(res => res(todo));
    }

    set(id, param) {
        var item = this._list.filter(l => l.id === id)[0];
        return new Promise((resolve, reject) => {
            if(!item) {
                reject();
            }else{
                if(param.text) item.text = param.text;
                if(param.completedAt) item.completedAt = param.completedAt;
                resolve(item);
            }
        });
    }
}
