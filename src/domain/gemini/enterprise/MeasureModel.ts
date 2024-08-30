import { v4 as uuidv4 } from 'uuid';

export class MeasureModel {
  private id: string;
  private imageUrl: string;
  private measureValue: string;
  private customerId: string;
  private hasConfirmed: boolean;
  private measureYype: string;
  private measureDatetime: Date;
  private monthYear: string;

  constructor(
    imageUrl: string,
    customerId: string,
    measureYype: string,
    measureValue: string,
    measureDatetime: Date,
    monthYear: string,
  ) {
    this.id = uuidv4();
    this.imageUrl = imageUrl;
    this.measureValue = measureValue;
    this.customerId = customerId;
    this.hasConfirmed = false;
    this.measureYype = measureYype;
    this.measureDatetime = measureDatetime;
    this.monthYear = monthYear;
  }

  public setHasConfirmedToTrue() {
    this.hasConfirmed = true;
  }

  public getId() {
    return this.id;
  }
  public getImageUrl() {
    return this.imageUrl;
  }

  public getMeasureDatetime() {
    return this.measureDatetime;
  }

  public getCustomerId() {
    return this.customerId;
  }

  public getHasConfirmed() {
    return this.hasConfirmed;
  }

  public getMeasureType() {
    return this.measureYype;
  }

  public getMeasureValue() {
    return this.measureValue;
  }

  public getMonthYear() {
    return this.monthYear;
  }
}
