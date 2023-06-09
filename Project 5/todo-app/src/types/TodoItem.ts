export class TodoItem {
    public id:number;
    public task:string;
    public isCompleted:boolean;
    public createdDate:Date;
    public category:TodoItemCategory | null;

    constructor(id:number, task:string) {
        this.id = id;
        this.task = task;
        this.isCompleted = false;
        this.createdDate=new Date();
        this.category=null;
    }
}

export class TodoItemCategory {
    public id:number;
    public name:string;
    public color:string;

    constructor(id:number, name:string, color:string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}