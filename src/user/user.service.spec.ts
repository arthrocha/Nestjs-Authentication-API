import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const dto = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    };

    jest.spyOn(databaseService.user, 'create').mockResolvedValue(dto);

    const user = await service.create(dto);

    expect(user).toEqual({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    });

    //expect(databaseService.user.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when email already exists', async () => {
    jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    });

    await expect(
      service.create({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
        role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
        createdAt: new Date('2025-02-26T22:30:35.816Z'),
        updatedAt: new Date('2025-02-26T22:30:35.763Z'),
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('should return all users', async () => {
    const users = [
      {
        id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        password: 'hashedPassword',
        role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
        createdAt: new Date('2025-02-26T22:30:35.816Z'),
        updatedAt: new Date('2025-02-26T22:30:35.763Z'),
      },
      {
        id: '2',
        email: 'user2@test.com',
        name: 'User 2',
        password: 'hashedPassword',
        role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
        createdAt: new Date('2025-02-26T22:30:35.816Z'),
        updatedAt: new Date('2025-02-26T22:30:35.763Z'),
      },
    ];

    jest.spyOn(databaseService.user, 'findMany').mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(databaseService.user.findMany).toHaveBeenCalled();
  });

  it('should return users filtered by role', async () => {
    const filteredUsers = [{
      id: '2',
      email: 'user2@test.com',
      name: 'User 2',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    }];

    jest.spyOn(databaseService.user, 'findMany').mockResolvedValue(filteredUsers);

    const result = await service.findAll('ADMIN');
    expect(result).toEqual(filteredUsers);
    expect(databaseService.user.findMany).toHaveBeenCalledWith({ where: { role: 'ADMIN' } });
  });

  it('should find a user by ID', async () => {
    const user = {
      id: '1',
      email: 'user1@test.com',
      name: 'User1',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    };

    jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(user);

    const result = await service.findOne('1');
    expect(result).toEqual(user);
    expect(databaseService.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should find a user by email', async () => {
    const user = {
      id: '1',
      email: 'user1@test.com',
      name: 'User1',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    };

    jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(user);

    const result = await service.findOneByEmail('user@test.com');
    expect(result).toEqual(user);
    expect(databaseService.user.findUnique).toHaveBeenCalledWith({ where: { email: 'user@test.com' } });
  });

  it('should update a user', async () => {
    const updatedUser = {
      id: '1',
      email: 'user1@test.com',
      name: 'User1',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    }

    jest.spyOn(databaseService.user, 'update').mockResolvedValue(updatedUser);

    const result = await service.update('1', { email: 'updated@test.com', name: 'Updated User' });
    expect(result).toEqual(updatedUser);
    expect(databaseService.user.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { email: 'updated@test.com', name: 'Updated User' },
    });
  });

  it('should delete a user', async () => {
    const deletedUser = {
      id: '1',
      email: 'user1@test.com',
      name: 'User1',
      password: 'hashedPassword',
      role: 'ADMIN' as 'ADMIN' | 'ENGINEER' | 'INTERN',
      createdAt: new Date('2025-02-26T22:30:35.816Z'),
      updatedAt: new Date('2025-02-26T22:30:35.763Z'),
    }

    jest.spyOn(databaseService.user, 'delete').mockResolvedValue(deletedUser);

    const result = await service.delete('1');
    expect(result).toEqual(deletedUser);
    expect(databaseService.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
