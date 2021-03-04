export class NodeModel {
    [key: string]: Obj;
}

export class Obj {
    checked: boolean;
    children: NodeModel;
    id: string;
    level: number;
    name: string;
    open: boolean;
}
