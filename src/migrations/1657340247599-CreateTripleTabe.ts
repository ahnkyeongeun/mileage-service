import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTripleTabe1657340247599 implements MigrationInterface {
    name = 'CreateTripleTabe1657340247599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`point\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`reviewId\` varchar(255) NOT NULL, \`placeId\` varchar(255) NOT NULL, \`operator\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`point\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_c01766b92e52572f0b871c24bb\` (\`userId\`), INDEX \`IDX_00cd40e870efbb8f1a897e8266\` (\`reviewId\`), INDEX \`IDX_645276abac4c42bb727b9e881e\` (\`placeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review_image\` (\`imageId\` varchar(36) NOT NULL, \`reviewId\` varchar(255) NOT NULL, PRIMARY KEY (\`imageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`placeId\` varchar(255) NOT NULL, \`content\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_1337f93918c70837d3cea105d3\` (\`userId\`), INDEX \`IDX_ec8f295224c904bded4ddfd9ec\` (\`placeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review_image\` ADD CONSTRAINT \`FK_f0a1a48c40bcb0585f111015e5a\` FOREIGN KEY (\`reviewId\`) REFERENCES \`review\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review_image\` DROP FOREIGN KEY \`FK_f0a1a48c40bcb0585f111015e5a\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec8f295224c904bded4ddfd9ec\` ON \`review\``);
        await queryRunner.query(`DROP INDEX \`IDX_1337f93918c70837d3cea105d3\` ON \`review\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP TABLE \`review_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_645276abac4c42bb727b9e881e\` ON \`point\``);
        await queryRunner.query(`DROP INDEX \`IDX_00cd40e870efbb8f1a897e8266\` ON \`point\``);
        await queryRunner.query(`DROP INDEX \`IDX_c01766b92e52572f0b871c24bb\` ON \`point\``);
        await queryRunner.query(`DROP TABLE \`point\``);
    }

}
