export class TodoItem {
    public id:number;
    public task:string;
    public isCompleted:boolean;
    public createdDate:Date;

    constructor(id:number, task:string) {
        this.id = id;
        this.task = task;
        this.isCompleted = false;
        this.createdDate=new Date();
    }
}