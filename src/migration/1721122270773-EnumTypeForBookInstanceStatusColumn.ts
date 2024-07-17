import { MigrationInterface, QueryRunner } from "typeorm";

export class EnumTypeForBookInstanceStatusColumn1721122270773 implements MigrationInterface {
    name = 'EnumTypeForBookInstanceStatusColumn1721122270773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`book_instance\` CHANGE \`status\` \`status\` enum ('Available', 'Loaned', 'Maintenance', 'Reserved') NOT NULL DEFAULT 'Available'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`book_instance\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`
        );
    }
}
