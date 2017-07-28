import { ApplicationDb } from '../../../application.db';

export class Comment extends ApplicationDb {
  public id: number;
  public pia_id: number;
  public description: string;
  public reference_to: string;
  public for_measure: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor() {
    super(201707071818, 'comment');
  }

  async create() {
    await this.getObjectStore();
    return new Promise((resolve, reject) => {
      const created_at = new Date();
      this.objectStore.add({description: this.description,  pia_id: this.pia_id, reference_to: this.reference_to, for_measure: this.for_measure, created_at: created_at}).onsuccess = (event: any) => {
        resolve(event.target.result);
      };
    });
  }

  // async update(id) {
  //   this.find(id).then((entry: any) => {
  //     entry.description = this.description;
  //     entry.updated_at = new Date();
  //     this.objectStore.put(entry);
  //   });
  // }

  async get(id: number) {
    this.id = id;
    this.find(this.id).then((entry: any) => {
      this.pia_id = entry.pia_id;
      this.description = entry.description;
      this.reference_to = entry.reference_to;
      this.for_measure = entry.for_measure;
      this.created_at = new Date(entry.created_at);
      this.updated_at = new Date(entry.updated_at);
    });
  }
}