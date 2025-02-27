import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'John Doe', role: 'ENGINEER' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', name: 'John Doe' }),
    create: jest.fn().mockResolvedValue({ id: '1', name: 'John Doe' }),
    update: jest.fn().mockResolvedValue({ id: '1', name: 'John Doe Updated' }),
    delete: jest.fn().mockResolvedValue({ message: 'User deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    await expect(controller.findAll()).resolves.toEqual([{ id: '1', name: 'John Doe', role: 'ENGINEER' }]);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    await expect(controller.findOne('1')).resolves.toEqual({ id: '1', name: 'John Doe' });
    expect(userService.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password', role:'ADMIN' };
    await expect(controller.create(dto)).resolves.toEqual({ id: '1', name: 'John Doe' });
    expect(userService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', async () => {
    const dto: UpdatedUserDto = { name: 'John Doe Updated' };
    await expect(controller.update('1', dto)).resolves.toEqual({ id: '1', name: 'John Doe Updated' });
    expect(userService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a user', async () => {
    await expect(controller.delete('1')).resolves.toEqual({ message: 'User deleted successfully' });
    expect(userService.delete).toHaveBeenCalledWith('1');
  });
});
