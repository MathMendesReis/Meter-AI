export class ImageModel {
  private _id: string;
  private _filename: string;
  private _contentType: string;
  private _contentLength: string;
  private _url: string;
  public get id(): string {
    return this._id;
  }
  public getFilename(): string {
    return this._filename;
  }
  public getContentLength(): string {
    return this._contentLength;
  }
  public getContentType(): string {
    return this._contentType;
  }
  public getUrl(): string {
    return this._url;
  }
  public setFilename(value: string) {
    this._filename = value;
  }
  public setContentLength(value: string) {
    this._contentLength = value;
  }
  public setContentType(value: string) {
    this._contentType = value;
  }
  public setUrl(value: string) {
    this._url = value;
  }

  constructor() {}
}
