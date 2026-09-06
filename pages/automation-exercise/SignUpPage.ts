import { BasePage } from '@pages/BasePage'
import { AccountConfirmationPage } from '@pages/automation-exercise/AccountConfirmationPage';

export class SignUpPage extends BasePage {
    private readonly form = this.page.locator("form[action='/signup']");
    private readonly mrTitleRadio = this.form.locator("input#id_gender1");
    private readonly mrsTitleRadio = this.form.getByRole("radio", {name:'Mrs'});
    private readonly password = this.form.locator("input#password");
    private readonly dateOfBirth = this.form.getByTestId("days");
    private readonly monthOfBirth = this.form.getByTestId('months');
    private readonly yearOfBirth = this.form.getByTestId('years');
    private readonly firstName = this.form.getByTestId('first_name');
    private readonly lastName = this.form.getByTestId("last_name");
    private readonly address = this.form.getByTestId("address");
    private readonly country = this.form.getByTestId("country");
    private readonly state = this.form.getByTestId("state");
    private readonly city = this.form.getByTestId("city");
    private readonly zipCode = this.form.getByTestId("zipcode");
    private readonly mobileNumber = this.form.getByTestId("mobile_number");
    private readonly createAccountButton = this.form.getByRole("button", {name:"Create Account"});

    async enterAccountInformation():Promise<AccountConfirmationPage> {
        await this.mrTitleRadio.check();
        await this.password.fill("Ashu@1985");
        await this.dateOfBirth.selectOption('5');
        await this.monthOfBirth.selectOption('12');
        await this.yearOfBirth.selectOption('1985');
        await this.firstName.fill("Ashish");
        await this.lastName.fill("Ashish");
        await this.address.fill("7 Derowie Avenue, Homebush");
        await this.country.selectOption("Australia");
        await this.state.fill("NSW");
        await this.city.fill("Homebush");
        await this.zipCode.fill("2140");
        await this.mobileNumber.fill("0491110755");
        await this.createAccountButton.click();
        return new AccountConfirmationPage(this.page);
    }
}

