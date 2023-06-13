import { utils, writeFileXLSX } from 'xlsx';

export const createFile = (data) => {

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "data");
    writeFileXLSX(wb, "data.xlsx");
}

