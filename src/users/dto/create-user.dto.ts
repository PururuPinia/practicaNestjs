import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ required: true, example: 'usuario@empresa.com' })
    email: string;

    @ApiProperty({ required: true, example: 'Juan Perez' })
    name: string;

    @ApiProperty({ required: true, example: 'contra12345' })
    password: string;

    @ApiProperty({ required: true, example: 1, description: 'ID de Tenant' })
    tenantId: number;

}
