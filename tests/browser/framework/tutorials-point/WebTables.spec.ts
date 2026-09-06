import {test, expect} from '@fixtures/tutorials-point/tutorials-point.fixture'
import { WebTablesPage } from '@pages/tutorials-point/WebTablesPage'

test('WebTable row and column count', async ({ webTablesPage }) => {
	let count = await webTablesPage.countRowsInTable();
    console.log(`number of rows are ${count}`);
    count = await webTablesPage.countColumnsInTable();
    console.log(`number of columns are ${count}`);
    const text = await webTablesPage.retrieveCellText(3,5);
    const columnIndex = await webTablesPage.retrieveColumnIndex('First Name', 'Last Name');
    const nameIndex = await webTablesPage.retrieveFirstNameLastNameColumnIndex('First Name', 'Last Name');
    console.log(`text is ${text}`);
    console.log(`column index is ${columnIndex}`);
    await webTablesPage.deleteTableEntry("Alden", "Cantrell");
})

