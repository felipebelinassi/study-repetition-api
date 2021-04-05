import { Container } from 'typedi';
import faker from 'faker';
import loggerMock from '../../../doubles/mocks/logger';
import CreateSubjectResolver from '../../../../src/graphql/resolvers/subject/createSubject';
import SubjectRepository from '../../../../src/repositories/subjectRepository';

const createSubjectSpy = jest.fn();

const subjectRepositoryMock = jest.fn().mockImplementation(() => ({
  create: createSubjectSpy,
}));

Container.set(SubjectRepository, subjectRepositoryMock());

const mockAuthContext = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

const fakeAuthContext = { user: mockAuthContext, authExpired: false, logger: loggerMock };

describe('Create subject mutation unit tests', () => {
  it('should create a new subject', async () => {
    const fakeSubject = 'Test subject';

    const expectedResponse = {
      id: faker.datatype.uuid(),
      title: fakeSubject,
    };

    createSubjectSpy.mockResolvedValue(expectedResponse);

    const resolver = new CreateSubjectResolver();
    const response = await resolver.createSubject(fakeAuthContext, fakeSubject);
    expect(createSubjectSpy).toHaveBeenCalledWith(mockAuthContext.id, fakeSubject);
    expect(response).toEqual(expectedResponse);
  });

  it('should throw SUBJECT_ALREADY_EXISTS if subject was already created by the user', async () => {
    const fakeSubject = 'Test subject';

    createSubjectSpy.mockRejectedValue({ code: 'P2002' });

    const resolver = new CreateSubjectResolver();
    const response = resolver.createSubject(fakeAuthContext, fakeSubject);
    await expect(() => response).rejects.toThrow('SUBJECT_ALREADY_EXISTS');
  });
});
