import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Service file for common modal
 */
export class CommonModelService {
  private modals: any[] = [];

  /**
   * add modal
   *
   * @param {any} modal
   */
  public add(modal: any): void {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  /**
   * remove modal
   *
   * @param {string} id
   */
  public remove(id: string):void {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  /**
   * open model based on id
   * @param {string} id
   */
  public open(id: string):void {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  /**
   * close model based on id
   * @param {string} id
   */
  public close(id: string):void {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
