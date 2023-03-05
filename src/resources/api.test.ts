import { getData } from 'resources/api'

interface ResponseMock {
  foo: string
}

const fetchMock = jest.fn()

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

describe('Api', () => {
  beforeEach(() => {
    global.fetch = fetchMock
    jest.clearAllMocks()
  })

  afterEach(() => {
    fetchMock.mockRestore()
  })

  describe('#getData', () => {
    test('ok response', async () => {
      const responseMock: ResponseMock = {
        foo: 'bar'
      }

      fetchMock.mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => await responseMock
      } as unknown as Response)
      const response = await getData<ResponseMock>('https://example.com/links')

      expect(response).toEqual(responseMock)
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledWith('https://example.com/links')
    })
    test('failed response', async () => {
      fetchMock.mockResolvedValueOnce({
        status: 401,
        ok: false,
        statusText: 'Failed mock response',
        json: async () => ({})
      } as unknown as Response)

      const error = await getError(async () => getData<ResponseMock>('https://example.com/links'));

      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toEqual('Failed mock response');

    })
  })
})
