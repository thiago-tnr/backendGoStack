import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointment1646743774029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //aqui coloco o que quero que acontece no db quando ela for executada
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns:[{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type:  'varchar',
                },
                {
                    name:'date',
                    type: 'timestamp with time zone',
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
        await queryRunner.dropTable('appointments')
    }

}
