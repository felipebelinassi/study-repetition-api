import { Container } from 'typedi';
import faker from 'faker';
import CreateSubjectResolver from '../../../../src/graphql/resolvers/subject/createSubject';
import SubjectRepository from '../../../../src/repositories/subjectRepository';

const createSubjectSpy = jest.fn();

const subjectRepositoryMock = jest.fn().mockImplementation(() => ({
  create: createSubjectSpy,
}));

Container.set(SubjectRepository, subjectRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

describe('Create subject mutation unit tests', () => {
  it('should create a new subject', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeSubject = 'Test subject';

    const expectedResponse = {
      id: faker.random.uuid(),
      title: fakeSubject,
    };

    createSubjectSpy.mockResolvedValue(expectedResponse);

    const resolver = new CreateSubjectResolver();
    const response = await resolver.createSubject(fakeSubject, fakeContext);
    expect(createSubjectSpy).toHaveBeenCalledWith(mockAuthContext.id, fakeSubject);
    expect(response).toEqual(expectedResponse);
  });

  it('should throw SUBJECT_ALREADY_EXISTS if subject was already created by the user', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeSubject = 'Test subject';

    createSubjectSpy.mockRejectedValue({ code: 'P2002' });

    const resolver = new CreateSubjectResolver();
    const response = resolver.createSubject(fakeSubject, fakeContext);
    await expect(() => response).rejects.toThrow('SUBJECT_ALREADY_EXISTS');
  });
});
