
export class Global {

  TEST_MODE = true;

  static getBaseUrl() {
    if (this.TEST_MODE == true) {
      return 'http://ponku.cranium.co.id/';
    }
    return 'http://ponku.cranium.co.id/';
  }
}