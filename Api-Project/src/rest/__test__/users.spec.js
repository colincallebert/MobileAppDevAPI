const db = require('../../repository/user');
// ...
describe('updateEmail', () => {
	it('should update email if user exist', () => {
		db.getByAuth0Id = jest.fn()
			.mockReturnValue('a');
		const result = ex.updateEmail(1, newEmail);
		expect(result.email).toMatch(new RegExp(newEmail));
	});
});