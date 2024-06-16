import { Routes } from '@angular/router';
import { ParserComponent } from './components/parser/parser.component';
import { DatabaseComponent } from './components/database/database.component';
import { DatabaseMerchantsComponent } from './components/database/database-merchants/database-merchants.component';
import { DatabaseOwnersComponent } from './components/database/database-owners/database-owners.component';
import { DatabaseFundersComponent } from './components/database/database-funders/database-funders.component';
import { ParserSchemesComponent } from './components/parser/schemes/parser-schemes.component';
import { ParserKeysComponent } from './components/parser/keys/parser-keys.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileOverviewComponent } from './components/profile/overview/profile-overview.component';
import { ProfileBankingComponent } from './components/profile/banking/profile-banking.component';
import { ProfileBankingOverviewComponent } from './components/profile/banking/overview/profile-banking-overview.component';
import { ProfileBankingStatementsComponent } from './components/profile/banking/statements/profile-banking-statements.component';
import { ProfileBankingStatementComponent } from './components/profile/banking/statement/profile-banking-statement.component';
import { UnderwritingComponent } from './components/profile/underwriting/underwriting.component';
import { KeysComponent } from './components/profile/keys/keys.component';
import { CriteriasComponent } from './components/profile/criterias/criterias.component';
import { AssetsComponent } from './components/profile/assets/assets.component';

export const routes: Routes = [
    { path: 'database', component: DatabaseComponent, children: [
        { path: 'merchants', component: DatabaseMerchantsComponent },
        { path: 'owners', component: DatabaseOwnersComponent },
        { path: 'funders', component: DatabaseFundersComponent },
        { path: '**', redirectTo: 'merchants' }
    ] },
    { path: 'parser', component: ParserComponent, children: [
        { path: 'schemes', component: ParserSchemesComponent },
        { path: 'keys', component: ParserKeysComponent },
        { path: '**', redirectTo: 'schemes' }
    ] },
    { path: 'merchant/:id', component: ProfileComponent, children: [
        { path: 'overview', component: ProfileOverviewComponent},
        { path: 'underwriting', component: UnderwritingComponent},
        { path: 'Cash Flow', component: ProfileBankingComponent, children: [
            { path: 'overview', component: ProfileBankingOverviewComponent },
            { path: 'statements', component: ProfileBankingStatementsComponent },
            { path: 'statements/:statement_id', component: ProfileBankingStatementComponent },
            { path: '**', redirectTo: 'overview' }
        ]},
        { path: 'assets', component: AssetsComponent},
        { path: '**', redirectTo: 'overview' }
    ]},
    { path: 'owner/:id', component: ProfileComponent, children: [
        { path: 'overview', component: ProfileOverviewComponent},
        { path: '**', redirectTo: 'overview' }
    ]},
    { path: 'funder/:id', component: ProfileComponent, children: [
        { path: 'overview', component: ProfileOverviewComponent},
        { path: 'keys', component: KeysComponent},
        { path: 'criterias', component: CriteriasComponent},
        { path: '**', redirectTo: 'overview' }
    ]},
    { path: 'ab560aa6f65715aa90aee9e0a4ea1ee6571170b/1705600960a4ee9e0060a408e5a970b/17056009b0a6f6579b0a6fb8e5aa0157b8e8e5a964ea1', component: ParserComponent },
];