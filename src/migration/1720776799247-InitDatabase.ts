import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1720776799247 implements MigrationInterface {
    name = 'InitDatabase1720776799247';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`family_name\` varchar(255) NOT NULL, \`date_of_birth\` date NULL, \`date_of_death\` date NULL, \`name\` varchar(255) NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`book_instance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imprint\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`due_back\` date NULL, \`url\` varchar(255) NULL, \`book_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`isbn\` varchar(255) NULL, \`url\` varchar(255) NULL, \`author_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`book_genre\` (\`book_id\` int NOT NULL, \`genre_id\` int NOT NULL, INDEX \`IDX_fa09ea26c5837f4f4160ae5571\` (\`book_id\`), INDEX \`IDX_df2409dcd1dade9038a7d79e65\` (\`genre_id\`), PRIMARY KEY (\`book_id\`, \`genre_id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `ALTER TABLE \`book_instance\` ADD CONSTRAINT \`FK_cdd368951566cce982e6e7b412f\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`book\` ADD CONSTRAINT \`FK_24b753b0490a992a6941451f405\` FOREIGN KEY (\`author_id\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`book_genre\` ADD CONSTRAINT \`FK_fa09ea26c5837f4f4160ae55715\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE \`book_genre\` ADD CONSTRAINT \`FK_df2409dcd1dade9038a7d79e653\` FOREIGN KEY (\`genre_id\`) REFERENCES \`genre\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`book_genre\` DROP FOREIGN KEY \`FK_df2409dcd1dade9038a7d79e653\``
        );
        await queryRunner.query(
            `ALTER TABLE \`book_genre\` DROP FOREIGN KEY \`FK_fa09ea26c5837f4f4160ae55715\``
        );
        await queryRunner.query(
            `ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_24b753b0490a992a6941451f405\``
        );
        await queryRunner.query(
            `ALTER TABLE \`book_instance\` DROP FOREIGN KEY \`FK_cdd368951566cce982e6e7b412f\``
        );
        await queryRunner.query(`DROP INDEX \`IDX_df2409dcd1dade9038a7d79e65\` ON \`book_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa09ea26c5837f4f4160ae5571\` ON \`book_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genre\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`book_instance\``);
        await queryRunner.query(`DROP TABLE \`author\``);
    }
}
