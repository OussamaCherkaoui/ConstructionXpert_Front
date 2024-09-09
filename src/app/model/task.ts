export class Task {
  id?: number;
  title: string | undefined;
  description: string|undefined;
  status: string | undefined;
  projectId: number | undefined;


  constructor(data?: Partial<Task>) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.status = data.status;
      this.projectId = data.projectId;
    }
  }
}
