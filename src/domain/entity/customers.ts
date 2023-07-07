import Address from "./address";

export default class Customer {
  // Uma entidade com apenas getters e setters é uma entidade anêmica anêmica, pois está apenas armazenando dados, está orientada ao banco de dados (Acoplada)
  // Com DDD uma entidade contém regras de negócio

  private _id: string; // esta entidade é única (é um entidade) pois possui um ID
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); // uma entidade deve sempre se autovalidar
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  get Address(): Address {
    return this._address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }
}
