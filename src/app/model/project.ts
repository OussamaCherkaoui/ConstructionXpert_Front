export class Project {
  id?: number;
  name: string | undefined;
  description: string|undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  budget?:number;


  constructor(data?: Partial<Project>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.budget=data.budget;
    }
  }
}
