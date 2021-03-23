import { Container } from 'typedi';
import faker from 'faker';
import CreateSubjectResolver from '../../../../src/graphql/resolvers/subject/createSubject';
import SubjectRepository from '../../../../src/repositories/subjectRepository';

const createSubjectSpy = jest.fn();

const subjectRepositoryMock = jest.fn().mockImplementation(() => ({
  createSubject: createSubjectSpy,
}));

Container.set(SubjectRepository, subjectRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

describe('Create event mutation unit tests', () => {
  it('should create quantity of repetitions as defined by the payload', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeSubject = 'Test subject';

    const expectedResponse = {
      id: faker.random.uuid(),
      title: fakeSubject,
    };

    createSubjectSpy.mockResolvedValue(expectedResponse);

    const resolver = new CreateSubjectResolver();
    const response = await resolver.createSubject(fakeSubject, fakeContext);
    expect(createSubjectSpy).toHaveBeenCalledWith(fakeSubject);
    expect(response).toEqual(expectedResponse);
  });
});
