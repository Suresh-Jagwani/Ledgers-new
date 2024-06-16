/*
export class StatementModel {
    id: string;
    owner_id: string;
    scheme_id: string;
    date: Date;
    beginning_balance: number;
    account: string;
    bank: string;
    transactions: TransactionModel[];
    balances: BalanceModel[];

    constructor(data: any) {
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.date = new Date(data.date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.beginning_balance = data.beginning_balance;
        this.account = data.account;
        this.bank = data.bank;
        this.transactions = data.transaction.map(transaction => new TransactionModel(transaction));
        this.balances = data.balances.map(balance => new BalanceModel(balance));
    }
}

export class TransactionModel {
    id: string;
    statement_id: string;
    owner_id: string;
    scheme_id: string;
    account: string;
    date: Date;
    amount: number;
    description: string;
    operation: string;
    section: string;
    pull: string;
    key: string;

    constructor(data: any) {
        this.id = data.id;
        this.statement_id = data.statement_id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.account = data.account;
        this.date = new Date(data.date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.amount = data.amount;
        this.description = data.description;
        this.operation = data.operation;
        this.section = data.section;
        this.pull = data.pull;
        this.key = data.key;
    }
}

export class BalanceModel {
    id: string;
    statement_id: string;
    date: Date;
    balance: number;
    stats: { string: statsModel }

    constructor (data: any) {
        this.id = data.id;
        this.statement_id = data.statement_id;
        this.date = new Date(data.date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.balance = data.balance;
        this.stats = data.stats;
    }
}

export interface statsModel {
    avg: string;
    count: number;
    max: number;
    min: number;
    stddev: number;
    total: number;
}

export interface statisticsModel {
    subject: string;
    deposits: number;
    withdrawals: number;
    revenue: number;
    payments: number;
    balances: number;
}











export interface SummaryModel {
    id: string;
    date: Date;
    count: number;
    balance: BalanceModel;
}*/