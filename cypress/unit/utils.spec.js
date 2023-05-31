import { errorObject, extractIdFromUrl, responseObject } from "../../backend/utils";

describe('', () => {
  it('Extract id from url', () => {
    expect(extractIdFromUrl('https://something.com/2/')).to.equal('2');
    expect(extractIdFromUrl('https://something.com/')).to.equal(null);
  });

  it('Error object structure', () => {
    expect(errorObject(500)).to.deep.equal({ message: 'Internal Server Error', status: 500 });
    expect(errorObject(405)).to.deep.equal({ message: 'Method Not Allowed', status: 405 });
    expect(errorObject(400)).to.deep.equal({ message: 'Bad Request', status: 400 });
    expect(errorObject(404)).to.deep.equal({ message: '404 Not Found', status: 404 });
  });

  it('Response object structure', () => {
    expect(responseObject({ id: '1', characters: [1] })).to.deep.equal({ data: { id: '1', characters: [1] }, message: undefined });
    expect(responseObject({ id: '1', characters: [1] }, 'success')).to.deep.equal({
      data: {
        id: '1',
        characters: [1],
      },
      message: 'success'

    });
  });
})