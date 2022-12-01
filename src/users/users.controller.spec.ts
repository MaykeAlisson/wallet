import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const repositoryMock = {
  insert: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
};

describe('UsersController', () => {
  let controller: UsersController;

  const httpServer = {
    post: jest.fn(),
    path: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === 'UserRepository') {
          return repositoryMock;
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    jest.resetAllMocks();
  });

  describe('.create', () => {
    it('when new user create successfully', async () => {
      jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockImplementationOnce(() => Promise.resolve());

      jest
        .spyOn(httpServer, 'post')
        .mockImplementationOnce(() => Promise.resolve({}));

      const result = await controller.create({
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
        controller.create({
          name: 'any',
          email: 'any@email.com.br',
          password: 'any_password',
        }),
      ).rejects.toThrowError();
    });
    expect(repositoryMock.insert).toHaveBeenCalledTimes(0);
  });

  describe('.update', () => {
    it('when user is updated it should succeed ', async () => {
      const req = {
        user: {
          id: 1,
        },
      };

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

      jest
        .spyOn(httpServer, 'path')
        .mockImplementationOnce(() => Promise.resolve({}));

      const result = await controller.update(req, '1', update);

      expect(result).toMatchObject({});
      expect(repositoryMock.create).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('when updating user different from token must give error', async () => {
      const req = {
        user: {
          id: 2,
        },
      };

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

      jest
        .spyOn(httpServer, 'path')
        .mockImplementationOnce(() => Promise.resolve({}));

      expect(controller.update(req, '1', update)).rejects.toThrowError();
      expect(repositoryMock.create).toHaveBeenCalledTimes(0);
      expect(repositoryMock.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('.delete', () => {

    it('when delete user returns success', async () => {
      const req = {
        user: {
          id: 1,
        },
      };

      const entity: User = {
        id: 1,
        name: 'any',
        email: 'any@email.com.br',
        password: 'any_password',
        created: new Date(),
      };

      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockImplementationOnce(() => Promise.resolve(entity));

    jest
      .spyOn(httpServer, 'delete')
      .mockImplementationOnce(() => Promise.resolve({}));

      const result = await controller.remove(req, '1');

      expect(result).toMatchObject({});
      expect(repositoryMock.delete).toHaveBeenCalledTimes(1);

    });

    it('when delete user different from token return error', async () => {
      const req = {
        user: {
          id: 2,
        },
      };

      const entity: User = {
        id: 1,
        name: 'any',
        email: 'any@email.com.br',
        password: 'any_password',
        created: new Date(),
      };

      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockImplementationOnce(() => Promise.resolve(entity));

    jest
      .spyOn(httpServer, 'delete')
      .mockImplementationOnce(() => Promise.resolve({}));

      expect(controller.remove(req, '1')).rejects.toThrowError();
      expect(repositoryMock.delete).toHaveBeenCalledTimes(0);

    });
  });
});
