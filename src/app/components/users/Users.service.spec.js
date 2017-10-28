describe('service webDevTec', () => {
  beforeEach(angular.mock.module('angular'));

  it('should be registered', inject(users => {
    expect(users).not.toEqual(null);
  }));

  describe('getUsers function', () => {
    it('should exist', inject(users => {
      expect(users.getUsers).not.toBeNull();
    }));

    it('should return array of object', inject(users => {
      const data = users.getUsers();
      expect(data).toEqual(jasmine.any(Array));
      expect(data[0]).toEqual(jasmine.any(Object));
      expect(data.length > 5).toBeTruthy();
    }));
  });
});
