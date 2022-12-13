import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const repositoryMock = {
  insert: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === 'UserRepository') {
          return repositoryMock;
        }
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    jest.resetAllMocks();
  });

  describe('.create', () => {
    it('when new user create successfully', async () => {
      jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve());

      const result = await service.create({
        name: 'any',
        email: 'any@email.com.br',
        password: 'any_password',
      });

      expect(result).toMatchObject({});
      expect(repositoryMock.insert).toHaveBeenCalledTimes(1);
    });

    it('when new user create email duplicate faill', async () => {
      jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(new User()));

      expect(
        service.create({
          name: 'any',
          email: 'any@email.com.br',
          password: 'any_password',
        }),
      ).rejects.toThrowError();
      expect(repositoryMock.insert).toHaveBeenCalledTimes(0);
    });
  });

  describe('.update', () => {
    it('', async () => {
      const entity: User = {
        id: 1,
        name: 'any',
        email: 'any@email.com.br',
        password: 'any_password',
        created: new Date(),
      };

      const update: UpdateUserDto = {
        name: 'any_update',
      };

      jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve(entity));

      const result = await service.update(1, update, 1);

      expect(result).toMatchObject({});
      expect(repositoryMock.create).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    });
  });
});
