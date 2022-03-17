import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1646834685894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //aqui coloco o que quero que acontece no db quando ela for executada
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns:[{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type:  'varchar',
                },
                {
                    name:'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name:'password',
                    type: 'varchar',
                },
                {
                    name:'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name:'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }            
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //desfaz o que foi feito no up
        await queryRunner.dropTable('users')
    }

}
