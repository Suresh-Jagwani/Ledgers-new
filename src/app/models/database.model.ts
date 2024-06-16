
export class MerchantModel {
    class: string;
    id: string;
    ein: string;
    name: string;
    industry: string;
    legal_entity: string;
    start_date: Date;
    website: string;
    address: string;
    phone: string;
    email: string;
    owners: any[];

    constructor (data: any) {
        this.class = data.class;
        this.id = data.id;
        this.ein = data.ein;
        this.name = data.name;
        this.industry = data.industry;
        this.legal_entity = data.legal_entity;
        this.start_date = new Date(data.start_date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.website = data.website;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.owners = data.owners;
    }
}

export class OwnerModel {
    class: string;
    id: string;
    ssn: string;
    name: string;
    address: string;
    birth_date: Date;
    phone: string;
    email: string;
    fico: number;
    merchants: any[];

    constructor (data: any) {
        this.class = data.class;
        this.id = data.id;
        this.ssn = data.ssn;
        this.name = data.name;
        this.address = data.address;
        this.birth_date = new Date(data.birth_date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.phone = data.phone;
        this.email = data.email;
        this.fico = data.fico;
        this.merchants = data.merchants;
    }
}

export class FunderModel {
    class: string;
    id: string;
    name: string;
    website: string;
    address: string;
    phone: string;
    email: string;
    parameters: { [id: string]: string };

    constructor (data: FunderModel) {
        this.class = data.class;
        this.id = data.id;
        this.name = data.name;
        this.website = data.website;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.parameters = data.parameters;
    }
}