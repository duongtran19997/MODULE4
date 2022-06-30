"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoneBook1656580003687 = void 0;
class updatePhoneBook1656580003687 {
    constructor() {
        this.name = 'updatePhoneBook1656580003687';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`note\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`phone_book\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`phone_book\` DROP COLUMN \`note\``);
    }
}
exports.updatePhoneBook1656580003687 = updatePhoneBook1656580003687;
//# sourceMappingURL=1656580003687-updatePhoneBook.js.map