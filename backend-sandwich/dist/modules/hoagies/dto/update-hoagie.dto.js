"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHoagieDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hoagie_dto_1 = require("./create-hoagie.dto");
class UpdateHoagieDto extends (0, mapped_types_1.PartialType)(create_hoagie_dto_1.CreateHoagieDto) {
}
exports.UpdateHoagieDto = UpdateHoagieDto;
//# sourceMappingURL=update-hoagie.dto.js.map