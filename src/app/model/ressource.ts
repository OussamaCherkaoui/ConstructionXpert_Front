export class Ressource {
  id?: number;
  name: string | undefined;
  type: string|undefined;
  quantity: string | undefined;
  taskId: number | undefined;


  constructor(data?: Partial<Ressource>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.quantity = data.quantity;
      this.taskId = data.taskId;
    }
  }
}
