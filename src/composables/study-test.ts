type SomeConstructor = {
  new(): { a: string }
}

class MyConstructor {
  public a: string;
  constructor(a: string) {
    this.a = a
  }
}