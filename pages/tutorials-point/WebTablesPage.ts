import { L } from '@faker-js/faker/dist/index-BSUsvzGS';
import { BasePage } from '@pages/BasePage';
import {Locator} from '@playwright/test'

export class WebTablesPage extends BasePage {
    private readonly webTable = this.page.locator('table.table-striped');
    private readonly webTableHeader = this.webTable.locator('thead');
    private readonly webTableBody = this.webTable.locator('tbody');
    private readonly elementsButton = this.page.getByRole('button', {name:/.*Elements/});
    private readonly webTablesLink = this.page.getByRole('link', {name:/Web Tables/});

    async navigatetoWebTablesPage():Promise<void> {
        await this.elementsButton.click();
        await this.webTablesLink.click();
    }

    async countRowsInTable():Promise<number> {
        return await this.webTableBody.getByRole('row').count();
    }

    async countColumnsInTable():Promise<number> {
        return await this.webTableHeader.locator('tr th').count();
    }

    async retrieveCellText(row:number, column:number):Promise<string> {
        return (await this.webTableBody.locator('tr').nth(row).locator('td').nth(column).textContent()) ?? '';
    }

    async deleteTableEntry(firstName:string, lastName:string) {
        const firstNameIndex = await this.returnColumnIndexOfHeader('First Name');
        const lastNameNameIndex = await this.returnColumnIndexOfHeader('Last Name');
        const actionIndex = await this.returnColumnIndexOfHeader('Action');
        const totalRows = await this.countRowsInTable();
        let firstNameText = "";
        let lastNameText = "";
        for (let i = 0; i<totalRows; i++) {
            firstNameText = await this.retrieveCellText(i, firstNameIndex);
            lastNameText = await this.retrieveCellText(i, lastNameNameIndex);
            if ((firstName == firstNameText) && (lastName == lastNameText)) {
                await this.webTableBody.locator('tr').nth(i).locator('td').nth(actionIndex).getByTitle('delete').click();
                break;
            }
        }
    }

    async retrieveColumnIndex(firstName:string, lastName:string):Promise<[Number,Number]> {
        const firstNameIndex = await this.returnColumnIndexOfHeader(firstName);
        const lastNameNameIndex = await this.returnColumnIndexOfHeader(lastName);
        return [firstNameIndex,lastNameNameIndex];
    }

    async retrieveFirstNameLastNameColumnIndex(firstName:string, lastName:string):Promise<Number[]> {
        const firstNameIndex = await this.returnColumnIndexOfHeader(firstName);
        const lastNameNameIndex = await this.returnColumnIndexOfHeader(lastName);
        return [firstNameIndex,lastNameNameIndex];
    }


    async returnColumnIndexOfHeader(headerName:string):Promise<number> {
        const count = await this.countColumnsInTable();
        let columnIndex = -1;
        let text="";
        for (let i=0; i<count; i++) {
            text = await this.webTableHeader.locator('tr th').nth(i).textContent() ?? '';
            if (text == headerName) {
                columnIndex = i;
                break;
            }
        }
        return columnIndex;
    }

}


